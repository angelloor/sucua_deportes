import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Resultado } from './resultado.class';
import { validation } from './resultado.controller';
const routerResultado = express.Router();

routerResultado.get('/read/:estado', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((resultados: Resultado[]) => {
			res.status(200).send(resultados);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerResultado.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((resultado: Resultado) => {
			res.status(200).send(resultado);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerResultado };
