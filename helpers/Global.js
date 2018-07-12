class Global {
	constructor() {
		this.globalRoom = [];
	}

	enterRoom(id, name, room, img) {
		const roomName = { id, name, room, img };
		this.globalRoom.push(roomName);

		return roomName;
	}

	removeUser(id) {
		const user = this.getUser(id);

		if (user) {
			this.users = this.globalRoom.filter(user => user.id !== id);
		}
		return user;
	}

	getUser(id) {
		const getUser = this.globalRoom.filter(user => user.id === id)[0];
		return getUser;
	}

	getRoomList(room) {
		const nameArray = this.globalRoom.reduce((prevArr, user) => {
			if (user.room === room) {
				prevArr.push({ name: user.name, img: user.img });
			}
			return prevArr;
		}, []);

		// const users = this.users.filter(user => user.room === room);
		// const nameArray = users.map(user => user.name);

		return nameArray;
	}
}

module.exports = { Global };
