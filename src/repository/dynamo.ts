import { Tax } from "src/core/tax";
import { Persistence } from "src/repository/persistence";
import * as AWS from "aws-sdk";

export class Dynamo implements Persistence {

    private static readonly TABLE_TAXES = "taxes";
    private DOCUMENT_CLIENT = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });

    public async getAll (search?: string): Promise<Array<Tax>> {
        const PARAMS = {
            TableName: Dynamo.TABLE_TAXES
        };

        if (search) {
            PARAMS['FilterExpression'] = "contains(#description, :search)";
            PARAMS['ExpressionAttributeValues'] = {
                ":search": search
            };
            PARAMS['ExpressionAttributeNames'] = {
                "#description": "description",
            }
        }

        const DATA = await this.DOCUMENT_CLIENT.scan(PARAMS).promise();
        console.log("Data from DB: " + JSON.stringify(DATA));
        const TAXES = new Array<Tax>();
        DATA.Items.forEach(element => {
            TAXES.push(new Tax(element.id, element.value, element.description));
        });

        return TAXES ;
    } 

    public async getItem (id: string): Promise<Tax> {
        const PARAMS = {
            Key: {
                id: id
            },
            TableName: Dynamo.TABLE_TAXES,
            IndexName: "id-index"
        };

        const DATA = await this.DOCUMENT_CLIENT.get(PARAMS).promise();
        return DATA.Item? new Tax(DATA.Item.id, DATA.Item.value, DATA.Item.description) : null;
    }

    public async addItem (item: Tax): Promise<boolean> {
        const PARAMS = {
            TableName: Dynamo.TABLE_TAXES,
            Key: {
                id: item.getID()
            },
            Item: item
        };

       const DATA =  this.DOCUMENT_CLIENT.put(PARAMS).promise();

       return (DATA) ? true : false;
    }

    public async editItem (item: Tax): Promise<boolean> {
        const PARAMS = {
            TableName: Dynamo.TABLE_TAXES,
            Key: {
                id: item.getID()
            },
            UpdateExpression: "SET #value = :value, #description = :description",
            ExpressionAttributeValues: {
                ":value": item.getValue(),
                ":description": item.getDescription()
            },
            ExpressionAttributeNames:{
                "#value": "value",
                "#description": "description"
            }
        }
        console.log(PARAMS);

        const DATA = await this.DOCUMENT_CLIENT.update(PARAMS).promise();
        return DATA? true : false;
    }

    public async deleteItem (id: string): Promise<boolean> {
        const PARAMS = {
            Key: {
                id: id
            },
            TableName: Dynamo.TABLE_TAXES,
            IndexName: "id-index"
        };

       await this.DOCUMENT_CLIENT.delete(PARAMS).promise();
        return true;;      
    }
}
