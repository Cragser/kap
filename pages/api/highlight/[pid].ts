import {NextApiRequest, NextApiResponse} from "next";
import nc from "next-connect";
import findHighlight from "../../../src/modules/highlights/services/find/findHighlight";
import updateHighlight from "../../../src/modules/highlights/services/update/updateHighlight";
import deleteHighlight from "../../../src/modules/highlights/services/delete/deleteHighlight";

interface HighlightRequest extends NextApiRequest {
	query: {
		pid: string;
	};
}

const handler = nc<HighlightRequest, NextApiResponse>({})
	.get(async (req, res) => {
		const response = await findHighlight(req.query.pid);
		res.json(response);
	})
	.put(async (req, res) => {
		if(req.body.id === undefined) {
			req.body.id = req.query.pid;
		}
		const response = await updateHighlight(req.body);
		res.json(response);
	})
	.delete(async (req, res) => {
		const response = await deleteHighlight(req.query.pid);
		res.json(response);
	})

export default handler;
