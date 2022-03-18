import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import { appRoutes } from './network/routes';
const app = express();

process.setMaxListeners(0);

dotenv.config({
	path: path.join(path.resolve('./env'), process.env.NODE_ENV + '.env'),
});

const whitelist = ['http://localhost:5200'];
const corsOptionsDelegate = (req: any, callback: any) => {
	let corsOptions = {
		origin: false,
		optionsSuccessStatus: 200,
	};

	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { ...corsOptions, origin: true };
	} else {
		corsOptions = { ...corsOptions, origin: false };
	}
	callback(null, corsOptions);
};

app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('./public'));

appRoutes(app);

var httpServer = http.createServer(app);
httpServer.listen(process.env.NODE_ENV == 'production' ? 80 : 3000);
console.log(
	`La aplicación esta escuchando en http://localhost:${
		process.env.NODE_ENV == 'production' ? 80 : 3000
	}`
);
