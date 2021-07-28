const {
	MutationInputIsValid,
} = require('../src/graphql-schema-linter-rules/mutation-input-is-valid')
const { expectFailsRule, expectPassesRule } = require('./assertions')

describe('MutationInputIsValid rule', () => {
	it('with incorrect input', () => {
		expectFailsRule(
			MutationInputIsValid,
			`
    extend type Mutation {
        createPaymentMethod(paymentMethod: String!): String!
    }
    `,
			[
				{
					message: `The input argument 'Mutation.createPaymentMethod' is invalid. It should have a single input argument named 'input'`,
					locations: [{ line: 3, column: 9 }],
				},
			]
		)
	})

	it('with correct input', () => {
		expectPassesRule(
			MutationInputIsValid,
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
