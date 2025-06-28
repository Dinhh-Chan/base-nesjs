import { compareUserPassword, createUserPassword } from "@common/constant";
import { Entity } from "@module/repository";
import { InjectRepository } from "@module/repository/common/repository";
import {
    Injectable,
    ConflictException,
    NotFoundException,
} from "@nestjs/common";
import { CreateEventAccountDto } from "./dto/create-event-account.dto";
import { UpdateEventAccountDto } from "./dto/update-event-account.dto";
import { EventAccount } from "./entities/event-account.entity";
import { EventAccountRepository } from "./repository/event-account-repository.interface";

@Injectable()
export class EventAccountService {
    constructor(
        @InjectRepository(Entity.EVENT_ACCOUNT)
        private readonly eventAccountRepository: EventAccountRepository,
    ) {}

    async create(
        createEventAccountDto: CreateEventAccountDto,
    ): Promise<EventAccount> {
        // Kiểm tra username đã tồn tại chưa
        const existingAccount =
            await this.eventAccountRepository.findByUsername(
                createEventAccountDto.username,
            );
        if (existingAccount) {
            throw new ConflictException("Username already exists");
        }

        // Hash password
        const hashedPassword = await createUserPassword(
            createEventAccountDto.password,
        );

        const eventAccount = await this.eventAccountRepository.create({
            ...createEventAccountDto,
            password: hashedPassword,
        });

        return eventAccount;
    }

    async findAll(): Promise<EventAccount[]> {
        return this.eventAccountRepository.getMany({});
    }

    async findOne(id: string): Promise<EventAccount> {
        const eventAccount = await this.eventAccountRepository.getById(id);
        if (!eventAccount) {
            throw new NotFoundException("Event account not found");
        }
        return eventAccount;
    }

    async findByUsername(username: string): Promise<EventAccount | null> {
        return this.eventAccountRepository.findByUsername(username);
    }

    async findByDeviceId(deviceId: string): Promise<EventAccount[]> {
        return this.eventAccountRepository.findByDeviceId(deviceId);
    }

    async update(
        id: string,
        updateEventAccountDto: UpdateEventAccountDto,
    ): Promise<EventAccount> {
        const eventAccount = await this.findOne(id);

        // Nếu có update username, kiểm tra trùng lặp
        if (
            updateEventAccountDto.username &&
            updateEventAccountDto.username !== eventAccount.username
        ) {
            const existingAccount =
                await this.eventAccountRepository.findByUsername(
                    updateEventAccountDto.username,
                );
            if (existingAccount) {
                throw new ConflictException("Username already exists");
            }
        }

        // Nếu có update password, hash nó
        if (updateEventAccountDto.password) {
            updateEventAccountDto.password = await createUserPassword(
                updateEventAccountDto.password,
            );
        }

        const updatedAccount = await this.eventAccountRepository.updateById(
            id,
            updateEventAccountDto,
        );
        if (!updatedAccount) {
            throw new NotFoundException("Event account not found");
        }

        return updatedAccount;
    }

    async remove(id: string): Promise<EventAccount> {
        const deletedAccount = await this.eventAccountRepository.deleteById(id);
        if (!deletedAccount) {
            throw new NotFoundException("Event account not found");
        }
        return deletedAccount;
    }

    async validatePassword(
        username: string,
        password: string,
    ): Promise<EventAccount | null> {
        const account = await this.findByUsername(username);
        if (!account) {
            return null;
        }

        const isPasswordValid = await compareUserPassword(
            password,
            account.password,
        );
        return isPasswordValid ? account : null;
    }
}
