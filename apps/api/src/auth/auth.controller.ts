import {
  Controller,
  Post,
  Body,
  Logger,
  Req,
  UseGuards,
  Get,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserRequestDto, RegistrationRequestDto } from './auth.types';
import { AuthService } from './auth.service';
import { Public } from './guards/public.decorator';
import { UserService } from 'src/user/user.service';
import { RequestWithUser } from 'src/core/http.interface';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-token-auth.guard';
import { User } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('register')
  async registerUser(
    @Req() req,
    @Body() userData: RegistrationRequestDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    try {
      const userExists = await this.userService.getUserByEmail(userData.email);
      if (userExists) {
        throw new ConflictException(
          'Пользователь с таким именем уже существует.',
        );
      }

      const newUser = await this.authService.registerUser(userData);
      const refreshToken = this.authService.generateRefreshToken(newUser);
      const accessToken = this.authService.generateAccessToken(newUser);

      await this.authService.saveRefreshToken(newUser, refreshToken);
      this.authService.setTokenCookies(req.res, { accessToken, refreshToken });

      return newUser;
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }

  @Post('login')
  async loginUser(@Req() req, @Body() userData: LoginUserRequestDto) {
    try {
      const existingUser = await this.userService.getUserByEmail(
        userData.email,
      );
      if (!existingUser) {
        throw new NotFoundException('Пользователь с таким именем не найден.');
      }
      await this.authService.validateUser(userData);
      const refreshToken = this.authService.generateRefreshToken(existingUser);
      const accessToken = this.authService.generateAccessToken(existingUser);

      await this.authService.saveRefreshToken(existingUser, refreshToken);

      this.authService.setTokenCookies(req.res, { accessToken, refreshToken });
      return { token: accessToken };
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Get('refresh')
  public refreshToken(@Req() req: RequestWithUser) {
    const { user } = req;
    const accessToken = this.authService.generateAccessToken(user);
    this.authService.setAccessTokenCookie(req.res, accessToken);
    return user;
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post('logout')
  async logoutUser(@Req() req: RequestWithUser) {
    await this.authService.logoutUser(req.user, req.res);
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Get('me')
  async getUserInfo(@Req() req: RequestWithUser) {
    return {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
  }
}
