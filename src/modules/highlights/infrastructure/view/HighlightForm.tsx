import * as React from 'react';
import {AddHighlightType, HighlightType} from "../../domain/Highlight";
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import getRandomHighlightColor from "../util/getRandomHighlightColor";
import {Button, Paper, TextField} from "@mui/material";
import * as yup from 'yup';
import Typography from "@mui/material/Typography";
import SelectColor from "../../../../components/select/SelectColor";
import SelectGroup from "../../../../components/select/SelectGroup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import SimpleSnackbar from "../../../../components/snackbar/SnackbarSuccess";

const validationSchema = yup.object({
	content: yup
		.string()
		.required('Content is required'),

});

const HighlightCreate = (
	{mutation, title, formik}: any
) => {
	return (
		<Paper elevation={3} style={{
			maxWidth: "80ch",
			padding: "1rem",
		}}>
			<Typography variant={'h5'} pt={1}>
				{title}
			</Typography>
			{mutation.isLoading && <div>Loading...</div>}
			{mutation.isLoading === false &&
                <form onSubmit={formik.handleSubmit}>
                    <div style={{
						padding: "1rem 0",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}>
                        <TextField
                            fullWidth
                            id="content"
                            name="content"
                            label="Content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            error={formik.touched.content && Boolean(formik.errors.content)}
                            helperText={formik.touched.content && formik.errors.content}
                        />
                        <SelectColor
                            name="color"
                            label="Color"
                            value={formik.values.color}
                            onChange={formik.handleChange}
                            error={formik.touched.color && Boolean(formik.errors.color)}
                        />
                        <SelectGroup
                            name="groupId"
                            label="Group"
                            value={formik.values.groupId}
                            onChange={formik.handleChange}
                            error={formik.touched.groupId && Boolean(formik.errors.color)}
                        />
                    </div>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
			}
			{mutation.isError ? (
				<div>An error occurred: {mutation?.error?.message}</div>
			) : null}
			{mutation.isSuccess
				? <SimpleSnackbar/>
				: null}
		</Paper>

	);
};

export default HighlightCreate;
