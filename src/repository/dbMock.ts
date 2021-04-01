import { Tax } from "src/core/tax";
import { Persistence } from "./persistence";

export class DbMock implements Persistence {
    private static readonly TAX1 = new Tax("1", 22, "standard");
    private static readonly TAX2 = new Tax("2", 10, "food & beverage");
    private static readonly TAX3 = new Tax("3", 4, "primary necessity");

    getAll (): Array<Tax> {
        return [DbMock.TAX1, DbMock.TAX2, DbMock.TAX3];
    }
    getItem (id: string): Tax {
        return DbMock.TAX1;
    }
    addItem (item: Tax): boolean {
        return true;
    }
    editItem (item: Tax): boolean {
        return true;
    }
    deleteItem (id: string): boolean {
        return true;
    }

}