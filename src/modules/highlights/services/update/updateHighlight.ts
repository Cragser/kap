import {HighlightType} from "../../domain/Highlight";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
const updateHighlight = async (highlight: Partial<HighlightType>) => {
	if (highlight.id === undefined)
		throw new Error("Highlight ID is required");

	const result = await prisma.highlight.update({
		where: {
			id: highlight.id
		},
		data: {
			content: highlight.content,
			color: highlight.color,
			groupId: highlight.groupId,
		}
	})
}

export default updateHighlight
