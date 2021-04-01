import { Persistence } from "../repository/persistence"
import { Dynamo } from "../repository/dynamo"
import { DbMock } from "../repository/dbMock";
import { Tax } from "./tax";
import {v4 as uuidv4} from 'uuid';

export class Controller {
    private readonly DATABASE: Persistence;
    
    private constructor (db: Persistence) {
        this.DATABASE = db;
    }

    public static createController (): Controller {
        return new Controller(new Dynamo());
    }

    public static createControllerMock (): Controller {
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
        const TAXES: Array<Tax> = this.DATABASE.getAll();
        if(TAXES == null)
            return null;
        
        const OBJ = {};
        TAXES.forEach(item => {
            OBJ[item.getID()] = 
            {
                value: item.getValue(),
                description: item.getDescription()
            }
        });
        return JSON.parse(JSON.stringify(OBJ));
    }

    public getTax (id: string): string {
        const TAX = this.DATABASE.getItem(id);
        return JSON.stringify(TAX);
    }

    public deleteTax (id: string): boolean {
        return this.DATABASE.deleteItem(id);
    }

    public updateTax (id: string, value?: number, description?: string): boolean {
        if(value == null && description == null)
            return false;
        
        if(value == null || description == null) {
            const ACTUAL: Tax = this.DATABASE.getItem(id);
            if(value == null) 
                value = ACTUAL.getValue();
            
            if(description == null) 
                description = ACTUAL.getDescription();
        }

        return this.DATABASE.editItem(new Tax(id, value, description));
    }
}