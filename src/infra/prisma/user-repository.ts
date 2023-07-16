import { UpdateAccountModel } from '@/domain/usecases/users/update-account';
import { PrismaClient } from '@prisma/client';
import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository, UpdateAccountRepository } from 'src/data/protocols/repositories/user-repository';
import { User } from 'src/domain/entities/user';
import { AccountModel } from 'src/domain/usecases/users/add-account';


export class UserRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository, UpdateAccountRepository {
  private readonly prisma = new PrismaClient();

  async add(accountData: AccountModel): Promise<User> {
    return await this.prisma.user.create({data: { ...accountData}}, );
  }

  async loadByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({where: {email}});
  }

  async update(updateAccountData: UpdateAccountModel): Promise<boolean> {
    const { id, ...rest } = updateAccountData;

    await this.prisma.user.update({where: {id}, data: {...rest } });
    return true;
  }

  async loadById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({where: {id}});
  }

}