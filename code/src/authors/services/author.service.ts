import { Injectable } from "@nestjs/common";
import { Author } from "../models/author.model";

@Injectable()
export class AuthorService {
    async findOneById(id: number) {
        return this.Authors.find(o => o.id == id);
    }
    get Authors() {
        const authors: Author[] = [];
        for (let i = 0; i < 100; i++) {
            authors.push(<Author>{
                id: i,
                lastName: `lastName${i}`,
                firstName: `firstName${i}`,
                birthTime: new Date(),
                people:{id:i,name:`people name ${i}`}
                // posts: [{
                //     id: i,
                //     votes: i,
                //     title: `title${i}`
                // }, {
                //     id: i + 1,
                //     votes: i + 1,
                //     title: `title${i + 1}`
                // }
                // ]
            });
        }
        return authors;
    }
}