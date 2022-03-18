import express from 'express';
import { error } from '../../network/response';
import { Mensaje } from '../../utils/mensaje/mensaje.type';
import { Jugador } from './jugador.class';
import { validation } from './jugador.controller';
const routerJugador = express.Router();

routerJugador.get('/read/:nombre', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((jugadors: Jugador[]) => {
			res.status(200).send(jugadors);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

routerJugador.get('/specificRead/:id', async (req: any, res: any) => {
	await validation(req.params, req.url)
		.then((jugador: Jugador) => {
			res.status(200).send(jugador);
		})
		.catch((err: Mensaje | any) => {
			error(res, err);
		});
});

export { routerJugador };
