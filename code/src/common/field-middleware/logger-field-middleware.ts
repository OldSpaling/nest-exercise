import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";

/**
 * The MiddlewareContext is an object that consist of the same arguments that are normally received 
 * by the GraphQL resolver function ({ source, args, context, info }), while NextFn is a function 
 * that let you execute the next middleware in the stack (bound to this field) or the actual field resolver.
 * @description Field middleware functions cannot inject dependencies nor access Nest's DI container
 * @description you should do it in a guard/interceptor bounded to a root query/mutation handler and assign it to context object
 * @param ctx 
 * @param next 
 */
export const loggerMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next();
    console.log("====================",value);
    return value;
}