import { expect } from 'chai';
import { ICodeValidationRule } from '@/application/Parser/Script/Validation/ICodeValidationRule';
import { ICodeValidator } from '@/application/Parser/Script/Validation/ICodeValidator';
import { Type } from '../Type';

export class CodeValidatorStub implements ICodeValidator {
  public callHistory = new Array<{
    code: string,
    rules: readonly ICodeValidationRule[],
  }>();

  public throwIfInvalid(
    code: string,
    rules: readonly ICodeValidationRule[],
  ): void {
    this.callHistory.push({
      code,
      rules: Array.from(rules),
    });
  }

  public assertHistory(expected: {
    validatedCodes: readonly string[],
    rules: readonly Type<ICodeValidationRule>[],
  }) {
    console.log('callHistory', this.callHistory);
    console.log('expected.validatedCodes.length', expected.validatedCodes.length);
    expect(this.callHistory).to.have.lengthOf(expected.validatedCodes.length);
    const actualValidatedCodes = this.callHistory.map((args) => args.code);
    console.log('actualValidatedCodes', actualValidatedCodes.sort());
    console.log('expected.validatedCodes', [...expected.validatedCodes].sort());
    expect(actualValidatedCodes.sort()).deep.equal([...expected.validatedCodes].sort());
    for (const call of this.callHistory) {
      const actualRules = call.rules.map((rule) => rule.constructor);
      expect(actualRules.sort()).to.deep.equal([...expected.rules].sort());
    }
  }
}
