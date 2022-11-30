import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const findAllGroups = async () => {
	return await prisma.group.findMany()
}
export default findAllGroups
