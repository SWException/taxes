import { APIGatewayProxyHandler } from 'aws-lambda';
import API_RESPONSES from "src/handlers/apiResponse";
import { Controller } from "../core/controller"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const CONTROLLER: Controller = Controller.createController ();
    const RESULT: JSON = CONTROLLER.getTaxes();
    if(RESULT == null)
        return API_RESPONSES._400(null, "error", "problem with persistence");
    else
        return API_RESPONSES._200(RESULT, "success");
}