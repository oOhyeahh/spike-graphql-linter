const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')

const changeCase = require('change-case')

const CoreMutationInputIsValid = (context) => {
	return {
		InputValueDefinition(node, key, parent, path, ancestors) {
			const inputValueName = node.name.value

			const parentName = ancestors[ancestors.length - 1].name.value
			if (inputValueName == 'input' && parentName.startsWith('core__')) {
				// The mutation name normally comes like core__calculateFeature.
				// To get the name of the feature it requires to remove the prefix.
				const featureName = parentName.replace('core__calculate', '')

				const expectedName =
					changeCase.pascalCase(featureName) + '__Input'
				const typeName = node.type.type.name.value
				if (typeName != expectedName) {
					context.reportError(
						new ValidationError(
							'core-mutation-input-is-valid',
							`The input field \`${parentName}.${inputValueName}\` should be named ${expectedName}, got ${typeName} instead.`,
							[node]
						)
					)
				}
			}
		},
	}
}

module.exports = { CoreMutationInputIsValid }
