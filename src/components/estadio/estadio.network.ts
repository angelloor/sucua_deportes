import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Estadio } from './estadio.class';
import { validation } from './estadio.controller';
const routerEstadio = express.Router();

routerEstadio.get('/read/:nombre', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((estadios: Estadio[]) => {
			res.status(200).send(estadios);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerEstadio.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((estadio: Estadio) => {
			res.status(200).send(estadio);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerEstadio };
