const userData = require('./userData.json');

module.exports = {
    getUsers: (req, res, next) => {
		let users = userData;
		if (req.query.age){
			users = users.filter(val => {
				return val.age < req.query.age;
			});
        }
        if(req.query.lastname){
            users = users.filter(val => {
                return val.last_name == req.query.lastname;
            })
        }
        if(req.query.email){
            users = users.filter(val => {
                return val.email == req.query.email;
            })
        }
        if(req.query.favorites){
            users = users.filter(val => {
                return val.favorites.includes(req.query.favorites);
            })
        }
		res.status(200).json(users);
		return;
    },
    getUserById: (req, res, next) => {
		if (req.params.id) {
			for (let i = 0; i < userData.length; i++) {
				if (userData[i].id == req.params.id) {
					res.json(userData[i]);
					return;
				}
			}
			res.status(404).json(null);
		}

    },
    getAdmins: (req, res, next) => {
        users = userData.filter(val => val.type == 'admin');
        res.status(200).json(users);
        return;
    },
    getNonadmins: (req, res, next) => {
        users = userData.filter(val => val.type != 'admin');
        res.status(200).json(users);
        return;
    },
    getUserType: (req, res, next) => {
        users = userData.filter(val => val.type == req.params.type);
        res.status(200).json(users);
        return;
    },
    updateUserInfo: (req, res, next) => {
        let users = userData;
        for (let i = 0; i < users.length; i++){
            if (users[i].id == req.params.id) {
                users[i] = req.body;
                res.status(200).json(users);
                return;
            }
        }
        res.status(200).json(users);
        return;
    },
    addUser: (req, res, next) => {
        let user = req.body;
		user.id = userData.length + 1;
		userData.push(user);
		res.status(200).json(userData);
		return;
    },
    deleteUser: (req, res, next) => {
        let users = userData;
        for(let i = 0; i < users.length; i++){
            if(users[i].id == req.params.id) {
                users.splice(i, 1);
                res.status(200).json(users);
                return;
            }
        }
        res.status(200).json(users);
        return;
    }
}