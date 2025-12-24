import { Document, Types } from 'mongoose';
export type DailyLogDocument = DailyLog & Document;
export declare class DailyLog {
    userId: Types.ObjectId;
    cycleId: Types.ObjectId;
    date: Date;
    periodIndicators: string[];
    sexualHealth: string[];
    physicalPain: string[];
    moodMental: string[];
    flowIntensity: number;
    notes: string;
    isPeriodDay: boolean;
}
export declare const DailyLogSchema: import("mongoose").Schema<DailyLog, import("mongoose").Model<DailyLog, any, any, any, Document<unknown, any, DailyLog, any, import("mongoose").DefaultSchemaOptions> & DailyLog & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, DailyLog>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DailyLog, Document<unknown, {}, DailyLog, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cycleId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    date?: import("mongoose").SchemaDefinitionProperty<Date, DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    periodIndicators?: import("mongoose").SchemaDefinitionProperty<string[], DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sexualHealth?: import("mongoose").SchemaDefinitionProperty<string[], DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    physicalPain?: import("mongoose").SchemaDefinitionProperty<string[], DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    moodMental?: import("mongoose").SchemaDefinitionProperty<string[], DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    flowIntensity?: import("mongoose").SchemaDefinitionProperty<number, DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isPeriodDay?: import("mongoose").SchemaDefinitionProperty<boolean, DailyLog, Document<unknown, {}, DailyLog, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DailyLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, DailyLog>;
