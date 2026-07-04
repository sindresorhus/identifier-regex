import reservedIdentifiers from 'reserved-identifiers';

const baseRegex = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}]*/u;
const boundaryLookbehind = '(?<![@#$_\\p{ID_Continue}\\p{ID_Start}])';
const reservedLookahead = `(?!(?:${[...reservedIdentifiers({includeGlobalProperties: true})].join('|')})(?![$_\\p{ID_Continue}]))`;

const regexes = new Map();

export default function identifierRegex({exact = true, checkReserved = true} = {}) {
	const key = `${exact}${checkReserved}`;
	let regex = regexes.get(key);

	if (!regex) {
		const pattern = `${boundaryLookbehind}${checkReserved ? reservedLookahead : ''}${baseRegex.source}`;
		regex = new RegExp(exact ? `^${pattern}$` : pattern, 'u');
		regexes.set(key, regex);
	}

	return regex;
}
