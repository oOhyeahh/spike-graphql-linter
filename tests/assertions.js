/**
 * The set up for testing the custom linter rules.
 * This set up comes from https://github.com/cjoudrey/graphql-schema-linter/blob/master/test/assertions.js
 */
const assert = require('assert')
const { Schema } = require('graphql-schema-linter/lib/schema')
const { Configuration } = require('graphql-schema-linter/lib/configuration')
const {
	validateSchemaDefinition,
} = require('graphql-schema-linter/lib/validator')

const DefaultSchema = `
  type Query {
    someQuery: String
  }

  type Mutation {
    createMethod(input: CreateMethodInput!): CreateMethodResult!
  }

  input CreateMethodInput {
    result : String!
  }

  type CreateMethodResult  {
    result: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const expectFailsRule = (rule, schemaSDL, expectedErrors = []) => {
	return expectFailsRuleWithConfiguration(rule, schemaSDL, {}, expectedErrors)
}

const expectFailsRuleWithConfiguration = (
	rule,
	schemaSDL,
	configurationOptions,
	expectedErrors = []
) => {
	const errors = validateSchemaWithRule(rule, schemaSDL, configurationOptions)
	assert(errors.length > 0, "Expected rule to fail but didn't")
	assert.deepEqual(
		errors,
		expectedErrors.map((expectedError) => {
			return Object.assign(expectedError, {
				ruleName: rule.name
					.replace(/([A-Z])/g, '-$1')
					.toLowerCase()
					.replace(/^-/, ''),
			})
		})
	)
}

const expectPassesRule = (rule, schemaSDL) => {
	expectPassesRuleWithConfiguration(rule, schemaSDL, {})
}

const expectPassesRuleWithConfiguration = (
	rule,
	schemaSDL,
	configurationOptions
) => {
	const errors = validateSchemaWithRule(rule, schemaSDL, configurationOptions)

	assert(
		errors.length == 0,
		`Expected rule to pass but didn't got these errors:\n\n${errors.join(
			'\n'
		)}`
	)
}

function validateSchemaWithRule(rule, schemaSDL, configurationOptions) {
	const rules = [rule]
	const schema = new Schema(`${schemaSDL}${DefaultSchema}`, null)
	const configuration = new Configuration(schema, configurationOptions)
	const errors = validateSchemaDefinition(schema, rules, configuration)

	return errors
}

module.exports = {
	expectFailsRule,
	expectFailsRuleWithConfiguration,
	expectPassesRule,
	expectPassesRuleWithConfiguration,
}
