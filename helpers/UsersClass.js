class Users {
	constructor() {
		this.users = [];
	}

	addUserData(id, name, room) {
		const user = { id, name, room };
		this.users.push(user);
		return user;
	}

	removeUser(id) {
		const user = this.getUser(id);

		if (user) {
			this.users = this.users.filter(user => user.id !== id);
		}
		return user;
	}

	getUser(id) {
		const getUser = this.users.filter(user => user.id === id)[0];
		return getUser;
	}

	getUserList(room) {
		const nameArray = this.users.reduce((prevArr, user) => {
			if (user.room === room) {
				prevArr.push(user.name);
			}
			return prevArr;
		}, []);

		// const users = this.users.filter(user => user.room === room);
		// const nameArray = users.map(user => user.name);

		return nameArray;
	}
}

module.exports = { Users };
