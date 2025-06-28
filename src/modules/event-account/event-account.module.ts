import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Entity } from "@module/repository";
import { RepositoryProvider } from "@module/repository/common/repository";
import { EventAccountController } from "./event-account.controller";
import { EventAccountService } from "./event-account.service";
import { EventAccount } from "./entities/event-account.entity";
import { EventAccountSequelizeRepository } from "./repository/event-account.repository";

@Module({
    imports: [SequelizeModule.forFeature([EventAccount])],
    controllers: [EventAccountController],
    providers: [
        EventAccountService,
        RepositoryProvider(
            Entity.EVENT_ACCOUNT,
            EventAccountSequelizeRepository,
        ),
    ],
    exports: [EventAccountService],
})
export class EventAccountModule {}
