const {
	NonCoreMutationInputIsValid,
} = require('../graphql-schema-linter-rules/non-core-mutation-input-is-valid')
const { expectFailsRule, expectPassesRule } = require('./assertions')

describe('NonCoreMutationInputIsValid rule', () => {
	it('with incorrect input', () => {
		expectFailsRule(
			NonCoreMutationInputIsValid,
			`
    extend type Mutation {
        createPaymentMethod(input: BadInputPaymentMethod!): String!
    }
    input BadInputPaymentMethod {
      result : String!
  }
    `,
			[
				{
					message:
						'The input field `createPaymentMethod.input` should be named CreatePaymentMethodInput, got BadInputPaymentMethod instead.',
					locations: [{ line: 3, column: 29 }],
				},
			]
		)
	})

	it('with correct input', () => {
		expectPassesRule(
			NonCoreMutationInputIsValid,
			`
        extend type Mutation {
          createPaymentMethod(input: CreatePaymentMethodInput!): String!
        }

        input CreatePaymentMethodInput {
            result : String!
        }
        `
		)
	})
})
