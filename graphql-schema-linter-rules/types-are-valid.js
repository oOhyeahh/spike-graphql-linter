const { GenericTypeRegexCheck } = require('./generic-regex-check')
const typeNameRegex = RegExp(
	'^[A-Z](([a-zA-Z0-9]+)(_{2})([A-Z][a-zA-Z0-9]+)|([a-zA-Z0-9]+))'
)

const TypesAreValid = (context) => {
	return GenericTypeRegexCheck(
		context,
		typeNameRegex,
		'qctrl-type-incorrectly-named',
		'incorrectly named'
	)
}

module.exports = { TypesAreValid, typeNameRegex }
