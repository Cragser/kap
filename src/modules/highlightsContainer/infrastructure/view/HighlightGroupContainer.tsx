import * as React from 'react';
import {CSSProperties, useEffect, useState} from "react";
import {AddHighlightType, HighlightType} from "../../../highlights/domain/Highlight";
import {
	DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, DraggingStyle,
	Droppable, DropResult,
	NotDraggingStyle
} from "react-beautiful-dnd";
import HighlightCard from "../../../highlights/infrastructure/view/HighlightCard";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Typography} from '@mui/material';
import {Property} from "csstype";
import UserSelect = Property.UserSelect;

interface HighlightGroupContainerProps {
	highlights: HighlightType[];
}

const reorder = (list: Iterable<unknown> | ArrayLike<unknown>, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source: Iterable<unknown> | ArrayLike<unknown>, destination: Iterable<unknown> | ArrayLike<unknown>, droppableSource: { index: number; droppableId: string | number; }, droppableDestination: { index: number; droppableId: string | number; }) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	// @ts-ignore
	result[droppableSource.droppableId] = sourceClone;
	// @ts-ignore
	result[droppableDestination.droppableId] = destClone;

	return result;
};
const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined): CSSProperties => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	// padding: grid * 2,
	// margin: `0 0 ${grid}px 0`,
	// change background colour if dragging
	// background: isDragging ? "lightgreen" : "grey",

	// styles we need to apply on draggables
	...draggableStyle
});


const getListStyle = (isDraggingOver: boolean) => ({
	background: isDraggingOver ? "lightblue" : "#F5F5F5",
	display: 'grid',
	gap: '1rem',
});


// @ts-ignore
const createItemContainer = (provided: DraggableProvided, snapshot: DraggableStateSnapshot, item: HighlightType) => (
	<div
		ref={provided.innerRef}
		{...provided.draggableProps}
		{...provided.dragHandleProps}
		style={getItemStyle(
			snapshot.isDragging,
			provided.draggableProps.style,
		)}
	>
		<HighlightCard
			id={item.id}
			content={item.content}
			group={item.group}
			color={item.color}
			user={item.user}
			createdBy={item.user.id}
			createdByName={item.user.name}
			groupId={item.groupId}
		/>
	</div>
)


const HighlightGroupContainer = (
	{
		highlights
	}: HighlightGroupContainerProps) => {
	const [state, setState] = useState<HighlightType[][]>([]);
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: ({highlight, id}: { id: string, highlight: AddHighlightType }) => {
			return fetch(`/api/highlight/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(highlight),
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['highlights-query']})
		}
	})

	useEffect(() => {
		const groupsInitial = highlights.reduce((acc, highlight) => {
			if (!acc[highlight.group.name]) {
				acc[highlight.group.name] = [];
			}
			acc[highlight.group.name].push(highlight);
			return acc;
		}, {} as { [key: string]: HighlightType[] });
		// order object alphabetically
		const groups = Object.keys(groupsInitial).sort().reduce(
			(obj, key) => {
				// @ts-ignore
				obj[key] = groupsInitial[key];
				return obj;
			}
			, {}) as { [key: string]: HighlightType[] };
		setState(Object.values(groups));
	}, [highlights])

	function onDragEnd(result: DropResult) {
		const highlightId = result.draggableId;
		// @ts-ignore
		const group = state[result.destination.droppableId][0]
		const item = highlights.find(highlight => highlight.id === highlightId)
		if (item) {
			const highlight: AddHighlightType = {
				content: item.content,
				color: item.color,
				groupId: group.groupId
			}
			mutation.mutate({id: highlightId, highlight})
		}
		const {source, destination} = result;
		// dropped outside the list
		if (!destination) {
			return;
		}
		const sourceIndex = +source.droppableId;
		const destinationIndex = +destination.droppableId;

		if (sourceIndex === destinationIndex) {
			const items = reorder(state[sourceIndex], source.index, destination.index);
			const newState = [...state];
			// @ts-ignore
			newState[sourceIndex] = items;
			setState(newState);
		} else {
			const result = move(state[sourceIndex], state[destinationIndex], source, destination);
			const newState = [...state];
			// @ts-ignore
			newState[sourceIndex] = result[sourceIndex];
			// @ts-ignore
			newState[destinationIndex] = result[destinationIndex];
			setState(newState.filter(group => group.length));
		}
	}

	return (
		<div>
			<div style={{display: "flex"}}>
				<DragDropContext onDragEnd={onDragEnd}>
					{state.map((el, ind) => (
						<Droppable key={ind} droppableId={`${ind}`}>
							{(provided, snapshot) => (
								<div style={{
									display: "flex",
									flexDirection: "column",
									color: "black",
									margin: "0 1rem",
									border: "1px solid #ccc",
								}}>
									<Typography variant={'h5'}>{el[0].group.name}</Typography>
									<div
										ref={provided.innerRef}
										style={getListStyle(snapshot.isDraggingOver)}
										{...provided.droppableProps}
									>
										{el.map((item, index) => (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={index}
											>
												{(
													provided,
													snapshot
												) => createItemContainer(provided, snapshot, item)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								</div>
							)}
						</Droppable>
					))}
				</DragDropContext>
			</div>
		</div>
	);
};

export default HighlightGroupContainer;
