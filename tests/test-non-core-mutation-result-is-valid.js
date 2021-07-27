const {
	NonCoreMutationResultIsValid,
} = require('../non-core-mutation-result-is-valid')
const { expectFailsRule, expectPassesRule } = require('./assertions')

describe('NonCoreMutationResultIsValid rule', () => {
	it('with incorrect input', () => {
		expectFailsRule(
			NonCoreMutationResultIsValid,
			`
    extend type Mutation {
        createPaymentMethod(input: CreatePaymentMethodInput!): String!
    }

    input CreatePaymentMethodInput {
        method : String!
    }
    `,
			[
				{
					message: `The result type of 'createPaymentMethod' is invalid. It should be 'CreatePaymentMethodResult', got String instead.`,
					locations: [{ line: 3, column: 9 }],
				},
			]
		)
	})

	it('with correct input', () => {
		expectPassesRule(
			NonCoreMutationResultIsValid,
			`
        extend type Mutation {
          createPaymentMethod(input: CreatePaymentMethodInput!): CreatePaymentMethodResult!
        }

        input CreatePaymentMethodInput {
            method : String!
        }

        type CreatePaymentMethodResult {
            result: String!
        }
        `
		)
	})
})
