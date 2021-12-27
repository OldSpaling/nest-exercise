import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";

/**
 * @default global field middleware 的声明周期包含绑定字段的FieldMiddleware，即global的next 包含绑定字段的fieldmiddleware
 * @param ctx 
 * @param next 
 */
export const globalLoggerFieldMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next();
    console.log("global field middleware==========", value);
    return value;
}