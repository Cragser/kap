import * as React from 'react';
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import * as yup from 'yup';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AddHighlightType} from "../../../../highlights/domain/Highlight";
import {AddGroupType} from "../../../domain/Group";
import GroupForm from "../GroupForm";

const validationSchema = yup.object({
	name: yup
		.string()
		.required('name is required'),

});

const GroupCreate = (
	{closeContainer}: { closeContainer: () => void }
) => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (group: AddGroupType) => {
			return fetch('/api/group', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(group),
			})
		},
		onSuccess: () => {
			closeContainer()
			queryClient.invalidateQueries({queryKey: ['group-query']})
		}
	})
	const initialValues: AddGroupType = {
		name: ''
	}
	const formik = useFormik<AddGroupType>({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: values => {
			mutation.mutate(values)
		}
	})

	return (
		<GroupForm
			formik={formik}
			mutation={mutation}
			title={'Create Group'}
		/>
	);
};

export default GroupCreate;
