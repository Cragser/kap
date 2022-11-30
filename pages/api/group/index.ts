import {NextApiRequest, NextApiResponse} from "next";
import nc from "next-connect";
import createHighlight from "../../../src/modules/highlights/services/create/createHighlight";
import findRecentHighlights from "../../../src/modules/highlights/services/find/findRecentHighlights";
import createGroup from "../../../src/modules/group/services/create/createGroup";
import findAllGroups from "../../../src/modules/group/services/find/findAllGroups";

interface HighlightRequest extends NextApiRequest {
	body: {
		name: string;
	}
}

const handler = nc<NextApiRequest, NextApiResponse>({})
	.post(async (req, res) => {
		const {name} = req.body;
		const result = await createGroup({
			name
		})
		res.status(200).json(result)
	})
	.get(async (req, res) => {
		const groups = await findAllGroups();
		res.status(200).json(groups)
	})

export default handler;
