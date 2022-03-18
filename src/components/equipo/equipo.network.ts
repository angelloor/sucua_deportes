import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Equipo } from './equipo.class';
import { validation } from './equipo.controller';
const routerEquipo = express.Router();

routerEquipo.get('/read/:nombre', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((equipos: Equipo[]) => {
			res.status(200).send(equipos);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerEquipo.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((equipo: Equipo) => {
			res.status(200).send(equipo);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerEquipo };
