import { APIGatewayProxyHandler } from 'aws-lambda';
import checkVendor from "./utils";
import response from "src/handlers/apiResponse";
import { Model } from "../core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN: string = event.headers?.Authorization;
    const TAX_ID: string = event.pathParameters?.id;
    if (TOKEN == null || TAX_ID == null) {
        return response(400, "missing token");
    }
    const VALID: boolean = await checkVendor(TOKEN);
    if(!VALID)
        return response(400, "token not valid");
    const BODY = event.body;
    const MODEL: Model = Model.createModel();
    const RESULT: boolean = MODEL.updateTax(TAX_ID, BODY["value"], BODY["description"]);
    return RESULT ? response(200, "update successful") : response(400, "update failure");
}