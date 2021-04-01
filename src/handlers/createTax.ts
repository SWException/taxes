import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import response from "src/handlers/apiResponse";
import { Model } from "../core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN = event.headers?.Authorization;
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

async function checkVendor (token: string): Promise<boolean> {
    return await fetch(process.env.SERVICES + `/dev/users/vendors/check/${token}`)
        .then(async responseUser => {
            return responseUser.status == 200;
        })
        .catch(error => {
            return false;
        })
}