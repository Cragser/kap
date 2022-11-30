import {FormControl, InputLabel, MenuItem} from "@mui/material";
import {HighlightColor} from "../../modules/highlights/domain/Highlight";
import {ReactNode, useState} from "react";
import getRandomHighlightColor from "../../modules/highlights/infrastructure/util/getRandomHighlightColor";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {SelectProps} from "@mui/material/Select/Select";

const Color = ({color}: { color: HighlightColor }) => {
	return <span style={{
		backgroundColor: color,
		width: '1rem',
		height: '1rem',
	}}></span>
}

const SelectColor = (props: SelectProps) => {
	const [color, setColor] = useState<HighlightColor>(props.value as HighlightColor);

	const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
		setColor(event.target.value as HighlightColor);
		props.onChange?.(event, child);
	};
	return (
		<FormControl>
			<InputLabel>{props.label}</InputLabel>
			<Select
				{...props}
				value={color}
				renderValue={(selected: unknown) => {
					const reverseHighlightColor = Object.entries(HighlightColor).find(([key, value]) => value === selected);
					return <>
						{reverseHighlightColor?.[0]}
					</>
				}}
				onChange={(event, child) => {
					handleChange(event as SelectChangeEvent<string>, child)
				}}
				autoWidth
				label={'Color'}
			>
				{
					Object.keys(HighlightColor).map((colorName) => {
						const colorValue = HighlightColor[colorName as keyof typeof HighlightColor];
						return <MenuItem key={colorName} value={colorValue} style={{
							display: "flex",
							alignItems: "center",
							gap: "0.5rem",
						}}>
							<Color color={colorValue}/>
							{colorName}
						</MenuItem>
					})
				}
			</Select>
		</FormControl>
	)
}

export default SelectColor;
