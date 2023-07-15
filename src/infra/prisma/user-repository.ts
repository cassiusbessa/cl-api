import { PrismaClient } from '@prisma/client';
import { AddAccountRepository, LoadAccountByEmailRepository } from 'src/data/protocols/repositories/user-repository';
import { User } from 'src/domain/entities/user';
import { AccountModel } from 'src/domain/usecases/users/add-account';


export class UserRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  private readonly prisma = new PrismaClient();

  async add(accountData: AccountModel): Promise<User> {
    return await this.prisma.user.create({data: { ...accountData}}, );
  }

  async loadByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({where: {email}});
  }

}