const {
	typeNameRegex,
} = require('../graphql-schema-linter-rules/types-are-valid')

const {
	regexTypeCheck,
} = require('../graphql-schema-linter-rules/generic-regex-check')

const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')

const chai = require('chai')
const expect = chai.expect

const mockContext = {
	reportError: (err) => {
		throw err
	},
}

describe('TypesAreValid rule', () => {
	context('with badly named object types', () => {
		const badNames = [
			'notReallyCapitalized',
			'FunName01_',
			'01Name',
			'JustOne_Underscore',
			'Namespace__butNoCapital',
			'Namespace___TooMuch',
		]

		for (const name of badNames) {
			it(`should throw error for ${name}`, () => {
				const node = { name: { value: name } }
				expect(() => {
					regexTypeCheck(
						mockContext,
						node,
						typeNameRegex,
						'qctrl-type-incorrectly-named',
						'incorrectly named'
					)
				}).to.throw(ValidationError, 'incorrectly named')
			})
		}
	})
	context('with correctly named object types', () => {
		const goodNames = ['SimpleName', 'Namespaced__Well', 'Good']

		for (const name of goodNames) {
			it(`should pass validation for ${name}`, () => {
				const node = { name: { value: name } }
				expect(() => {
					regexTypeCheck(
						mockContext,
						node,
						typeNameRegex,
						'qctrl-type-incorrectly-named',
						'incorrectly named'
					)
				}).not.to.throw(ValidationError, 'incorrectly named')
			})
		}
	})
})
