import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import "source-map-support/register";
import "reflect-metadata";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";
import { dataSourceGetRepository } from "../utils/database";
import { ObjectId } from "mongodb";
import { ProductSchema } from "../schemas/product.schema";
import { authMiddleware } from "../utils/authMiddleware";

export const handler: APIGatewayProxyHandler = authMiddleware(
  async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    _context.callbackWaitsForEmptyEventLoop = false;

    try {
      const data = JSON.parse(event.body!);

      const validationResult = ProductSchema.safeParse(data);

      if (!validationResult.success) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Validation error",
            details: validationResult.error.issues,
          }),
        };
      }

      const { name, description, price, categories, imageUrl } = data;

      const product = new Product();
      product.name = name;
      product.description = description;
      product.price = price;
      product.imageUrl = imageUrl;
      product.createdAt = new Date();
      product.updatedAt = new Date();

      const categoriesObjectIds = categories.map(
        (categoryId: string) => new ObjectId(categoryId)
      );

      const categoryRepository = await dataSourceGetRepository<Category>(
        Category
      );
      const existingCategories = await categoryRepository.find({
        where: {
          _id: {
            $in: categoriesObjectIds,
          },
        },
      });
      product.categories = existingCategories;

      const productRepository = await dataSourceGetRepository(Product);
      const savedProduct = await productRepository.save(product);

      return {
        statusCode: 201,
        body: JSON.stringify(savedProduct),
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
