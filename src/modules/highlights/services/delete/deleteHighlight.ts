import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
const deleteHighlight = async (highlightId: string) => {
	const highlight = await prisma.highlight.delete({
		where: {
			id: highlightId
		}
	})
	return highlight
}

export default deleteHighlight
