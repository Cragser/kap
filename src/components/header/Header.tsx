import * as React from 'react';
import {signOut, useSession} from "next-auth/react"
import {Avatar, Button, Tooltip} from "@mui/material";
import stringAvatar from "../../shared/util/avatar/stringAvatar";
import styles from "./Header.module.css"
import {Add} from "@mui/icons-material";
import HighlightCreateModal from "../../modules/highlights/infrastructure/view/create/HighlightCreateModal";
import GroupCreateModal from "../../modules/group/infrastructure/view/create/GroupCreateModal";

const Header = () => {
	const {data: session, status} = useSession()
	const name = session?.user?.name || "Anonymous"
	return (
		<header className={styles.header}>
			<div className={styles.header__left}>Name</div>
			<div className={styles.header__right}>
				<GroupCreateModal/>
				<HighlightCreateModal/>
				<Tooltip title={name}>
					<Avatar style={{
						width: 32,
						height: 32,
						fontSize: 13,
					}} {...stringAvatar(name)}/>
				</Tooltip>
				<Button variant="outlined" onClick={() => signOut()}>Close session</Button>
			</div>
		</header>
	);
};

export default Header;
