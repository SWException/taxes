import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { ApiResponse } from "src/handlers/apiResponse";
import { Controller } from "../core/controller"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const TOKEN = event.headers?.Authorization;
    if (TOKEN == null) {
        return ApiResponse.response(400, "missing token");
    }
    
    await fetch(`https://95kq9eggu9.execute-api.eu-central-1.amazonaws.com/dev/users/check/${TOKEN}`)
        .then(response => {
            const RESPONSE = ApiResponse.parse(response);
            if(RESPONSE.getStatusCode() == 200) {
                
            }
            else
                return ApiResponse.response(400, "user not valid");
        })
        .catch(error => {
            //return API_RESPONSES._400(error, "error", "problem with users microservice");
            return ApiResponse.response(400, "problem with users microservice", error);
        })

}