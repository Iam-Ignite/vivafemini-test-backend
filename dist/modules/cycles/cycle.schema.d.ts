import { Document, Types } from 'mongoose';
export type CycleDocument = Cycle & Document;
export declare class Cycle {
    userId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    cycleLength: number;
    periodLength: number;
    isActive: boolean;
    ovulationDate: Date;
    fertileWindow: {
        start: Date;
        end: Date;
    };
    pregnancyTestResult: {
        taken: boolean;
        result: 'positive' | 'negative' | 'faint' | 'not_taken';
        date: Date;
    };
}
export declare const CycleSchema: import("mongoose").Schema<Cycle, import("mongoose").Model<Cycle, any, any, any, Document<unknown, any, Cycle, any, import("mongoose").DefaultSchemaOptions> & Cycle & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, Cycle>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cycle, Document<unknown, {}, Cycle, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cycleLength?: import("mongoose").SchemaDefinitionProperty<number, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    periodLength?: import("mongoose").SchemaDefinitionProperty<number, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ovulationDate?: import("mongoose").SchemaDefinitionProperty<Date, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fertileWindow?: import("mongoose").SchemaDefinitionProperty<{
        start: Date;
        end: Date;
    }, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    pregnancyTestResult?: import("mongoose").SchemaDefinitionProperty<{
        taken: boolean;
        result: "positive" | "negative" | "faint" | "not_taken";
        date: Date;
    }, Cycle, Document<unknown, {}, Cycle, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Cycle & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Cycle>;
