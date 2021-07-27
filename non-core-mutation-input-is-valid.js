const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')

const changeCase = require('change-case')

const NonCoreMutationInputIsValid = (context) => {
	return {
		InputValueDefinition(node, key, parent, path, ancestors) {
			const inputValueName = node.name.value

			const parentName = ancestors[ancestors.length - 1].name.value
			if (inputValueName == 'input' && !parentName.startsWith('core__')) {
				const expectedName = changeCase.pascalCase(parentName + 'Input')
				const typeName = node.type.type.name.value
				if (typeName != expectedName) {
					context.reportError(
						new ValidationError(
							'non-core-mutation-input-is-valid',
							`The input field \`${parentName}.${inputValueName}\` should be named ${expectedName}, got ${typeName} instead.`,
							[node]
						)
					)
				}
			}
		},
	}
}

module.exports = { NonCoreMutationInputIsValid }
