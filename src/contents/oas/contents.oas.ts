import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function ApiGetContentDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all contents' }),
    ApiResponse({ status: 200, schema: GetModulesResponse }),
  );
}

export function ApiGetContentByIdDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a unique content' }),
    ApiResponse({ status: 200, schema: GetModulesResponse }),
    ApiParam(idParam),
  );
}

export function ApiCreateContentDoc() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a content' }),
    ApiBody({ schema: CreateModule }),
    ApiResponse({ status: 201, schema: CreateModuleResponse }),
    ApiUnprocessableEntityResponse(),
  );
}

export function ApiDeleteContentDoc() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam(idParam),
    ApiOperation({ summary: 'Delete a content' }),
    ApiResponse({ status: 204, description: 'Module deleted successfully' }),
    ApiResponse({ status: 404, description: 'Module not found' }),
    ApiResponse({ status: 400, description: 'Some error occurred' }),
  );
}

export function ApiUpdateDoc() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update a content' }),
    ApiParam(idParam),
    ApiResponse({ status: 201, schema: CreateModuleResponse }),
    ApiResponse({ status: 404, description: 'Module not found' }),
    ApiResponse({ status: 400, description: 'Some error occurred' }),
  );
}

const idParam = {
  name: 'id',
  type: Number,
  description: 'ID of the module to delete',
  example: 1,
};

const CreateModule = {
  required: ['title', 'imageUrl'],
  type: 'object',
  properties: {
    title: { type: 'string', example: 'Test Content' },
    imageUrl: {
      type: 'string',
      example: 'https://example.com/image.jpg',
    },
  },
};

const CreateModuleResponse = {
  required: ['data'],
  type: 'object',
  properties: {
    data: {
      type: 'object',
      required: ['id', 'title', 'imageUrl'],
      properties: {
        id: { type: 'string', example: '123' },
        title: { type: 'string', example: 'Test Content' },
        imageUrl: {
          type: 'string',
          example: 'https://example.com/image.jpg',
        },
      },
    },
  },
};

export const GetModulesResponse = {
  required: ['data'],
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        required: ['id', 'title', 'imageUrl'],
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Test Content' },
          imageUrl: {
            type: 'string',
            example: 'https://example.com/image.jpg',
          },
        },
      },
    },
  },
};
