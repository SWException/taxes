import { Tax } from "src/core/tax"

export interface Persistence {
    getAll(search?: string): Promise<Array<Tax>>;
    getItem(id: string): Promise<Tax>;
    addItem(item: Tax): Promise<boolean>;
    editItem(item: Tax): Promise<boolean>;
    deleteItem(id: string): Promise<boolean>;
}