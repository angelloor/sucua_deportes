import { Serie } from './serie.class';

export const validation = (serie: Serie, url: string) => {
	return new Promise<Serie | Serie[] | boolean | any>(
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
				const _serie = new Serie();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_serie.codigo = serie.codigo;
					await _serie
						.read()
						.then((_series: Serie[]) => {
							resolve(_series);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_serie.id = serie.id;
					await _serie
						.specificRead()
						.then((_serie: Serie) => {
							resolve(_serie);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
