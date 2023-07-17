import { DbLoadAllAccounts } from "../../../../data/usecases/users/load-all-accounts";
import { LoadAllAccountController } from "../../../../presentation/controllers/user/load-all-accounts-controller";
import { makeUserRepository } from "../../repositories";

export const makeLoadAllAccountsController = () => {
    const loadAllAccountsRepository = makeUserRepository();
    const dbLoadAllAccounts = new DbLoadAllAccounts(loadAllAccountsRepository);
    return new LoadAllAccountController(dbLoadAllAccounts);
}