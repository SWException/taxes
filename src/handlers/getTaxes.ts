import { APIGatewayProxyHandler } from 'aws-lambda';
import response from 'src/handlers/apiResponse';
import Model from "../core/model"

export const HANDLER: APIGatewayProxyHandler = async () => {
    const MODEL: Model = Model.createModel();
    const RESULT: JSON = await MODEL.getTaxes();
    if(RESULT == null)
        return response(400, "problem with persistence");
    else
        return response(200, "success", RESULT);
}