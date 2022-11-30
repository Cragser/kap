import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {HighlightType, HighlightColor} from "../src/modules/highlights/domain/Highlight";
import HighlightContainer from "../src/modules/highlightsContainer/infrastructure/view/HighlightContainer";
import {Button, Container, IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import Header from "../src/components/header/Header";
import * as React from "react";

const Task: HighlightType[] = [
	{
		id: '1',
		content: 'content',
		groupId: '1',
		groupName: 'Servicios',
		createdBy: '1',
		createdByName: "Sergio Reyes",
		color: HighlightColor.Blue
	},
	{
		id: '2',
		content: 'content',
		groupId: '1',
		groupName: "Ejemplos",
		createdBy: '1',
		createdByName: "Sergio Reyes",
		color: HighlightColor.Red
	}
]

const WithSession = ({name}: { name: string }) => {
	return <div style={{
		overflow: 'hidden',
	}}>
		<Header/>
		<HighlightContainer highlights={Task}/>

	</div>
}

const WithoutSession = () => {
	return <div style={{
		display: 'grid',
		placeItems: 'center',
		height: '100vh',
	}}>
		<Button variant="outlined" onClick={() => signIn()}>Sign In</Button>
	</div>
}

export default function Home() {
	const {data: session, status} = useSession()
	if (status === "authenticated") {
		return <WithSession name={session?.user?.name || 'Unknow'}/>
	}
	return <WithoutSession/>
}
