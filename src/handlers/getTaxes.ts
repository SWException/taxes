import { APIGatewayProxyHandler } from 'aws-lambda';
import API_RESPONSES from "src/handlers/apiResponses";

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    // TO-DO
    return API_RESPONSES._200(null, "success");
}