import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from './roles.decorator';
import { Roles } from '../enums/role.enum';

describe('Role Decorator', () => {
  it('should set metadata with the given roles', () => {
    // Set
    const roles = ['admin'];
    class TestClass {
      @Role(Roles.ADMIN)
      testMethod() {}
    }
    const reflector = new Reflector();

    // Actions
    const metadata = reflector.get(ROLES_KEY, TestClass.prototype.testMethod);

    // Assertions
    expect(metadata).toEqual(roles);
  });
});
