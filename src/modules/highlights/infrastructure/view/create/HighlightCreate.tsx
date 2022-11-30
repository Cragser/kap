import * as React from 'react';
import {AddHighlightType, HighlightType} from "../../../domain/Highlight";
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import getRandomHighlightColor from "../../util/getRandomHighlightColor";
import {Button, Paper, TextField} from "@mui/material";
import * as yup from 'yup';
import Typography from "@mui/material/Typography";
import SelectColor from "../../../../../components/select/SelectColor";
import SelectGroup from "../../../../../components/select/SelectGroup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import SimpleSnackbar from "../../../../../components/snackbar/SnackbarSuccess";
import HighlightForm from "../HighlightForm";

const validationSchema = yup.object({
	content: yup
		.string()
		.required('Content is required'),

});

const HighlightCreate = (
	{closeContainer}: { closeContainer: () => void }
) => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (highlight: AddHighlightType) => {
			return fetch('/api/highlight', {
				method: 'POST',
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
		content: '',
		groupId: '',
		color: getRandomHighlightColor()
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
			title={'Create Highlight'}
		/>
	);
};

export default HighlightCreate;
