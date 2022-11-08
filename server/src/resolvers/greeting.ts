import { Query, Resolver } from 'type-graphql';

@Resolver()
export class GreetingResolver {
  @Query()
  Hello(): string {
    return 'hello world';
  }
}
