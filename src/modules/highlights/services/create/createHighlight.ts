import {AddHighlightType, HighlightColor, HighlightType} from "../../domain/Highlight";
import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

const createHighlight = async (
	{
		color,
		content,
		groupId
	}: AddHighlightType) => {
	const highlight = await prisma.highlight.create({
		data: {
			color: color as HighlightColor,
			groupId: groupId,
			userId: '1',
			content: content,
		}
	})
	return highlight
}

export default createHighlight
