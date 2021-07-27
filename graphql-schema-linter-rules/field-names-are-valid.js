const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')

const camelCaseTest = RegExp('^[a-z][a-zA-Z0-9]*$')

/**
 * raise validation error.
 */
const raiseValidationError = (ancestors, context, fieldName, node) => {
	const parentName = ancestors[ancestors.length - 1].name.value
	context.reportError(
		new ValidationError(
			'field-names-are-valid',
			`The field \`${parentName}.${fieldName}\` is not valid.`,
			[node]
		)
	)
}

/**
 * check if the field is deprecated.
 * @param {Definition} node
 */
const isDeprecated = (node) => {
	if (node.directives.length > 0) {
		return node.directives[0].name.value === 'deprecated'
	}

	return false
}

const FieldNamesAreValid = (context) => {
	return {
		FieldDefinition(node, key, parent, path, ancestors) {
			const fieldName = node.name.value
			if (fieldName.startsWith('core__')) {
				// The mutation name normally comes like core__calculateFeature.
				// To get the name of the feature it requires to remove the prefix.
				const featureName = fieldName.replace('core__', '')
				if (!camelCaseTest.test(featureName) && !isDeprecated(node)) {
					raiseValidationError(ancestors, context, fieldName, node)
				}
			} else if (!camelCaseTest.test(fieldName) && !isDeprecated(node)) {
				raiseValidationError(ancestors, context, fieldName, node)
			}
		},
	}
}

module.exports = { FieldNamesAreValid }
