import { AccountDetails } from '@/domain/usecases/users/load-account-details-by-id';
import { UpdateAccountModel } from '@/domain/usecases/users/update-account';
import { PrismaClient } from '@prisma/client';
import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository, LoadAccountDetailsByIdRepository, LoadAllAccountsRepository, UpdateAccountRepository } from 'src/data/protocols/repositories/user-repository';
import { User } from 'src/domain/entities/user';
import { AccountModel } from 'src/domain/usecases/users/add-account';


export class UserRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByIdRepository, UpdateAccountRepository, LoadAllAccountsRepository, LoadAccountDetailsByIdRepository {
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

  async loadAll(): Promise<Omit<User, 'password'>[]> {
    return await this.prisma.user.findMany(
      {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true
        }
      }
    );
  }

  async loadDetails(id: string): Promise<AccountDetails | null> {
    const find = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userProjects: {
          include: {
            project: true
          }
        }
      }
    });
  
    if (!find) return null;
  
    const projects = find.userProjects.map(userProject => userProject.project);
    const user = {id: find.id, fullName: find.fullName, email: find.email, role: find.role}
  
    return {
      user,
      projects
    };
  }



}