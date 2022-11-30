function stringAvatar(name: string) {
	if(name === undefined) return;
	const splitName = name.split(' ');
	const firstLetter = splitName[0].charAt(0).toUpperCase();
	const secondLetter = splitName[1]?.charAt(0).toUpperCase();
	let response = firstLetter + secondLetter;
	if(secondLetter === undefined) {
		response = firstLetter;
	}
	return {
		children: response,
	};
}

export default stringAvatar;
