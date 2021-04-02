import { APIGatewayProxyHandler } from 'aws-lambda';
import response from "src/handlers/apiResponse";
import { Model } from "../core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TAX_ID: string = event.pathParameters?.id;
    if(TAX_ID == null)
        return response(400, "request error");
    const MODEL: Model = Model.createModel();
    const TAX: JSON = MODEL.getTax(TAX_ID);
    return TAX != null ? response(200, "success", TAX) : response(400, "error");
}