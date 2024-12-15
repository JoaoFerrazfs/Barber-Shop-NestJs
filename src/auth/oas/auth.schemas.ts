import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function AuthLoginDocs() {
  return applyDecorators(
    ApiBody({ schema: AuthLogin }),
    ApiResponse({ schema: AuthLoginResponse }),
    ApiUnprocessableEntityResponse(),
  );
}

const AuthLogin = {
  required: ['email', 'pasword'],
  type: 'object',
  properties: {
    email: { type: 'string', example: 'joao@gmail124.com' },
    password: { type: 'string', example: '12345678' },
  },
};

const AuthLoginResponse = {
  required: ['title', 'name', 'type', 'phone'],
  type: 'object',
  properties: {
    email: { type: 'string', example: 'joao@gmail124.com' },
    name: { type: 'string', example: 'Joao' },
    type: { type: 'string', example: 'customer' },
    phone: {
      type: 'string',
      example: '31971694273',
    },
  },
};
