import {Router} from 'express';
import db from '../../database.js'
const router = Router();

router.post('/', async function(req, res){
	//без защиты
	const user = req.body;
    if(!user) return res.sendStatus(400);

	const db_req = await db.query('INSERT INTO persone (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, user.phone]);
	res.json(db_req.rows[0]);
});
router.get('/', async function(req, res){
	//без защиты
	const user = req.body;
    if(!user) return res.sendStatus(400);

	const db_req = await db.query('SELECT * FROM persone WHERE id = $1', [user.id]);
	res.json(db_req.rows[0]);
});
router.delete('/', async function(req, res){
	//без защиты
	const user = req.body;
    if(!user) return res.sendStatus(400);

	const db_req = await db.query('DELETE FROM persone WHERE id = $1', [user.id]);
	res.json("ok");
});
router.patch('/', async function(req, res){
	//без защиты
	const user = req.body;
    if(!user) return res.sendStatus(400);

	const db_req = await db.query('UPDATE persone SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *', [user.name, user.email, user.phone, user.id]);
	res.json(db_req.rows[0]);
});

router.post('/worker', async function(req, res){
	//без защиты
	const worker = req.body;
    if(!worker) return res.sendStatus(400);

	const db_req = await db.query('INSERT INTO worker (id, login, password, access_level) VALUES ($1, $2, md5($3), $4) RETURNING *', [worker.id, worker.login, worker.password, worker.access_level]);
	res.json(db_req.rows[0]);
});
router.delete('/worker', async function(req, res){
	//без защиты
	const user = req.body;
    if(!user) return res.sendStatus(400);

	const db_req = await db.query('DELETE FROM worker WHERE id = $1', [user.id]);
	res.json("ok");
});
export default router