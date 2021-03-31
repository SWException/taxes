import { Tax } from "src/core/tax";
import { Persistence } from "src/repository/persistence"

export class Dynamo implements Persistence {
    private static readonly TABLE_TAXES = "taxes";

    getAll (): Array<Tax> {
        // TO-DO for DynamoDB Engineer
        return null;
    }
    getItem (id: string): Tax {
        // TO-DO for DynamoDB Engineer
        return null;
    }
    addItem (item: Tax): boolean {
        // TO-DO for DynamoDB Engineer
        return false;
    }
    editItem (item: Tax): boolean {
        // TO-DO for DynamoDB Engineer
        return false;
    }
    deleteItem (id: string): boolean {
        // TO-DO for DynamoDB Engineer
        return false;
    }

}