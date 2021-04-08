import { Persistence } from "../repository/persistence"
import { Dynamo } from "../repository/dynamo"
import { DbMock } from "../repository/dbMock";
import { Tax } from "./tax";
import { v4 as uuidv4 } from 'uuid';
import { Users } from "src/repository/users";
import { UsersService } from "src/repository/usersService";
import { UsersMock } from "src/repository/usersMock";

export default class Model {
    private readonly DATABASE: Persistence;
    private readonly USERS: Users;
    
    private constructor (db: Persistence, users: Users) {
        this.DATABASE = db;
        this.USERS = users;
    }

    public static createModel (): Model {
        return new Model(new Dynamo(), new UsersService());
    }

    public static createModelMock (): Model {
        return new Model(new DbMock(), new UsersMock());
    }

    public async createTax (value: number, description: string, token: string): Promise<boolean> {
        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }
        let result: boolean = false;
        if(value > 0 && description.length > 0) {
            const TAX = new Tax(uuidv4(), value, description);
            result = await this.DATABASE.addItem(TAX);
        }
        return result;
    }

    public async getTaxes (): Promise<JSON> {
        const TAXES: Array<Tax> = await this.DATABASE.getAll();
        if(TAXES == null)
            return null;
        
        return JSON.parse(JSON.stringify(TAXES));
    }

    public async getTax (id: string): Promise<JSON> {
        const TAX: Tax = await this.DATABASE.getItem(id);
        return TAX ? JSON.parse(JSON.stringify(TAX)) : null;
    }

    public async deleteTax (id: string, token: string): Promise<boolean> {
        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }
        if(!id){
            return false;
        }
        return await this.DATABASE.deleteItem(id);
    }

    public async updateTax (token: string, id: string, value?: number, description?: string): Promise<boolean> {
        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }
        if(value == null && description == null)
            return false;
        
        if(value == null || description == null) {
            const ACTUAL: Tax = await this.DATABASE.getItem(id);
            if(value == null) 
                value = ACTUAL.getValue();
            
            if(description == null) 
                description = ACTUAL.getDescription();
        }

        return this.DATABASE.editItem(new Tax(id, value, description));
    }
}