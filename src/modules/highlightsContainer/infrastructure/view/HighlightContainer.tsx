import * as React from 'react';
import {HighlightType} from "../../../highlights/domain/Highlight";
import HighlightCard from "../../../highlights/infrastructure/view/HighlightCard";
import ZoomContainer from "../../../../components/zoom/ZoomContainer";
import {useQuery} from '@tanstack/react-query'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useState} from "react";
import HighlightGroupContainer from "./HighlightGroupContainer";


const getHighlightCards = async (): Promise<HighlightType[]> => {
	const response = await fetch('/api/highlight');
	const highlights: HighlightType[] = await response.json();
	return highlights;
}


const HighlightContainer = () => {
	const query = useQuery({queryKey: ['highlights-query'], queryFn: getHighlightCards})
	if (query.isLoading) {
		return <div>Loading...</div>
	}
	const highlights = query.data || [];

	// if(true) {
	// 	return <HighlightGroupContainer highlights={highlights}/>
	// }
	// eslint-disable-next-line react-hooks/rules-of-hooks

	return (
		<section style={{
			backgroundColor: '#F5F5F5',
			margin: 0,
			width: '100vw',
			height: '100vh',
			overflow: 'scroll',
			outline: '1px solid red',
			position: 'relative',
		}}>
			<ZoomContainer>
				<HighlightGroupContainer highlights={highlights}/>
			</ZoomContainer>
		</section>
	);
};

export default HighlightContainer;
