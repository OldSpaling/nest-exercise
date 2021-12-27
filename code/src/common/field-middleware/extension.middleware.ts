import { MiddlewareConfigProxy } from "@nestjs/common/interfaces";
import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";

export const extensionMiddleware: FieldMiddleware =
    async (ctx: MiddlewareContext, next: NextFn) => {
        const { info } = ctx;
        //多个extension 后者会覆盖掉前者
        const { extensions } = info.parentType.getFields()[info.fieldName];
        console.log(extensions);
        return next();
    }