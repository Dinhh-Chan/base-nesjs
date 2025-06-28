import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "@common/guard/jwt-auth.guard";
import { EventAccountService } from "./event-account.service";
import { CreateEventAccountDto } from "./dto/create-event-account.dto";
import { UpdateEventAccountDto } from "./dto/update-event-account.dto";
import { EventAccount } from "./entities/event-account.entity";

@ApiTags("Event Account")
@Controller("event-account")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EventAccountController {
    constructor(private readonly eventAccountService: EventAccountService) {}

    @Post()
    @ApiOperation({ summary: "Tạo event account mới" })
    @ApiResponse({
        status: 201,
        description: "Event account đã được tạo thành công",
        type: EventAccount,
    })
    @ApiResponse({ status: 409, description: "Username đã tồn tại" })
    async create(
        @Body() createEventAccountDto: CreateEventAccountDto,
    ): Promise<EventAccount> {
        return this.eventAccountService.create(createEventAccountDto);
    }

    @Get()
    @ApiOperation({ summary: "Lấy danh sách tất cả event accounts" })
    @ApiResponse({
        status: 200,
        description: "Danh sách event accounts",
        type: [EventAccount],
    })
    async findAll(): Promise<EventAccount[]> {
        return this.eventAccountService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Lấy event account theo ID" })
    @ApiResponse({
        status: 200,
        description: "Thông tin event account",
        type: EventAccount,
    })
    @ApiResponse({ status: 404, description: "Event account không tồn tại" })
    async findOne(@Param("id") id: string): Promise<EventAccount> {
        return this.eventAccountService.findOne(id);
    }

    @Get("username/:username")
    @ApiOperation({ summary: "Lấy event account theo username" })
    @ApiResponse({
        status: 200,
        description: "Thông tin event account",
        type: EventAccount,
    })
    @ApiResponse({ status: 404, description: "Event account không tồn tại" })
    async findByUsername(
        @Param("username") username: string,
    ): Promise<EventAccount | null> {
        return this.eventAccountService.findByUsername(username);
    }

    @Get("device/:deviceId")
    @ApiOperation({ summary: "Lấy event accounts theo device ID" })
    @ApiResponse({
        status: 200,
        description: "Danh sách event accounts",
        type: [EventAccount],
    })
    async findByDeviceId(
        @Param("deviceId") deviceId: string,
    ): Promise<EventAccount[]> {
        return this.eventAccountService.findByDeviceId(deviceId);
    }

    @Patch(":id")
    @ApiOperation({ summary: "Cập nhật event account" })
    @ApiResponse({
        status: 200,
        description: "Event account đã được cập nhật",
        type: EventAccount,
    })
    @ApiResponse({ status: 404, description: "Event account không tồn tại" })
    @ApiResponse({ status: 409, description: "Username đã tồn tại" })
    async update(
        @Param("id") id: string,
        @Body() updateEventAccountDto: UpdateEventAccountDto,
    ): Promise<EventAccount> {
        return this.eventAccountService.update(id, updateEventAccountDto);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Xóa event account" })
    @ApiResponse({
        status: 200,
        description: "Event account đã được xóa",
        type: EventAccount,
    })
    @ApiResponse({ status: 404, description: "Event account không tồn tại" })
    async remove(@Param("id") id: string): Promise<EventAccount> {
        return this.eventAccountService.remove(id);
    }
}
