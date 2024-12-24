import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function ApiCreateUserDocs() {
  return applyDecorators(
    ApiBody({ schema: CreateUser }),
    ApiOperation({ summary: 'Create a new a user' }),
    ApiResponse({ schema: CreateUserResponse }),
    ApiUnprocessableEntityResponse(),
  );
}

const CreateUser = {
  required: ['email', 'password', 'name', 'phone'],
  type: 'object',
  properties: {
    email: { type: 'string', example: 'joao@gmail124.com' },
    password: { type: 'string', example: '12345678' },
    name: { type: 'string', example: 'Joao' },
    phone: {
      type: 'string',
      example: '31971694273',
    },
  },
};

const CreateUserResponse = {
  required: ['email', 'name', 'phone'],
  type: 'object',
  properties: {
    email: { type: 'string', example: 'joao@gmail124.com' },
    name: { type: 'string', example: 'Joao' },
    phone: {
      type: 'string',
      example: '31971694273',
    },
  },
};
