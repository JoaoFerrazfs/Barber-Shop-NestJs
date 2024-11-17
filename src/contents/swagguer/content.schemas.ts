export const SingleModule = {
  data: {
    required: ['id', 'title', 'imageUrl'],
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      title: { type: 'string', example: 'Test Content' },
      imageUrl: {
        type: 'string',
        example: 'http://example.com/image.jpg',
      },
    },
  },
};

export const MultipleModules = {
  data: {
    type: 'array',
    items: SingleModule,
  },
};
