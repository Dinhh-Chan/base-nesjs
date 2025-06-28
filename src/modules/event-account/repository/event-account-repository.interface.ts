import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { EventAccount } from "../entities/event-account.entity";

export interface EventAccountRepository extends BaseRepository<EventAccount> {
    findByUsername(username: string): Promise<EventAccount | null>;
    findByDeviceId(deviceId: string): Promise<EventAccount[]>;
}
