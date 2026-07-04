export type Options = {
	/**
	Only match an exact string.

	@default true
	*/
	readonly exact?: boolean;

	/**
	Reject reserved words and global properties like `if`, `await`, and `undefined`.

	These are valid identifier syntax but should not be used as variable names, so they are rejected by default. Disable this when you only care about the syntax, such as for property keys (`{if: 1}`) or dot notation (`foo.for`), where they are allowed.

	@default true

	@example
	```
	import identifierRegex from 'identifier-regex';

	identifierRegex({checkReserved: false}).test('for');
	//=> true
	```
	*/
	readonly checkReserved?: boolean;
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
