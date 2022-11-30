import {HighlightColor} from "../../domain/Highlight";

const getRandomHighlightColor = (): HighlightColor => {
	const colors = Object.values(HighlightColor);
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
}

export default getRandomHighlightColor;
