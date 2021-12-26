import { Module } from "@nestjs/common";
import { GraphQLGatewayModule } from "@nestjs/graphql";

@Module({
    imports: [GraphQLGatewayModule.forRoot({
        server: {
            cors: true
        },
        gateway: {
            serviceList: [
                { name: "users", url: "" },
                { name: "posts", url: "" }
            ]
        }
    })]
})
export class MyGraphQLGatewayModule {

}