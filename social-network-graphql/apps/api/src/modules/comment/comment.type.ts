import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(() => String)
  id: string;

  @Field(() => String)
  authorId: string;

  @Field(() => String)
  postId: string;

  @Field(() => String, {
    nullable: false,
    description: 'Comment content',
  })
  content: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
