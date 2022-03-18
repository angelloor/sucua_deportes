import { Campeonato } from './campeonato.class';

export const validation = (campeonato: Campeonato, url: string) => {
	return new Promise<Campeonato | Campeonato[] | boolean | any>(
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
				const _campeonato = new Campeonato();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_campeonato.nombre = campeonato.nombre;
					await _campeonato
						.read()
						.then((_campeonatos: Campeonato[]) => {
							resolve(_campeonatos);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_campeonato.id = campeonato.id;
					await _campeonato
						.specificRead()
						.then((_campeonato: Campeonato) => {
							resolve(_campeonato);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
