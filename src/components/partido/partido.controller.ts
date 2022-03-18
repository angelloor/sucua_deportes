import { Partido } from './partido.class';

export const validation = (partido: Partido, url: string) => {
	return new Promise<Partido | Partido[] | boolean | any>(
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
				const _partido = new Partido();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_partido.estado = partido.estado;
					await _partido
						.read()
						.then((_partidos: Partido[]) => {
							resolve(_partidos);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_partido.id = partido.id;
					await _partido
						.specificRead()
						.then((_partido: Partido) => {
							resolve(_partido);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
