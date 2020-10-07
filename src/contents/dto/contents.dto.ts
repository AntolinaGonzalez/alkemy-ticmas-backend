export class CreateContentsDto {
    readonly title: string;
    readonly description: string;
    readonly media: [{
        title: string,
        description: string,
        url: string
    }];
    seccion_id: string;
    readonly published_at: Date;
    readonly created_at: Date;
    readonly updated_at: Date;
    readonly deleted_at: Date;
}