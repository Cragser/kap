import { NextPage} from "next";
import styles from './signin.module.css'
interface Props {}

const SignIn: NextPage<Props> = () => {
	return (
		<div className={styles.formSignIn}>
			<form className={styles.formSignIn__form}>
				<h2 className={styles.formSignIn__title}>Login</h2>
				<input className={styles.formSignIn__input} type="text" name="email" placeholder="email"/>
				<input className={styles.formSignIn__input} type="password" name="password" placeholder="password"/>
				<button type="submit">Sign in</button>
			</form>
		</div>
	);
}

export default SignIn;
