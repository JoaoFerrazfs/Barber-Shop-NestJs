import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { MultipleModules, SingleModule } from './content.schemas';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const Title = {
  description: 'The title of the content',
  example: 'Test Content',
};

export const ImageUrl = {
  description: 'The URL of the image',
  example: 'http://example.com/image.jpg',
};

export const CreateModule = {
  status: 201,
  description: 'Content successfully created',
  schema: {
    type: 'object',
    required: ['data'],
    properties: SingleModule,
  },
};

export const GetModule = {
  status: 200,
  description: 'Get a module',
  schema: {
    type: 'object',
    required: ['data'],
    properties: SingleModule,
  },
};

export const GetModules = {
  status: 201,
  description: 'All available modules',
  schema: {
    type: 'object',
    required: ['data'],
    properties: MultipleModules,
  },
};

export function ApiDeleteSwagguer() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a module by ID' }),
    ApiParam({
      name: 'id',
      type: Number,
      description: 'ID of the module to delete',
      example: 1,
    }),
    ApiResponse({ status: 204, description: 'Module deleted successfully' }),
    ApiResponse({ status: 404, description: 'Module not found' }),
    ApiResponse({ status: 400, description: 'Some error occurred' }),
  );
}

export function ApiUpdateSwagguer() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a module' }),
    ApiParam({
      name: 'id',
      type: Number,
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'Updated module',
      schema: {
        type: 'object',
        required: ['data'],
        properties: SingleModule,
      },
    }),
    ApiResponse({ status: 404, description: 'Module not found' }),
    ApiResponse({ status: 400, description: 'Some error occurred' }),
  );
}
