import * as React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AddHighlightType, HighlightColor} from "../../../domain/Highlight";
import getRandomHighlightColor from "../../util/getRandomHighlightColor";
import {useFormik} from "formik";
import * as yup from "yup";
import HighlightForm from "../HighlightForm";

interface HighlightUpdateProps {
	id: string,
	content: string,
	color: string,
	groupId: string,
	closeContainer: () => void
}

const validationSchema = yup.object({
	content: yup
		.string()
		.required('Content is required'),

});

const HighlightUpdate = (
	{
		id,
		content,
		color,
		groupId,
		closeContainer
	}: HighlightUpdateProps) => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (highlight: AddHighlightType) => {
			return fetch(`/api/highlight/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(highlight),
			})
		},
		onSuccess: () => {
			closeContainer()
			queryClient.invalidateQueries({queryKey: ['highlights-query']})
		}
	})
	const initialValues: AddHighlightType = {
		content: content,
		groupId: groupId,
		color: color as HighlightColor
	}
	const formik = useFormik<AddHighlightType>({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: values => {
			mutation.mutate(values)
		}
	})
	return (
		<HighlightForm
			formik={formik}
			mutation={mutation}
			title={'Update Highlight'}
		/>
	);
};

export default HighlightUpdate;
