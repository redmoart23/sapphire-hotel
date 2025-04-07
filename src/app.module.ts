import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { envs } from './config/envs';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: envs.nodeEnv === 'prod' ? 'schema.gql' : 'src/schema.gql',
      playground: envs.nodeEnv !== 'prod',
    }),
    RoomsModule,
    ReservationsModule,
    UsersModule,
    SeedModule,
  ],
})
export class AppModule {}
