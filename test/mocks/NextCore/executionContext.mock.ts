import { ExecutionContext } from '@nestjs/common';

export const executionContextMock = (
  requestData: object = {},
  responseData: object = {},
  nextFunction: object = {},
  handler: object = {},
  mockedClass: object = {},
): ExecutionContext => {
  return {
    switchToHttp: () => ({
      getRequest: () => requestData,
      getResponse: () => responseData,
      getNext: () => nextFunction,
    }),
    getHandler: () => handler,
    getClass: () => mockedClass,
  } as ExecutionContext;
};
