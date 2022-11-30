import {HighlightColor, HighlightType} from "../../domain/Highlight";
import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

const findHighlight = async (id: string) => {
	const highlight = await prisma.highlight.findUnique({
		where: {
			id: id
		},
		include: {
			user: true,
			group: true
		}
	})
	return highlight
}

export default findHighlight
