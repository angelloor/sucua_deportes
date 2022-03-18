import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Amonestacion } from './amonestacion.class';
import { validation } from './amonestacion.controller';
const routerAmonestacion = express.Router();

routerAmonestacion.get('/read/:observaciones', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((amonestacions: Amonestacion[]) => {
			res.status(200).send(amonestacions);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerAmonestacion.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((amonestacion: Amonestacion) => {
			res.status(200).send(amonestacion);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerAmonestacion };
