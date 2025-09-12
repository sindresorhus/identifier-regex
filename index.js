import reservedIdentifiers from 'reserved-identifiers';

const baseRegex = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}]*/u;
const basePattern = `(?<![@#$_\\p{ID_Continue}\\p{ID_Start}])(?!(?:${[...reservedIdentifiers({includeGlobalProperties: true})].join('|')})(?![$_\\p{ID_Continue}]))${baseRegex.source}`;
const regex = new RegExp(basePattern, 'u');
const regexExact = new RegExp(`^${basePattern}$`, 'u');

export default function identifierRegex({exact = true} = {}) {
	return exact ? regexExact : regex;
}
