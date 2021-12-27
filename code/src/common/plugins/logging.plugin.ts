import { Plugin } from "@nestjs/graphql";
import { GraphQLRequestExecutionListener, GraphQLSchemaContext } from "apollo-server-plugin-base";
import { GraphQLRequestListenerDidResolveField } from "apollo-server-plugin-base";
import {
    ApolloServerPlugin,
    BaseContext,
    GraphQLFieldResolverParams,
    GraphQLRequestContext,
    GraphQLRequestContextDidEncounterErrors,
    GraphQLRequestContextDidResolveOperation,
    GraphQLRequestContextDidResolveSource,
    GraphQLRequestContextExecutionDidStart,
    GraphQLRequestContextParsingDidStart,
    GraphQLRequestContextResponseForOperation,
    GraphQLRequestContextValidationDidStart,
    GraphQLRequestContextWillSendResponse,
    GraphQLRequestListener,
    GraphQLServerListener,
    GraphQLServiceContext
} from "apollo-server-plugin-base";

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
    async serverWillStart?(
        service: GraphQLServiceContext,
    ): Promise<GraphQLServerListener | void> {
        console.log(`server will start:`);
        return {
            //不是async
            schemaDidLoadOrUpdate: (schemaContext: GraphQLSchemaContext) => {
                console.log("schemaDidLoadOrUpdate");
                // const t = schemaContext.apiSchema.getDirectives();
            },
            drainServer: async () => {
                console.log("drain server");
            },
            serverWillStop: async () => {
                console.log("server will stop");
            },
            //只有一个plugin能实现此方法
            // renderLandingPage: async () => {
            //     console.log("renderLandingPage");
            //     return { html: 'test' };
            // }
        }
    }
    async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener> {
        const { query, variables, operationName, http } = requestContext.request;
        if (operationName !== "IntrospectionQuery") {
            console.log(`Request started!`);
        }
        return {
            /**
             * The didResolveSource event is invoked 
             * after Apollo Server has determined the String-representation of 
             * the incoming operation that it will act upon. 
             * In the event that this String was not directly passed in from the client, 
             * this may be retrieved from a cache store 
             * (e.g., Automated Persisted Queries
             * At this stage, there is not a guarantee that the operation is not malformed
             */
            didResolveSource: async (requestContext: GraphQLRequestContextDidResolveSource<BaseContext>) => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`didResolveSource:${operationName}`);
            },
            /**
             * The parsingDidStart event fires 
             * whenever Apollo Server will parse a GraphQL request to create its associated document AST.
             * if hint cache,will not fire
             */
            parsingDidStart: async (requestContext: GraphQLRequestContextParsingDidStart<BaseContext>) => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`parsingDidStart:${operationName}`);
            },
            /**
             * The validationDidStart event fires 
             * whenever Apollo Server will validate a request's document AST 
             * against your GraphQL schema.
             * if hint cache,will not fire
             */
            validationDidStart: async (requestContext: GraphQLRequestContextValidationDidStart<BaseContext>) => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`validationDidStart:${operationName}`);

            },
            /**
             * The didResolveOperation event fires after the graphql library successfully determines the operation to execute from a request's document AST. 
             * At this stage, both the operationName string and operation AST are available.
             * This event is not associated with your GraphQL server's resolvers. 
             * When this event fires, your resolvers have not yet executed
             */
            didResolveOperation: async (requestContext: GraphQLRequestContextDidResolveOperation<BaseContext>) => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`didResolveOperation:${operationName}`);
            },
            didEncounterErrors: async (requestContext: GraphQLRequestContextDidEncounterErrors<BaseContext>) => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`didEncounterErrors:${operationName}`);
            },
            /**
             * The responseForOperation event is fired immediately 
             * before GraphQL execution would take place. 
             * If its return value resolves to a non-null GraphQLResponse, 
             * that result is used instead of executing the query. 
             * Hooks from different plugins are invoked in series, 
             * and the first non-null response is used.
             */
            responseForOperation: async (requestContext: GraphQLRequestContextResponseForOperation<BaseContext>) => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`responseForOperation:${operationName}`);
                return null;
            },
            /**
             * The executionDidStart event fires 
             * whenever Apollo Server begins executing the GraphQL operation specified 
             * by a request's document AST
             */
            executionDidStart: async (requestContext: GraphQLRequestContextExecutionDidStart<BaseContext>): Promise<GraphQLRequestExecutionListener | void> => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`executionDidStart:${operationName}`);
                return {
                    /**
                     * after excution with errors occur,it fired
                     */
                    executionDidEnd: async (error) => {
                        console.log(`executionDidEnd:${error}`);
                    },
                    /**
                     * The willResolveField event fires whenever Apollo Server is about to resolve a single field 
                     * during the execution of an operation.
                     * The handler is passed an object with four fields (source, args, context, and info
                     * resolver 返回结果之后运行此
                     */
                    willResolveField: (fileResolvedField: GraphQLFieldResolverParams<any, BaseContext>) => {
                        const { args, context, source, info } = fileResolvedField;
                        console.log(`willResolveField:${args},${context},${source},${info}`);
                        return (error, result) => {
                            console.log(`Field ${info.parentType.name}.${info.fieldName} resolved`);
                            if (error) {
                                console.log(`It failed with ${error}`);
                            } else {
                                console.log(`It returned ${result}`);
                            }
                        }
                    }
                }
            },
            willSendResponse: async (requestContext: GraphQLRequestContextWillSendResponse<BaseContext>) => {
                const { operationName, variables, query, http: { headers } } = requestContext.request;
                if (operationName == "IntrospectionQuery") {
                    return;
                }
                console.log(`willSendResponse:${operationName}`);

            },

        };
    }
}