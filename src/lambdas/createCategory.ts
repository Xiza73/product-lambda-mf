import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import "source-map-support/register";
import "reflect-metadata";
import { Category } from "../entities/Category";
import { dataSourceGetRepository } from "../utils/database";
import { CategorySchema } from "../schemas/category.schema";
import { authMiddleware } from "../utils/authMiddleware";

export const handler: APIGatewayProxyHandler = authMiddleware(
  async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    _context.callbackWaitsForEmptyEventLoop = false;

    try {
      const data = JSON.parse(event.body!);

      const validationResult = CategorySchema.safeParse(data);

      if (!validationResult.success) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Validation error",
            details: validationResult.error.issues,
          }),
        };
      }

      const { name, description } = data;

      const category = new Category();
      category.name = name;
      category.description = description;
      category.createdAt = new Date();
      category.updatedAt = new Date();

      const categoryRepository = await dataSourceGetRepository<Category>(
        Category
      );
      const savedCategory = await categoryRepository.save(category);

      return {
        statusCode: 201,
        body: JSON.stringify(savedCategory),
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
