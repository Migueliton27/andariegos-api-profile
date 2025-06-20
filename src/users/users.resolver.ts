import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Public } from 'src/common/decorators/public.decorator';
import { UserWrapper } from './dto/user-wrapper.dto';
import { CreateProfileInput } from './dto/create-profile.input';

@Public()
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async registerUser(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<User> {
    return this.usersService.registerUser(createProfileInput);
  }

  @Query(() => User, { name: 'findUser', nullable: true })
  async findUser(
    @Args('identifier') identifier: string,
  ): Promise<User | null> {
    return this.usersService.findOneByUsernameOrEmail(identifier);
  }

  @Query(() => [UserWrapper], { name: 'findUsersByIds' })
  findUsersByIds(
    @Args('userIds', { type: () => [String] }) userIds: string[],
  ): Promise<UserWrapper[]> {
    return this.usersService.findUsersByIds(userIds);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.usersService.update(id, updateUserInput);
  }
  
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
