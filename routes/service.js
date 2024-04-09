import {Router} from 'express';
import db from '../database.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '1234567890';

const router = Router();

router.post('/logout', function(req, res){
	res.clearCookie('token');
	res.json('ok');
});

router.post('/login', async function(req, res){
	const user = req.body;
	
	const db_req = await db.query('SELECT md5($1) = password AS allowed, id, access_level FROM worker WHERE login = $2', [user.password, user.login]);
	if(db_req.rowCount == 0){
		return res.send('User not found');
	}
	if (!db_req.rows[0].allowed){
		//пароль неправильный
		return res.send('Password is fail');
	}
	const token = jwt.sign({
		"id" : db_req.rows[0].id,
		"login" : user.login,
		"access_level" : db_req.rows[0].access_level
	}, SECRET_KEY);

	res.cookie('token', token);
	return res.json("ok");
});

export default router