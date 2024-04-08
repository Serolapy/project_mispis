import pg from "pg";
const {Pool} = pg;

export default new Pool({
	"user": "postgres",
	"host": "localhost",
	"port": 5433,
	"database": "project_mispis",
	"password": "205080"
});