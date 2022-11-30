import * as React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AddHighlightType} from "../../domain/Highlight";
import {Button, Dialog, DialogTitle} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useState} from "react";

interface HighlightDeleteProps {
	id: string
}

const HighlightDelete = ({id}: HighlightDeleteProps) => {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient()
	const deleteMutation = useMutation({
		mutationFn: () => {
			return fetch(`/api/highlight/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['highlights-query']})
		}
	})
	return (
		<>
			<Button
				size="small"
				color="warning"
				aria-label="Delete"
				onClick={() => setOpen(true)}
			>
				<Delete/>
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Are you sure?</DialogTitle>
				<Button onClick={() => {
					deleteMutation.mutate()
				}}>Yes</Button>
				<Button onClick={() => setOpen(false)}>No</Button>
			</Dialog>
		</>
	);
};

export default HighlightDelete;
