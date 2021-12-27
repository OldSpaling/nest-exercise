import { Post } from "../models/post.model";

export class PostService {
    async findAll(args: { authorId: number }) {
        return this.posts.filter(o => o.votes == args.authorId);
    }
    get posts() {
        const posts: Post[] = [];
        for (let i = 0; i < 500; i++) {
            posts.push(<Post>{
                id: i,
                votes: i % 100,
                title: `title${i}`
            }
            );
        }
        return posts;
    }
    async update(model: Post) {
        const post = this.posts.find(o => o.id == model.id);
        Object.assign(post, model);
        return post;
    }
}