import { APIGatewayProxyHandler } from 'aws-lambda';
import response from "src/utils/apiResponse";
import Model from "src/core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN: string = event.headers?.Authorization;
    const TAX_ID: string = event.pathParameters?.id;
    if (TOKEN == null || TAX_ID == null) {
        return response(400, "missing token");
    }
    const BODY = JSON.parse(event.body);
    console.log(BODY);
    
    const MODEL: Model = Model.createModel();
    return await MODEL.updateTax(TAX_ID, BODY, TOKEN)
        .then((RESULT: boolean) => RESULT ? response(200, "update successful") : response(400, "update failure"))
        .catch((err: Error) => response(400, err.message));
}