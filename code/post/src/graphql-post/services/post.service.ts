import { Injectable } from "@nestjs/common";
import { Post } from "../entities/post.model";
import { User } from "../entities/user.model";

@Injectable()
export class PostService {
    private readonly data: Post[] = [];
    constructor() {
        for (let i = 0; i < 100; i++) {
            this.data.push(Object.assign(new Post, <Post>{
                id: i,
                title: `title${i}`,
                authorId: i % 10,
                author: Object.assign(new User, <User>{
                    id: i % 10,
                    test:`test${i}`
                    // name: `name${i}`,
                })
            }))
        }
    }
    forAuthor(authorId: number) {
        return this.data.filter(o => o.authorId == authorId);
    }
    findOne(id: number) {
        return this.data.find(o => o.id == id);
    }
    all() {
        return this.data;
    }

}