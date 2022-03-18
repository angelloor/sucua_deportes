import { Equipo } from './equipo.class';

export const validation = (equipo: Equipo, url: string) => {
	return new Promise<Equipo | Equipo[] | boolean | any>(
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
				const _equipo = new Equipo();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_equipo.nombre = equipo.nombre;
					await _equipo
						.read()
						.then((_equipos: Equipo[]) => {
							resolve(_equipos);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_equipo.id = equipo.id;
					await _equipo
						.specificRead()
						.then((_equipo: Equipo) => {
							resolve(_equipo);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
