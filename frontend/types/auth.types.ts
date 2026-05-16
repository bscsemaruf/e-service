// types/auth.types.ts

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  admin: IAdmin;
  token: string;
}

// LocalStorage এ যা store হবে
export interface IAuthState {
  admin: IAdmin | null;
  token: string | null;
  isAuthenticated: boolean;
}
