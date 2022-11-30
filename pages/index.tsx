import HighlightContainer from "../src/modules/highlightsContainer/infrastructure/view/HighlightContainer";
import {Button, Container, IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import Header from "../src/components/header/Header";
import * as React from "react";

const WithSession = ({name}: { name: string }) => {
	return <div style={{
		overflow: 'hidden',
	}}>
		<Header/>
		<HighlightContainer />
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
		return <WithSession name={session?.user?.name || 'unknown'}/>
	}
	return <WithoutSession/>
}
