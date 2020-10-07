export class CreateSeccionsDto {
    readonly title: string;
    readonly description: string;
    readonly content: string;
    creator_id: string;
    readonly published_at: Date;
    readonly created_at: Date;
    readonly updated_at: Date; 
    readonly delete_at: Date;
 }