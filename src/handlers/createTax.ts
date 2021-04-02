import { APIGatewayProxyHandler } from 'aws-lambda';
import checkVendor from "./utils";
import response from "src/handlers/apiResponse";
import { Model } from "../core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN: string = event.headers?.Authorization;
    if (TOKEN == null) {
        return response(400, "missing token");
    }
    const VALID: boolean = await checkVendor(TOKEN);
    if(!VALID)
        return response(400, "token not valid");
    const BODY = event.body;
    const MODEL: Model = Model.createModel();
    const RESULT: boolean = MODEL.createTax(BODY["value"], BODY["description"]);
    return RESULT ? response(200, "tax inserted") : response(400, "request error");
}

