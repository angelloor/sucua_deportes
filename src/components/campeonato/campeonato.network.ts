import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Campeonato } from './campeonato.class';
import { validation } from './campeonato.controller';
const routerCampeonato = express.Router();

routerCampeonato.get('/read/:nombre', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((campeonatos: Campeonato[]) => {
			res.status(200).send(campeonatos);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerCampeonato.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((campeonato: Campeonato) => {
			res.status(200).send(campeonato);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerCampeonato };
