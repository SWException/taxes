import { APIGatewayProxyHandler } from 'aws-lambda';
import response from 'src/utils/apiResponse';
import Model from "src/core/model"

export const HANDLER: APIGatewayProxyHandler = async (event) => {
    const MODEL: Model = Model.createModel();

    const SEARCH: string = event.queryStringParameters?.search;

    return await MODEL.getTaxes(SEARCH)
        .then((result) => result ? response(200, "success", result) :
            response(400, "problem with persistence"))
        .catch((err: Error) => response(400, err.message));
}