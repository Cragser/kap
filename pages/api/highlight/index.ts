import {NextApiRequest, NextApiResponse} from "next";
import nc from "next-connect";
import createHighlight from "../../../src/modules/highlights/services/create/createHighlight";
import findRecentHighlights from "../../../src/modules/highlights/services/find/findRecentHighlights";

interface HighlightRequest extends NextApiRequest {
	body: {
		content: string;
	}
}

const handler = nc<NextApiRequest, NextApiResponse>({})
	.post(async (req, res) => {
		const {content, color, groupId} = req.body;
		const result = await createHighlight({
			content, color, groupId
		})
		res.status(200).json({ok: result})
	})
	.get(async (req, res) => {
		// req.query.limit
		const highlights = await findRecentHighlights("1", 10);
		res.status(200).json(highlights)
	})

export default handler;
