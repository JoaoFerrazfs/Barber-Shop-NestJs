import { response } from 'express';
import { ContentCreateDTO } from '../dto/content.create.dto';

export const title = {
  description: 'The title of the content',
  example: 'Test Content',
};

export const imageUrl = {
  description: 'The URL of the image',
  example: 'http://example.com/image.jpg',
};

export const createResponse = {
  status: 201,
  description: 'Content successfully created',
  type: ContentCreateDTO,
  schema: {
    example: {
      id: 1,
      imageUrl: 'http://example.com/image.jpg',
      title: 'Test Content',
    },
  },
};
