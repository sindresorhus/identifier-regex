export type Options = {
	/**
	Only match an exact string.

	@default true
	*/
	readonly exact?: boolean;
};

/**
Regular expression for matching valid [JavaScript identifiers](https://developer.mozilla.org/en-US/docs/Glossary/Identifier).

@example
```
import identifierRegex from 'identifier-regex';

identifierRegex().test('foo');
//=> true

identifierRegex().test('1kg');
//=> false

identifierRegex().test('await'); // Reserved identifier
//=> false

'@x $x #x'.match(identifierRegex({exact: false}));
//=> ['$x']
```
*/
export default function identifierRegex(options?: Options): RegExp;
