import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '../comment/comment.type';
import { Reaction } from '../reaction/reaction.type';

@ObjectType()
export class Post {
  @Field(() => String)
  id: string;

  @Field(() => String)
  authorId: string;

  @Field(() => String, {
    nullable: false,
    description: 'Post content',
  })
  content: string;

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => [Reaction])
  reactions: Reaction[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
