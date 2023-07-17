import { LoadAccountDetailsByIdRepository } from "@/data/protocols/repositories/user-repository";
import { AccountDetails, LoadAccountDetailsById } from "@/domain/usecases/users/load-account-details-by-id";

export class DbLoadAccountDetailsById implements LoadAccountDetailsById {
  constructor(private readonly loadAccountDetailsByIdRepository: LoadAccountDetailsByIdRepository) {}

  public async load(id: string): Promise<AccountDetails | null> {
    const accountDetails = await this.loadAccountDetailsByIdRepository.loadDetails(id);
    return accountDetails;
  }
}
