import { User } from "./user";

export class Comment{
    workshop: string;
    user: User;
    date: Date;
    numberOfLikes: number;
    likes: Array<string>;
    text: string;
}
