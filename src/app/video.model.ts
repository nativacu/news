export class Video {
    tags: Array<string>;
    description: string;
    url: string;

    constructor(tags: Array<string>, description: string, url: string) {
        this.tags = tags;
        this.description = description;
        this.url = url;
    }
}
