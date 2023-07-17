import { Role } from "@/domain/entities/user";

export interface UpdateAccount {
  update: (account: UpdateAccountModel) => Promise<boolean>;
}

export interface UpdateAccountModel {
  id: string;
  fullName?: string;
  email: string;
  password?: string;
  role?: Role | null;
}