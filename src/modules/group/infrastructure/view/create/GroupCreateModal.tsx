import * as React from 'react';
import {Add} from "@mui/icons-material";
import {Box, Button} from "@mui/material";
import Modal from "@mui/material/Modal";
import GroupCreate from "./GroupCreate";


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
const GroupCreateModal = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<Button
				onClick={handleOpen}
				variant="outlined"
				startIcon={<Add/>}>
				Create Group
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<GroupCreate closeContainer={handleClose}/>
				</Box>
			</Modal>
		</>
	);
};

export default GroupCreateModal;
