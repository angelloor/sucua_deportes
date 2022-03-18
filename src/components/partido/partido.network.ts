import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Partido } from './partido.class';
import { validation } from './partido.controller';
const routerPartido = express.Router();

routerPartido.get('/read/:estado', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((partidos: Partido[]) => {
			res.status(200).send(partidos);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerPartido.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((partido: Partido) => {
			res.status(200).send(partido);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerPartido };
