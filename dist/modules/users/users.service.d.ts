import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findById(id: string): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument | null>;
    create(userData: Partial<User>): Promise<UserDocument>;
    update(id: string, userData: Partial<User>): Promise<UserDocument>;
    dismissCard(id: string, cardId: string): Promise<UserDocument>;
    getFirstUser(): Promise<UserDocument | null>;
}
