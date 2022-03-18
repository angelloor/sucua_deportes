import { Amonestacion } from './amonestacion.class';

export const validation = (amonestacion: Amonestacion, url: string) => {
	return new Promise<Amonestacion | Amonestacion[] | boolean | any>(
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
				const _amonestacion = new Amonestacion();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_amonestacion.observaciones = amonestacion.observaciones;
					await _amonestacion
						.read()
						.then((_amonestacions: Amonestacion[]) => {
							resolve(_amonestacions);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_amonestacion.id = amonestacion.id;
					await _amonestacion
						.specificRead()
						.then((_amonestacion: Amonestacion) => {
							resolve(_amonestacion);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
