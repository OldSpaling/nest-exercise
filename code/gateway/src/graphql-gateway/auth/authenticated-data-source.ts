import { RemoteGraphQLDataSource } from "@apollo/gateway";

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    async willSendRequest({ request, context }) {
        const { authToken } = context;
        request.http.headers.set("auth", authToken);
    }
}