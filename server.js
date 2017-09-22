const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const usersCtrl = require('./usersCtrl.js')

const app = express();
app.use(bodyParser.json());

app.get('/api/users', usersCtrl.getUsers);
app.get('/api/users/:id', usersCtrl.getUserById);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonadmins);
app.get('/api/user_type/:type', usersCtrl.getUserType);

app.put('/api/users/:id', usersCtrl.updateUserInfo);

app.post('/api/users', usersCtrl.addUser);

app.delete('/api/users/:id',usersCtrl.deleteUser);

app.listen(port, () => console.log(`listening on ${port}`))