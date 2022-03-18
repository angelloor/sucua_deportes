import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { TablaPosicion } from './tabla_posicion.class';
import { validation } from './tabla_posicion.controller';
const routerTablaPosicion = express.Router();

routerTablaPosicion.get('/read/:puntos', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((tablaPosicions: TablaPosicion[]) => {
			res.status(200).send(tablaPosicions);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerTablaPosicion.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((tablaPosicion: TablaPosicion) => {
			res.status(200).send(tablaPosicion);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerTablaPosicion };
