import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';
import { Seed } from './entities/seed.entity';

@Resolver(() => Seed)
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean)
  async executeSeed(): Promise<boolean> {
    return this.seedService.executeSeed();
  }
}
