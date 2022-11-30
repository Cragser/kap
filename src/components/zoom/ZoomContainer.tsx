import * as React from 'react';
import {Button, Container} from "@mui/material";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

const ZoomContainer = ({children}: { children: React.ReactNode }) => {
	return <TransformWrapper
		initialScale={0.5}

	>
		{({zoomIn, zoomOut, resetTransform, ...rest}) => (
			<React.Fragment>
				<TransformComponent
					disabled={true}
					wrapperStyle={{
						outline: '1px solid red',
						width: '100%',
						height: '100%',
						padding: 0,
						margin: 0,

					}}>
					{children}
				</TransformComponent>
				<div style={{
					position: 'fixed',
					bottom: 0,
					right: 0,
					padding: '10px',
					zIndex: 3
				}}>
					<Button variant={'outlined'} onClick={() => zoomIn()}>+</Button>
					<Button variant={'outlined'} onClick={() => zoomOut()}>-</Button>
					<Button variant={'outlined'} onClick={() => resetTransform()}>x</Button>
				</div>
			</React.Fragment>
		)}
	</TransformWrapper>
}
export default ZoomContainer;
