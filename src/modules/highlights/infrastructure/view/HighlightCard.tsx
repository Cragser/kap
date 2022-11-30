import * as React from 'react';
import {HighlightColor, HighlightType} from "../../domain/Highlight";
import {
	Avatar,
	Box,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Divider,
	Fab,
	IconButton,
	Button,
	Tooltip, CardActions
} from "@mui/material";
import stringAvatar from "../../../../shared/util/avatar/stringAvatar";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Delete, Edit} from "@mui/icons-material";
import HighlightDelete from "./HighlightDelete";
import HighlightUpdateModal from "./update/HighlightUpdateModal";


const HighlightCard = (
	{
		id,
		content,
		color,
		group,
		user
	}: HighlightType) => {

	return (
		<Card style={{backgroundColor: color, maxWidth: "50ch", margin: "1rem"}}>
			<div>
				<Tooltip title={user.name}>
					<Chip label={stringAvatar(user.name)?.children}/>
				</Tooltip>
			</div>
			<CardContent>
				<Box py={2}>{content}</Box>
				<Box>
					<Chip label={group.name}/>
				</Box>
			</CardContent>
			<CardActions>
				<ButtonGroup>
					<HighlightDelete id={id}/>
					<HighlightUpdateModal
						id={id}
						content={content}
						color={color as HighlightColor}
						groupId={group.id}
					/>
				</ButtonGroup>
			</CardActions>


		</Card>
	);
};

export default HighlightCard;
