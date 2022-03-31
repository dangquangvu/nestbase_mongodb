export interface IRead<T> {
    find(params: object, populates: string[]): Promise<T[]>;
    findAll(
        filter: object,
        skip: number,
        limit: number,
        sort: {[key: string]: any},
    ): Promise<Array<T>>;
    findById(id: string, populates: string[]): Promise<T>;
    findOne(params: object, populates: string[]): Promise<T>;

    count(conditions: object): Promise<number>;
}
