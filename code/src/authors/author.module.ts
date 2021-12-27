import { Module } from "@nestjs/common";
import { AuthorsResolver } from "./resolvers/authors.resolver";
import { AuthorService } from "./services/author.service";
import { PostService } from "./services/post.service";

@Module({
    providers: [
        PostService,
        AuthorService,
        AuthorsResolver
    ]
})
export class AuthorModule{
    
}