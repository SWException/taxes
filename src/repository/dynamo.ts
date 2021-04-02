import { Tax } from "src/core/tax";
import { Persistence } from "src/repository/persistence"
import generateID from "src/repository/generateID";
import * as AWS from "aws-sdk";

export class Dynamo implements Persistence {
    private static readonly TABLE_TAXES = "taxes";
    private DOCUMENT_CLIENT = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });



    getAll (): Array<Tax> {
        // TO-DO for DynamoDB Engineer
        return null;
    }

      async getItem (id: string): Promise<Tax> {

        const PARAMS = {
            Key: {
                id: id
            },
            TableName: Dynamo.TABLE_TAXES,
            IndexName: "id-index"
        };

        const DATA = await this.DOCUMENT_CLIENT.get(PARAMS).promise();
        
        // DA VEDERE LA COSTRUZIONE !!!!    
        let objTax: Tax = AWS.DynamoDB.Converter.unmarshall(DATA.Item) as Tax;
        return objTax;


            
    }
    async addItem (item: Tax): Promise<boolean> {
        
        const PARAMS = {
            TableName: Dynamo.TABLE_TAXES,
            Key: {
                id: generateID()
            },
            Item: item
        };

       const DATA =  this.DOCUMENT_CLIENT.put(PARAMS).promise().catch(
            () => {return false; }
       );

       return (DATA) ? true : false;

    }



    async editItem (item: Tax): Promise<boolean> {
    
        const VALUES = {};
        let expression = "SET ";
        let first = true;

        Object.keys(item).forEach(function (key) {
            if (key != "id") {
                const VALUE = data[key];
                if (!first) {
                    expression += ", "
                } 
                else {
                    first = false;
                }
                expression += key + " = :" + key;
                VALUES[":" + key] = VALUE;
            }
        });

        const PARAMS = {
            TableName: Dynamo.TABLE_TAXES,
            Key: {
                id: generateID()
            },
            UpdateExpression: expression,
            ExpressionAttributeValues: VALUES
        }
        console.log(PARAMS);

        const DATA = await this.DOCUMENT_CLIENT.update(PARAMS).promise().catch(
            (err) => { return err; }
        );
        return DATA;
    }

    
    async deleteItem (id: string): Promise<boolean> {
    
        const PARAMS = {
            Key: {
                id: id
            },
            TableName: Dynamo.TABLE_TAXES,
            IndexName: "id-index"
        };

       await this.DOCUMENT_CLIENT.delete(PARAMS).promise().catch(
            (err) => { return err; }
        );
        return true;;      
    }

}
