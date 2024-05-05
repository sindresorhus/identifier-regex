import test from 'ava';
import identifierRegex from './index.js';

const matches = [
	'x',
	'unicorn',
	'foo1',
	'$foo',
	'_foo',
];

const nonMatches = [
	'true',
	'await',
	'undefined',
	'1foo',
	'@foo',
	' x ',
	'a b',
];

test('main', t => {
	for (const match of matches) {
		t.true(identifierRegex().test(match));
	}

	for (const nonMatch of nonMatches) {
		t.false(identifierRegex().test(nonMatch));
	}

	for (const match of matches) {
		t.is((identifierRegex({exact: false}).exec(`## ${match} ##`) ?? [])[0], match);
	}
});
