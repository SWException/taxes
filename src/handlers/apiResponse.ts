import { APIGatewayProxyResult } from "aws-lambda";
import { Response } from "node-fetch";

export class ApiResponse {
    // WORK IN PROGRESS --> RADIOATTIVO
    private readonly statusCode: number;
    private readonly message: string;
    private readonly data: JSON;

    private constructor (statusCode: number, message: string, data: JSON) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public static parse (response: Response): ApiResponse {
        response.
        if(response["statusCode"] == null)
            return null;
        else
            return new ApiResponse(
                response["statusCode"],
                response["body"]["message"],
                response["body"]["data"]
            )
    }

    public static response (statusCode: number, message?: string, data?: JSON): JSON {
        const BODY = {};
        if(message)
            BODY["message"] = message;
        if(data)
            BODY["data"] = data;
        
        return JSON.parse(JSON.stringify({
            "statusCode": statusCode,
            "body": BODY
        }));
    }

    public getStatusCode (): number {
        return this.statusCode;
    }
    
    public getMessage (): string {
        return this.message;
    }

    public getData (): JSON {
        return this.data;
    }

}
