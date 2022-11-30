import * as React from 'react';
import {Edit} from "@mui/icons-material";
import {Box, Button} from "@mui/material";
import Modal from "@mui/material/Modal";
import HighlightUpdate from "./HighlightUpdate";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	padding: 0,
};

interface HighlightModalProps {
	id: string,
	content: string,
	color: string,
	groupId: string
}

const HighlightUpdateModal = (props: HighlightModalProps) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<Button
				size="small"
				color="warning"
				aria-label="Delete"
				onClick={handleOpen}
			>
				<Edit/>
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<HighlightUpdate
						{...props}
						closeContainer={handleClose}
					/>
				</Box>
			</Modal>
		</>
	);
};

export default HighlightUpdateModal;
