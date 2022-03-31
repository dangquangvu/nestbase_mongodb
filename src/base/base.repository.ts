import {Document, Model} from 'mongoose';
import {EventEmitter} from 'events';
import {IWrite} from './IWrite.interface';
import {IRead} from './IRead.interface';

export class BaseRepository<T extends Document> extends EventEmitter
    implements IRead<T>, IWrite<T> {
    protected primaryKey: string = '_id';

    constructor(protected readonly model: Model<T>) {
        super();
        this.model = model;
    }

    async create(entity: object): Promise<any> {
        try {
            const model = await new this.model(entity).save();
            // emit on created
            this.onCreated(model);
            return model;
        } catch (e) {
            throw e;
        }
    }

    async createOrUpdate(conditions: object, entity: object): Promise<T> {
        let model = await this.findOne(conditions);
        if (model === null) {
            model = await new this.model(entity).save();
            this.onCreated(model);
        } else {
            await model.set(entity).save();
        }
        return model;
    }

    async updateMany(conditions: any, docs: any): Promise<number> {
        const result = await this.model.updateMany(conditions, docs);
        return result.ok ? result.nModified : 0;
    }

    async update(conditions: object, docs: object): Promise<number> {
        const result = await this.model.updateOne(conditions, docs);
        return result.ok ? result.nModified : 0;
    }

    async delete(filter: any): Promise<any> {
        const result = await this.model.deleteOne(filter);
        return result.ok ? result.deletedCount : 0;
    }

    async deleteAll(filter: any): Promise<any> {
        const result = await this.model.deleteMany(filter);
        return result;
    }

    deleteSoft(conditions: any, docs: any): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async find(params: object, populates: string[] = []): Promise<T[]> {
        try {
            const models = await this.model.find(params);

            if (populates.length) {
                for (const path of populates) {
                    for (const model of models) {
                        await model.populate(path).execPopulate();
                    }
                }
            }
            return models;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAll(
        filter: object = {},
        skip: number = 0,
        limit: number = 20,
        sort: {[key: string]: any} = {},
    ): Promise<T[]> {
        try {
            const query = await this.model
                .find(filter)
                .skip(skip)
                .limit(limit)
                .sort(sort);
            // const result = await query;
            return query;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findById(id: string, populates: string[] = []): Promise<T> {
        const model = await this.model.findById({[this.primaryKey]: id});

        if (model && populates.length) {
            for (const path of populates) {
                await model.populate(path).execPopulate();
            }
        }

        return model;
    }

    async findOne(params: object, populates: string[] = []): Promise<T> {
        const model = await this.model.findOne(params);
        if (model && populates.length) {
            for (const path of populates) {
                await model.populate(path).execPopulate();
            }
        }
        return model;
    }

    async count(conditions: object): Promise<number> {
        try {
            const model = this.model.countDocuments(conditions);
            return await model.exec();
        } catch (error) {
            throw error;
        }
    }

    // tslint:disable-next-line: no-empty
    onCreated(model: Document): void {}

    // async findOrFail(id: string): Promise<T> {
    //     try {
    //         const model: T = await this.findById(id);

    //         if (model !== null) {
    //             return model;
    //         }

    //         throw new ModelNotFoundException(`Model [${id}] not found`);
    //     } catch (e) {
    //         if (e.name !== undefined && e.name === 'CastError') {
    //             throw new BadRequestException(e.message);
    //         }

    //         throw e;
    //     }
    // }
}
