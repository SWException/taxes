import { APIGatewayProxyHandler } from 'aws-lambda';
import checkVendor from "./utils";
import response from "src/handlers/apiResponse";
import { Model } from "../core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN: string = event.headers?.Authorization;
    const TAX_ID: string = event.pathParameters?.id;
    if (TOKEN == null || TAX_ID == null) {
        return response(400, "request error");
    }
    const VALID: boolean = await checkVendor(TOKEN);
    if(!VALID)
        return response(400, "token not valid");
    
    const MODEL: Model = Model.createModel();
    const RESULT: boolean = MODEL.deleteTax(TAX_ID);
    return RESULT ? response(200, "tax deleted") : response(400, "request error");
}