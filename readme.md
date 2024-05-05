# identifier-regex

> Regular expression for matching valid [JavaScript identifiers](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)

## Install

```sh
npm install identifier-regex
```

## Usage

```js
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

> [!IMPORTANT]
> If you run the regex against untrusted user input in a server context, you should [give it a timeout](https://github.com/sindresorhus/super-regex). I do not consider ReDoS a valid vulnerability for this package.

> [!NOTE]
> Although `globalThis`, `Infinity`, `NaN`, and `undefined` are [properties of the global object](https://tc39.es/ecma262/#sec-value-properties-of-the-global-object) and not identifiers, they are not matched by the regex because they should generally not be used as identifiers.

## API

### identifierRegex(options?)

Returns a `RegExp` for matching valid JavaScript identifiers.

#### options

Type: `object`

##### exact

Type: `boolean`\
Default: `true`

Only match an exact string.

## Related

- [is-identifier](https://github.com/sindresorhus/is-identifier) - Check if a string is a valid JavaScript identifier
