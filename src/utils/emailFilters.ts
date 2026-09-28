import dayjs from "dayjs";

export const ALL_FILTER_VALUES = "すべて";

export const normalizeFilterSelection = (value: unknown): string[] => {
  const values = Array.isArray(value) ? value : value == null ? [ALL_FILTER_VALUES] : [value];
  return values.includes(ALL_FILTER_VALUES)
    ? [ALL_FILTER_VALUES]
    : [...new Set(values.map(String))];
};

export const toggleFilterSelection = (selection: string[], option: string, options: string[]): string[] => {
  const selected = normalizeFilterSelection(selection);
  if (option === ALL_FILTER_VALUES) {
    return selected.includes(ALL_FILTER_VALUES) ? [] : [ALL_FILTER_VALUES];
  }
  const selectableOptions = options.filter((value) => value !== ALL_FILTER_VALUES);
  const values = selected.includes(ALL_FILTER_VALUES) ? selectableOptions : selected;
  if (values.includes(option)) return values.filter((value) => value !== option);

  const nextSelection = [...values, option];
  // Only an explicit check action can promote a partial selection to all.
  return selectableOptions.length > 0 && selectableOptions.every((value) => nextSelection.includes(value))
    ? [ALL_FILTER_VALUES]
    : nextSelection;
};

type EmailRow = Record<string, any>;
type Selections = Record<string, string[]>;

const organizationFilters = ["エリア", "テリトリー名", "MR"];
const scopeFilters = ["メール送付月", ...organizationFilters];
const recipientFilters = ["施設名", "医師名", "Target", "製品", "フラグメント"];

// Ignore only the filter itself so its alternatives remain selectable.
const optionDependencies: Record<string, string[]> = {
  メール送付月: [],
  ...Object.fromEntries(organizationFilters.map((category) => [
    category,
    ["メール送付月", ...organizationFilters.filter((other) => other !== category), ...recipientFilters],
  ])),
  ...Object.fromEntries(recipientFilters.map((category) => [
    category,
    [...scopeFilters, ...recipientFilters.filter((other) => other !== category)],
  ])),
};

const fields = {
  施設名: "HP_name",
  医師名: "Dr_name",
  製品: "prodcut1",
  フラグメント: "Email_Fragments_vod__r.Name",
};

const rowValues = (row: EmailRow, category: string): string[] => {
  if (category === "メール送付月") {
    const date = row.Email_Sent_Date_vod__c2 || row.Email_Sent_Date_vod__c;
    return date && dayjs(date).isValid() ? [dayjs(date).format("YYYY/M")] : [];
  }
  const value = row[fields[category] || category];
  return (Array.isArray(value) ? value.flat(2) : [value])
    .filter((item) => item != null && String(item).trim() !== "")
    .map(String);
};

export const matchesEmailFilter = (row: EmailRow, category: string, selection: string[]): boolean => {
  const selected = normalizeFilterSelection(selection);
  if (selected.includes(ALL_FILTER_VALUES)) return true;
  if (selected.length === 0) return false;
  // Targets without sent mail remain available for any selected month.
  if (category === "メール送付月" && row.isUnsentTarget) return true;
  return rowValues(row, category).some((value) => selected.some((item) => item.trim() === value.trim()));
};

export const buildEmailFilterOptions = (
  sentRows: EmailRow[],
  targetRows: EmailRow[],
  selections: Selections,
): Record<string, Record<string, string>> => {
  const allRows = [...sentRows, ...targetRows];
  return Object.fromEntries(Object.entries(optionDependencies).map(([category, dependencies]) => {
    const source = ["メール送付月", "製品", "フラグメント"].includes(category) ? sentRows : allRows;
    const values = new Set(source
      .filter((row) => dependencies.every((dependency) => matchesEmailFilter(row, dependency, selections[dependency])))
      .flatMap((row) => rowValues(row, category))
      .filter((value) => !["医師名", "Target"].includes(category) || !["null", "undefined", "nan"].includes(value.trim().toLowerCase())));

    values.delete(ALL_FILTER_VALUES);
    return [category, Object.fromEntries([ALL_FILTER_VALUES, ...values].map((value) => [value, value]))];
  }));
};
