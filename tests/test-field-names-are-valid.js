const {
	FieldNamesAreValid,
} = require('../src/graphql-schema-linter-rules/field-names-are-valid')
const { expectFailsRule, expectPassesRule } = require('./assertions')

describe('FieldNamesAreValid rule', () => {
	it('with incorrect input', () => {
		expectFailsRule(
			FieldNamesAreValid,
			`
      type IncorrectTestCase {
        invalid_name: String
        ThisIsInvalid: String
        core__calculate_feature: String
      }
      `,
			[
				{
					message:
						'The field `IncorrectTestCase.invalid_name` is not valid.',
					locations: [{ line: 3, column: 9 }],
				},
				{
					message:
						'The field `IncorrectTestCase.ThisIsInvalid` is not valid.',
					locations: [{ line: 4, column: 9 }],
				},
				{
					message:
						'The field `IncorrectTestCase.core__calculate_feature` is not valid.',
					locations: [{ line: 5, column: 9 }],
				},
			]
		)
	})

	it('with correct input', () => {
		expectPassesRule(
			FieldNamesAreValid,
			`
      type CorrectTestCase {
        thisIsValid: String
        core__calculateFeature: String
        terminated_at: String @deprecated(reason: "fake reason")
      }
      `
		)
	})
})
