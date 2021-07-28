const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')

const MutationInputIsValid = (context) => {
	return {
		FieldDefinition(node, key, parent, path, ancestors) {
			const parentName = ancestors[ancestors.length - 1].name.value

			// only check if the parent is Mutation type
			if (parentName === 'Mutation') {
				if (
					node.arguments.length !== 1 ||
					node.arguments[0].name.value !== 'input'
				) {
					const inputValueName = node.name.value
					context.reportError(
						new ValidationError(
							(ruleName = 'mutation-input-is-valid'),
							`The input argument \'${parentName}.${inputValueName}\' is invalid. It should have a single input argument named 'input'`,
							[node]
						)
					)
				}
			}
		},
	}
}

module.exports = { MutationInputIsValid }
