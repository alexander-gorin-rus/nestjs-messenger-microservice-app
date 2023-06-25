import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../libs/shared/src/entities/user.entity';
import { PostgresDBModule } from '@app/shared/postgres.module';
import { SharedModule, SharedService } from '@app/shared';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './jwt-guard/jwt.guard';
import { JwtStrategy } from './jwt-guard/jwt-strategy';
import { UserRepository } from '@app/shared/repositories/user.repository';
import { SharedServicesInterfaces } from '@app/shared/interfaces/interfaces.names';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    JwtGuard,
    JwtStrategy,
    {
      provide: SharedServicesInterfaces.AUTH_SERVICE_INTERFACE,
      useClass: AuthService,
    },
    {
      provide: SharedServicesInterfaces.USER_REPOSITORY_INTERFACE,
      useClass: UserRepository,
    },
    {
      provide: SharedServicesInterfaces.SHARED_SERVICE_INTERFACE,
      useClass: SharedService,
    },
  ],
})
export class AuthModule {}
