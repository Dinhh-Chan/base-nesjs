import { SqlRepository } from "@module/repository/sequelize/sql.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EventAccount } from "../entities/event-account.entity";
import { EventAccountRepository } from "./event-account-repository.interface";

@Injectable()
export class EventAccountSequelizeRepository
    extends SqlRepository<EventAccount>
    implements EventAccountRepository
{
    constructor(
        @InjectModel(EventAccount)
        private readonly eventAccountModel: typeof EventAccount,
    ) {
        super(eventAccountModel);
    }

    async findByUsername(username: string): Promise<EventAccount | null> {
        return this.getOne({ username });
    }

    async findByDeviceId(deviceId: string): Promise<EventAccount[]> {
        return this.getMany({ device_id: deviceId });
    }
}
