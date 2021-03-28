import { Tax } from "src/core/tax"

export interface Persistence {
    getAll(): Array<Tax>;
    getItem(id: string): Tax;
    addItem(item: Tax): boolean;
    editItem(item: Tax): boolean;
    deleteItem(id: string): boolean;
}