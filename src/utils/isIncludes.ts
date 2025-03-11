// 特定要素を複数指定する。arr：特定要素の配列、target：検索したい配列
export const isIncludes = (target: Array<any>, arr: Array<any>): boolean => arr.some((x) => target.includes(x))
