import { Estadio } from './estadio.class';

export const validation = (estadio: Estadio, url: string) => {
	return new Promise<Estadio | Estadio[] | boolean | any>(
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
				const _estadio = new Estadio();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_estadio.nombre = estadio.nombre;
					await _estadio
						.read()
						.then((_estadios: Estadio[]) => {
							resolve(_estadios);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_estadio.id = estadio.id;
					await _estadio
						.specificRead()
						.then((_estadio: Estadio) => {
							resolve(_estadio);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
