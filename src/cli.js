#!/usr/bin/env node
'use strict'

var _runner = require('./runner')

function handleUncaughtException(err) {
	console.error(
		'It looks like you may have hit a bug in graphql-schema-linter.'
	)
	console.error('')
	console.error(
		'It would be super helpful if you could report this here: https://github.com/cjoudrey/graphql-schema-linter/issues/new'
	)
	console.error('')
	console.error(err.stack)
	process.exit(3)
}

process.on('uncaughtException', handleUncaughtException)
;(0, _runner.run)(process.stdout, process.stdin, process.stderr, process.argv)
	.then((exitCode) => process.exit(exitCode))
	.catch((err) => handleUncaughtException(err))
