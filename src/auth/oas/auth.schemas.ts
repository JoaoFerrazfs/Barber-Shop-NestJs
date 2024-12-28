import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function AuthLoginDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Process user login' }),
    ApiBody({ schema: AuthLogin }),
    ApiResponse({ schema: AuthLoginResponse }),
    ApiUnprocessableEntityResponse(),
  );
}

const AuthLogin = {
  required: ['email', 'pasword'],
  type: 'object',
  properties: {
    access_token: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiSm9hbyIsImVtYWlsIjoiam9hb0BnbWFpbC5jb20iLCJ0eXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE3MzU0MDY3NTQsImV4cCI6MTczNTQwNzI1NH0.7zxeq0PJ4RSLEf1mObepyYGx7fhKhXLf8oG4Daj1gvs',
    },
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
