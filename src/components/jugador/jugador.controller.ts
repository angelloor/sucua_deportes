import { Jugador } from './jugador.class';

export const validation = (jugador: Jugador, url: string) => {
	return new Promise<Jugador | Jugador[] | boolean | any>(
		async (resolve, reject) => {
			/**
			 * Capa de Autentificación con el token
			 */
			let validationStatus: boolean = false;

			/**
			 * Continuar solo si no ocurrio errores en la validación
			 */
			if (!validationStatus) {
				/**
				 * Instance the class
				 */
				const _jugador = new Jugador();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_jugador.nombre = jugador.nombre;
					await _jugador
						.read()
						.then((_jugadors: Jugador[]) => {
							resolve(_jugadors);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_jugador.id = jugador.id;
					await _jugador
						.specificRead()
						.then((_jugador: Jugador) => {
							resolve(_jugador);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
