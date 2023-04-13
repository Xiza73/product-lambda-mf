declare module "typeorm" {
  export function Entity(): ClassDecorator;
  export function ObjectIdColumn(): PropertyDecorator;
  export function Column(): PropertyDecorator;
}
