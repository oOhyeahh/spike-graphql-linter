const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')
const changeCase = require('change-case')

const CoreMutationResultIsValid = (context) => {
	return {
		FieldDefinition(node, key, parent, path, ancestors) {
			const parentName = ancestors[ancestors.length - 1].name.value

			const nodeName = node.name.value
			// only check if the parent is Mutation type
			if (parentName === 'Mutation' && nodeName.startsWith('core__')) {
				const resultTypeName = node.type.type.name.value

				// The mutation name normally comes like core__calculateFeature.
				// To get the name of the feature it requires to remove the prefix.
				const featureName = nodeName.replace('core__calculate', '')
				const expectName =
					changeCase.pascalCase(featureName) + '__Result'

				if (resultTypeName !== expectName) {
					context.reportError(
						new ValidationError(
							'core-mutation-result-is-valid',
							`The result type of \'${nodeName}\' is invalid. It should be \'${expectName}', got ${resultTypeName} instead.`,
							[node]
						)
					)
				}
			}
		},
	}
}

module.exports = { CoreMutationResultIsValid }
