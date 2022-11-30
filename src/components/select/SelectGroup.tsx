import {SelectChangeEvent} from "@mui/material/Select";
import {ReactNode, useState} from "react";
import {SelectProps} from "@mui/material/Select/Select";
import {FormControl, FormHelperText, InputLabel, MenuItem} from "@mui/material";
import {Select} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {HighlightColor} from "../../modules/highlights/domain/Highlight";
import {Group} from "../../modules/group/domain/Group";


const getGroups = async () => {
	const response = await fetch('/api/group', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	})
	const groups: Group[] = await response.json()
	return groups
}

const SelectGroup = (props: SelectProps) => {
	const query = useQuery({
		queryKey: ['group-query'],
		queryFn: getGroups,
	})
	const [value, setValue] = useState(props.value);
	const handleChange = (event: SelectChangeEvent<unknown>, child: ReactNode) => {
		setValue(event.target.value as string);
		props.onChange?.(event, child);
	};

	if (query.isLoading) {
		return <div>Loading...</div>
	}
	const groups = query.data
	if (!groups) {
		return <div>Intenta agregando un grupo primero</div>
	}

	return (
		<FormControl>
			<InputLabel>{props.label}</InputLabel>
			<Select
				{...props}
				value={value}
				renderValue={(selected: unknown) => {
					const group = groups.find(group => group.id == props.value)
					return group?.name ?? 'Sin grupo'
				}}
				onChange={handleChange}
				autoWidth
				label={'Group'}
			>
				{
					groups.map((group) => {
						return <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
					})
				}
			</Select>
		</FormControl>
	);
}

export default SelectGroup;
