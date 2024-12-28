import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function ApiGetSchedulesDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all schedules' }),
    ApiResponse({ status: 200, schema: GetSchedulesResponse }),
  );
}

export function ApiGetAvailableSchedulesDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all available schedules' }),
    ApiResponse({ status: 200, schema: CreateAvailableSchedulesResponse }),
  );
}

export function ApiCreateScheduleDoc() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a schedule' }),
    ApiBody({ schema: GetCreateSchedule }),
    ApiResponse({ status: 201, schema: CreateSchedulesResponse }),
    ApiUnprocessableEntityResponse({
      description: 'Validation errors for scheduling',
      examples: {
        outsideWorkHours: {
          summary: 'Fora do horário de trabalho',
          value: { message: 'Fora do horário de trabalho' },
        },
        weekend: {
          summary: 'Fim de semana',
          value: { message: 'Fim de semana tô de folga' },
        },
        unavailable: {
          summary: 'Horário indisponível',
          value: { message: 'Horário não disponível' },
        },
      },
    }),
  );
}

const GetCreateSchedule = {
  type: 'object',
  required: ['type', 'startTime', 'endTime'],
  properties: {
    type: { type: 'string', example: 'Test Content' },
    startTime: {
      type: 'string',
      example: '2024-12-09T17:00:00.000Z',
    },
    endTime: {
      type: 'string',
      example: '2024-12-09T17:30:00.000Z',
    },
  },
};

const CreateSchedulesResponse = {
  required: ['data'],
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        type: { type: 'string', example: 'SIMPLE_SERVICE' },
        startTime: {
          type: 'string',
          example: '2024-12-09T17:00:00.000Z',
        },
        endTime: {
          type: 'string',
          example: '2024-12-09T17:30:00.000Z',
        },
        createdAt: {
          type: 'string',
          example: '2024-12-15T14:53:35.451Z',
        },
        updatedAt: {
          type: 'string',
          example: '2024-12-15T14:53:35.451Z',
        },
      },
    },
  },
};

const GetSchedulesResponse = {
  required: ['data'],
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        required: [
          'id',
          'type',
          'startTime',
          'endTime',
          'createdAt',
          'updatedAt',
        ],
        properties: {
          id: { type: 'integer', example: 1 },
          type: { type: 'string', example: 'SIMPLE_SERVICE' },
          startTime: {
            type: 'string',
            example: '2024-12-09T17:00:00.000Z',
          },
          endTime: {
            type: 'string',
            example: '2024-12-09T17:30:00.000Z',
          },
          createdAt: {
            type: 'string',
            example: '2024-12-15T14:53:35.451Z',
          },
          updatedAt: {
            type: 'string',
            example: '2024-12-15T14:53:35.451Z',
          },
        },
      },
    },
  },
};

const CreateAvailableSchedulesResponse = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'array',
      items: {
        required: ['day', 'start', 'end'],
        properties: {
          day: { type: 'string', example: '2024-12-15' },
          start: {
            type: 'string',
            example: '2024-12-15T08:00:00.000Z',
          },
          end: {
            type: 'string',
            example: '2024-12-15T12:00:00.000Z',
          },
        },
      },
    },
  },
};
