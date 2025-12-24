import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getCurrentUser(): Promise<import("./user.schema").UserDocument | {
        message: string;
    }>;
    updateCurrentUser(updateData: Partial<{
        firstName: string;
        lastName: string;
        avatarUrl: string;
    }>): Promise<import("./user.schema").UserDocument | {
        message: string;
    }>;
    dismissCard(cardId: string): Promise<import("./user.schema").UserDocument | {
        message: string;
    }>;
}
