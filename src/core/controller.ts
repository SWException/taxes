import { Persistence } from "../repository/persistence"
import { Dynamo } from "../repository/dynamo"
import { DbMock } from "../repository/dbMock";
import { Tax } from "tax";
import {v4 as uuidv4} from 'uuid';

class Controller {
    private readonly DATABASE: Persistence;
    
    private constructor (db: Persistence) {
        this.DATABASE = db;
    }

    public static createControllerWithDynamoDb (): Controller {
        return new Controller(new Dynamo());
    }

    public static createControllerWithMockDb (): Controller {
        return new Controller(new DbMock());
    } 

    public createTax (value: number, description: string): boolean {
        let result = false;
        if(value > 0 && description.length > 0) {
            const TAX = new Tax(uuidv4(), value, description);
            result = this.DATABASE.addItem(TAX);
        }
        return result;
    }

    public getTaxes (): JSON {
        return null;
    }

    public getTax (id: string): JSON {
        return null;
    }

    public deleteTax (id: string): boolean {
        return false;
    }

    public updateTax(id: string, value: number, description: string): boolean {
        return false;
    }
}