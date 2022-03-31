export interface IWrite<T> {
    create(entity: object): Promise<T | any>;
    createOrUpdate(conditions: object, entity: object): Promise<T>;

    updateMany(conditions: any, docs: any): Promise<number>;
    update(conditions: any, docs: any): Promise<number>;

    delete(filter: any): Promise<any>;
    deleteAll(filter: any): Promise<any>;
    deleteSoft(conditions: any, docs: any): Promise<boolean>;
}
