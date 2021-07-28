const {
	ValidationError,
} = require('graphql-schema-linter/lib/validation_error')

const GenericFieldRegexCheck = (context, regex, label, errorMessage) => {
	return {
		FieldDefinition(node, key, parent, path, ancestors) {
			const name = node.name.value
			const match = regex.exec(name)
			if (!match || match[0] != name) {
				const parentName = ancestors[ancestors.length - 1].name.value
				context.reportError(
					new ValidationError(
						label,
						`The field \`${parentName}.${name}\` is ${errorMessage}.`,
						[node]
					)
				)
			}
		},
	}
}

const regexTypeCheck = (context, node, regex, label, errorMessage) => {
	const name = node.name.value
	const match = regex.exec(name)
	if (!match || match[0] != name) {
		context.reportError(
			new ValidationError(
				label,
				`The type \`${name}\` is ${errorMessage}.`,
				[node]
			)
		)
	}
}

const GenericTypeRegexCheck = (context, regex, label, errorMessage) => {
	return {
		ObjectTypeDefinition(node) {
			regexTypeCheck(context, node, regex, label, errorMessage)
		},
		InterfaceTypeDefinition(node) {
			regexTypeCheck(context, node, regex, label, errorMessage)
		},
		InputObjectTypeDefinition(node) {
			regexTypeCheck(context, node, regex, label, errorMessage)
		},
	}
}

module.exports = {
	GenericFieldRegexCheck,
	GenericTypeRegexCheck,
	regexTypeCheck,
}
