import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Calendario } from './calendario.class';
import { validation } from './calendario.controller';
const routerCalendario = express.Router();

routerCalendario.get('/read/:observaciones', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((calendarios: Calendario[]) => {
			res.status(200).send(calendarios);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerCalendario.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((calendario: Calendario) => {
			res.status(200).send(calendario);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerCalendario.get('/bySerieRead/:serie', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((calendario: Calendario) => {
			res.status(200).send(calendario);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerCalendario };
