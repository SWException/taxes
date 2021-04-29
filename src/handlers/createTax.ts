import { APIGatewayProxyHandler } from 'aws-lambda';
import response from "src/utils/apiResponse";
import Model from "src/core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN: string = event.headers?.Authorization;
    if (TOKEN == null) {
        return response(400, "missing token");
    }
    console.log(event);
    console.log(event.body);
    
    
    const BODY = JSON.parse(event.body);
    if (BODY == null || BODY["value"] == null || BODY["description"] == null) {
        return response(400, "missing body");
    }

    const MODEL: Model = Model.createModel();
    return await MODEL.createTax(BODY, TOKEN)
        .then((RESULT: boolean) => {
            return RESULT ? response(200, "tax inserted") : response(400, "request error");
        })
        .catch((err: Error) => response(400, err.message));
}

