import { Tax } from "src/core/tax";
import { Persistence } from "./persistence";

export class DbMock implements Persistence {
    getAll (): Array<Tax> {
        return 
        [
            {id: "1", value: 3, description:"first necessity items"},
            {id:"2", value: 22, description: "standard"}
        ];
    }
    getItem (id: string): Tax {
        throw new Error("Method not implemented.");
    }
    addItem (item: Tax): boolean {
        throw new Error("Method not implemented.");
    }
    editItem (item: Tax): boolean {
        throw new Error("Method not implemented.");
    }
    deleteItem (id: string): boolean {
        throw new Error("Method not implemented.");
    }

}