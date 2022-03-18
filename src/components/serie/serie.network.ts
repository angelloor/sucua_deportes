import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Serie } from './serie.class';
import { validation } from './serie.controller';
const routerSerie = express.Router();

routerSerie.get('/read/:codigo', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((series: Serie[]) => {
			res.status(200).send(series);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerSerie.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((serie: Serie) => {
			res.status(200).send(serie);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerSerie };
