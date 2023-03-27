import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field(() => String, {
    nullable: false,
    description: 'Username',
  })
  username: string;

  @Field(() => String, {
    nullable: false,
    description: 'Password',
  })
  password: string;
}

@InputType()
export class LoginUser {
  @Field(() => String, {
    nullable: false,
    description: 'Username',
  })
  username: string;

  @Field(() => String, {
    nullable: false,
    description: 'Password',
  })
  password: string;
}
