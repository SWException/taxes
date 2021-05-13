import { APIGatewayProxyHandler } from 'aws-lambda';
import response from "src/utils/apiResponse";
import Model from "src/core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TAX_ID: string = event.pathParameters?.id;
    if(TAX_ID == null)
        return response(400, "request error");
    const MODEL: Model = Model.createModel();
    return await MODEL.getTax(TAX_ID)
        .then((tax => tax ? response(200, "success", tax) : response(400, "error")))
        .catch((err: Error) => response(400, err.message));
}