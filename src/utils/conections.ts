import dotenv from 'dotenv';
import path from 'path';
var mysql = require('mysql');

dotenv.config({
	path: path.join(path.resolve('./env'), process.env.NODE_ENV + '.env'),
});

const clientSucuaDeportesMySQL = mysql.createConnection({
	host: process.env.BD_PG_HOST,
	user: process.env.BD_PG_USER,
	password: process.env.BD_PG_PASSWORD,
	database: process.env.BD_PG_DATABASE,
});

clientSucuaDeportesMySQL.connect();

export { clientSucuaDeportesMySQL };
