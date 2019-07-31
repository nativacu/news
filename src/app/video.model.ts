export class Video {
    description: string;
    likes: number;
    tags: Array<string>;
    url: string;

    constructor(tags: Array<string>, description: string, url: string) {
        this.tags = tags;
        this.description = description;
        this.url = url;
        this.likes = 0;
    }
}
