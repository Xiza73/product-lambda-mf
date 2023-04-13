import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import "source-map-support/register";
import "reflect-metadata";
import { Product } from "../entities/Product";
import { dataSourceGetRepository } from "../utils/database";
import { authMiddleware } from "../utils/authMiddleware";

export const handler: APIGatewayProxyHandler = authMiddleware(
  async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    _context.callbackWaitsForEmptyEventLoop = false;

    try {
      const categoryFilter = event.queryStringParameters?.category;

      const productRepository = await dataSourceGetRepository<Product>(Product);
      let products;

      if (categoryFilter) {
        products = await productRepository.find({
          relations: ["categories"],
          where: {
            categories: {
              $elemMatch: {
                name: {
                  $regex: RegExp(categoryFilter, "i"),
                },
              },
            },
          },
        });
      } else {
        products = await productRepository.find({ relations: ["categories"] });
      }

      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      };
    }
  }
);
