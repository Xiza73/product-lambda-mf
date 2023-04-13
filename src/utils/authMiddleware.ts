import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const authMiddleware = (
  handler: APIGatewayProxyHandler
): APIGatewayProxyHandler => {
  return async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    const token = event.headers["connection-token"];;

    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      (event as any).user = decoded;
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    return handler(event, _context, () => {})!;
  };
};
