import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
