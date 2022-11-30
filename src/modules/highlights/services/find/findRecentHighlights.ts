import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const findRecentHighlights = async (userId: string, limit: number) => {
	const highlights = await prisma.highlight.findMany({
		where: {
			userId: userId
		},
		include: {
			group: {
				select: {
					name: true,
					id: true
				}
			},
			user: {
				select: {
					name: true
				}
			}
		},
		take: limit,
	})
	return highlights
}

export default findRecentHighlights
