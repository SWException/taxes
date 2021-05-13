import { APIGatewayProxyHandler } from 'aws-lambda';
import response from "src/utils/apiResponse";
import Model from "src/core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN: string = event.headers?.Authorization;
    const TAX_ID: string = event.pathParameters?.id;
    if (TOKEN == null || TAX_ID == null) {
        return response(400, "request error");
    }

    const MODEL: Model = Model.createModel();
    return await MODEL.deleteTax(TAX_ID, TOKEN)
        .then((RESULT: boolean) => RESULT ? response(200, "tax deleted") : 
            response(400, "request error"))
        .catch((err: Error) => response(400, err.message));
}