export interface User {
  ID?: string
  Name?: string
  EmployeeNumber?: string
  Username?: string
}

export interface UserList {
  [key: string]: User
}
