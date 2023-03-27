import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Reaction {
  @Field(() => String)
  id: string;

  @Field(() => String)
  authorId: string;

  @Field(() => String)
  postId: string;

  @Field(() => String, {
    nullable: false,
    description: 'Reaction emoji',
  })
  reactionEmoji: string;
}
