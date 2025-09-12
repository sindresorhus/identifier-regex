import test from 'ava';
import identifierRegex from './index.js';

const matches = [
	'x',
	'unicorn',
	'foo1',
	'$foo',
	'_foo',
	'breakfast', // Starts with 'break' but is valid
	'outbreak', // Contains 'break' but is valid
	'truthy', // Starts with 'true' but is valid
	'ifTrue', // Starts with 'if' but is valid
	'awaits', // Starts with 'await' but is valid
	'unbreak', // Ends with 'break' but is valid
	'letdown', // Ends with 'let' but is valid
	'α', // Greek letter (valid Unicode identifier start)
	'café', // Unicode identifier with combining characters
	'test\u200C\u200Dname', // Zero-width non-joiner and joiner (valid)
];

const nonMatches = [
	'true',
	'await',
	'undefined',
	'1foo',
	'@foo',
	' x ',
	'a b',
	'', // Empty string
	'123', // All digits
	'if', // Single reserved word
	'break', // Another single reserved word
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

test('non-exact matching edge cases', t => {
	const regex = identifierRegex({exact: false});

	// Should match $x, not x after @
	t.is('@x $x #x'.match(regex)?.[0], '$x');

	// Should not match after sticky characters
	t.is('@x'.match(regex), null);
	t.is('#x'.match(regex), null);

	// Should match after whitespace and punctuation
	t.is(' x'.match(regex)?.[0], 'x');
	t.is('(x)'.match(regex)?.[0], 'x');
	t.is('+x'.match(regex)?.[0], 'x');
	t.is('-x'.match(regex)?.[0], 'x');

	// Should handle complex cases
	t.is('foo@bar'.match(regex)?.[0], 'foo');
	t.is('foo#bar'.match(regex)?.[0], 'foo');
	t.is('foo$bar'.match(regex)?.[0], 'foo$bar'); // $ is valid in identifiers

	// Unicode and edge cases
	t.is('@α'.match(regex), null);
	t.is(' α'.match(regex)?.[0], 'α');
	t.is('#café'.match(regex), null);
	t.is(' café'.match(regex)?.[0], 'café');

	// Multiple identifiers
	t.is('a b c'.match(regex)?.[0], 'a');
	t.is('a@b$c'.match(regex)?.[0], 'a');

	// Reserved words with sticky chars
	t.is('@break $await #true'.match(regex)?.[0], '$await');

	// Edge cases with numbers
	t.is('1x'.match(regex), null); // Numbers can't start identifiers
	t.is('x1'.match(regex)?.[0], 'x1'); // But can contain them
});
