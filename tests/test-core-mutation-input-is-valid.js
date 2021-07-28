const {
	CoreMutationInputIsValid,
} = require('../src/graphql-schema-linter-rules/core-mutation-input-is-valid')
const { expectFailsRule, expectPassesRule } = require('./assertions')

describe('CoreMutationInputIsValid rule', () => {
	it('with incorrect input - FilterFunction', () => {
		expectFailsRule(
			CoreMutationInputIsValid,
			`
    extend type Mutation {
        core__calculateFilterFunction(input: CalculateFilterFunctionInput!): FilterFunctionResult!
    }

    input CalculateFilterFunctionInput {
        function: String!
    }

    type FilterFunctionResult {
        result: String!
    }
    `,
			[
				{
					message:
						'The input field `core__calculateFilterFunction.input` should be named FilterFunction__Input, got CalculateFilterFunctionInput instead.',
					locations: [{ line: 3, column: 39 }],
				},
			]
		)
	})

	it('with correct input - FilterFunction', () => {
		expectPassesRule(
			CoreMutationInputIsValid,
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
        `
		)
	})
})
