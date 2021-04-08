import { Users } from "./users";

export class UsersMock implements Users {
    public async checkVendor(token: string): Promise<boolean> {
        console.log(token);
        return true;
    }  
}