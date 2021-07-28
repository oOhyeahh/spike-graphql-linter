const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')
const changeCase = require('change-case')
const pascalCase = changeCase.pascalCase

const NonCoreMutationResultIsValid = (context) => {
	return {
		FieldDefinition(node, key, parent, path, ancestors) {
			const parentName = ancestors[ancestors.length - 1].name.value

			const nodeName = node.name.value
			// only check if the parent is Mutation type
			if (parentName === 'Mutation' && !nodeName.startsWith('core__')) {
				const resultTypeName = node.type.type.name.value

				if (
					resultTypeName !==
					changeCase.pascalCase(nodeName) + 'Result'
				) {
					context.reportError(
						new ValidationError(
							'non-core-mutation-result-is-valid',
							`The result type of \'${nodeName}\' is invalid. It should be \'${pascalCase(
								nodeName
							)}\Result', got ${resultTypeName} instead.`,
							[node]
						)
					)
				}
			}
		},
	}
}

module.exports = { NonCoreMutationResultIsValid }
