export interface User {
  id: string;
  name: string;
  email: string;
}

export enum RolesEnum {
  USER = "user",
  ADMIN = "admin",
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}