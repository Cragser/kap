enum HighlightColor {
	Yellow = '#F8DD80',
	Blue = '#86CEFC',
	Green = '#89F3A7',
	Red = '#F28384',
	Purple = '#E0A7F9',
}

interface HighlightType {
	id: string;
	content: string;
	color?: HighlightColor;
	createdBy: string;
	createdByName: string;
	group: {
		id: string;
		name: string;
	},
	user: {
		id: string;
		name: string;
	},
}

type AddHighlightType = Omit<HighlightType, 'id' | 'group' | 'user' | 'createdByName' | 'createdBy'> & {
	groupId: string;
}


export type  {
	HighlightType,
	AddHighlightType
}

export {
	HighlightColor
}
