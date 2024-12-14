import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function ApiCreateUserDocs() {
  return applyDecorators(
    ApiBody({ schema: CreateUser }),
    ApiResponse({ schema: CreateUserResponse }),
    ApiUnprocessableEntityResponse(),
  );
}

const CreateUser = {
  required: ['id', 'title', 'imageUrl'],
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
  required: ['id', 'title', 'imageUrl'],
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
