import { Persistence } from "../repository/persistence"
import { Dynamo } from "../repository/dynamo"
import { DbMock } from "../repository/dbMock";
import { Tax } from "./tax";
import { v4 as uuidv4 } from 'uuid';
import { Users } from "src/repository/users";
import { UsersService } from "src/repository/usersService";
import { UsersMock } from "src/repository/usersMock";
import { buildAjv } from 'src/utils/configAjv';
import Ajv from 'ajv';

export default class Model {
    private readonly DATABASE: Persistence;
    private readonly USERS: Users;
    private readonly AJV: Ajv = buildAjv();
    
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

    public async createTax (newTax: any, token: string): Promise<boolean> {
        if (!newTax) {
            throw new Error("invalid tax attributes");
        }

        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }

        const VALID = this.AJV.validate("schemas/taxes.json#/insertTax", newTax);
        if (!VALID) {
            throw new Error("Tax does not match the schema of required attributes");
        }

        let result: boolean = false;
        if(newTax.value > 0 && newTax.description.length > 0) {
            const TAX = new Tax(uuidv4(), newTax.value, newTax.description);
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

    public async updateTax (id: string, newTax: any, token: string): Promise<boolean> {
        if (!newTax) {
            throw new Error("invalid tax attributes");
        }

        if(!id){
            throw new Error("invalid tax id");
        }

        const IS_VENDOR = await this.USERS.checkVendor(token);
        if (!IS_VENDOR){
            throw new Error("invalid token");
        }

        const VALID = this.AJV.validate("schemas/taxes.json#/editTax", newTax);
        if (!VALID) {
            throw new Error("Tax does not match the schema of Tax");
        }

        if(newTax?.value == null && newTax?.description == null) {
            throw new Error("Tax value or description must be defined");
        }
        
        if(newTax.value == null || newTax.description == null) {
            const ACTUAL: Tax = await this.DATABASE.getItem(id);
            if(newTax.value == null) 
                newTax.value = ACTUAL.getValue();
            
            if(newTax.description == null) 
                newTax.description = ACTUAL.getDescription();
        }

        return this.DATABASE.editItem(new Tax(id, newTax.value, newTax.description));
    }
}