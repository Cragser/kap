import {PrismaClient, Prisma} from '@prisma/client'
import {AddGroupType} from "../../domain/Group";

const prisma = new PrismaClient()

const createHighlight = async (
	{
		name
	}: AddGroupType) => {
	return await prisma.group.create({
		data: {
			name: name,
		}
	})
}

export default createHighlight
