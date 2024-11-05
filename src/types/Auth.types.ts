import { z } from "zod";

export const CreateLoginZod = z.object({
  email: z.string(),
  password: z.string(),
});

export type CreateLoginDto = z.infer<typeof CreateLoginZod>;

export interface LoginResponse {
  email: string;
  name: string;
  jwt: string;
}

export const CreateRegisterZod = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export type CreateRegisterDto = z.infer<typeof CreateRegisterZod>;

export interface RegisterResponse {
  email: string;
  name: string;
  id: number;
}

export const CreateLogoutZod = z.object({
  email: z.string(),
  refresh_token: z.string(),
});

export type CreateLogoutDto = z.infer<typeof CreateLogoutZod>;

export interface LogoutResponse {
  message?: string;
  detail?: string;
}
