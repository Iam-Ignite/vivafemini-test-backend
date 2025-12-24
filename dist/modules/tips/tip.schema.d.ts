import { Document } from 'mongoose';
export type TipDocument = Tip & Document;
export declare class Tip {
    title: string;
    content: string;
    icon: string;
    cycleDays: number[];
    category: string;
    actionText: string;
}
export declare const TipSchema: import("mongoose").Schema<Tip, import("mongoose").Model<Tip, any, any, any, Document<unknown, any, Tip, any, import("mongoose").DefaultSchemaOptions> & Tip & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Tip>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tip, Document<unknown, {}, Tip, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Tip & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Tip, Document<unknown, {}, Tip, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Tip & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Tip, Document<unknown, {}, Tip, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Tip & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    icon?: import("mongoose").SchemaDefinitionProperty<string, Tip, Document<unknown, {}, Tip, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Tip & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cycleDays?: import("mongoose").SchemaDefinitionProperty<number[], Tip, Document<unknown, {}, Tip, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Tip & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Tip, Document<unknown, {}, Tip, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Tip & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    actionText?: import("mongoose").SchemaDefinitionProperty<string, Tip, Document<unknown, {}, Tip, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Tip & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Tip>;
