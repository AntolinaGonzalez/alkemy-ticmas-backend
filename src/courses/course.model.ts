import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: String;

  @Prop({ required: true })
  description: String;

  @Prop([String])
  keywords: String[];

  @Prop({ required: true })
  creator_id: Number;

  @Prop()
  published_at: Date;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  delete_at: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
