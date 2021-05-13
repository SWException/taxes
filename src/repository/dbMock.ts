import { Tax } from "src/core/tax";
import { Persistence } from "./persistence";

export class DbMock implements Persistence {
    private static readonly TAX1 = new Tax("1", 22, "standard");
    private static readonly TAX2 = new Tax("2", 10, "food & beverage");
    private static readonly TAX3 = new Tax("3", 4, "primary necessity");

    public async getAll (_search?: string): Promise<Array<Tax>> {
        return [DbMock.TAX1, DbMock.TAX2, DbMock.TAX3];
    }
    public async getItem (id: string): Promise<Tax> {
        return id ? DbMock.TAX1 : null;
    }
    public async addItem (item: Tax): Promise<boolean> {
        return item && item.getID() && item.getValue && item.getDescription() ? true : null;
    }
    public async editItem (item: Tax): Promise<boolean> {
        return item && item.getID() && (item.getValue || item.getDescription()) ? true : null;
    }
    public async deleteItem (id: string): Promise<boolean> {
        return id ? true : null;
    }

}