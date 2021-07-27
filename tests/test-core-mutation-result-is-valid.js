const {
	CoreMutationResultIsValid,
} = require('../core-mutation-result-is-valid')
const { expectFailsRule, expectPassesRule } = require('./assertions')

describe('CoreMutationResultIsValid rule', () => {
	it('with incorrect input - FilterFunction', () => {
		expectFailsRule(
			CoreMutationResultIsValid,
			`
    extend type Mutation {
        core__calculateFilterFunction(input: FilterFunction__Input!): FilterFunctionResult!
    }

    input FilterFunction__Input {
        function: String!
    }

    type FilterFunctionResult {
        result: String!
    }
    `,
			[
				{
					message: `The result type of 'core__calculateFilterFunction' is invalid. It should be 'FilterFunction__Result', got FilterFunctionResult instead.`,
					locations: [{ line: 3, column: 9 }],
				},
			]
		)
	})

	it('with correct input - FilterFunction', () => {
		expectPassesRule(
			CoreMutationResultIsValid,
			`
        extend type Mutation {
          core_calculateFilterFunction(input: FilterFunction__Input!): FilterFunction__Result!
        }

        input FilterFunction__Input {
            function: String!
        }

        type FilterFunction__Result {
            result: String!
        }
        `
		)
	})
})
