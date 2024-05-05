import reservedIdentifiers from 'reserved-identifiers';

const baseRegex = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}]*/u;
const basePattern = `(?!${[...reservedIdentifiers({includeGlobalProperties: true})].join('|')})${baseRegex.source}`;
const regex = new RegExp(basePattern, 'u');
const regexExact = new RegExp(`^${basePattern}$`, 'u');

export default function identifierRegex({exact = true} = {}) {
	return exact ? regexExact : regex;
}
