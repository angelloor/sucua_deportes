import { Calendario } from './calendario.class';

export const validation = (calendario: Calendario, url: string) => {
	return new Promise<Calendario | Calendario[] | boolean | any>(
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
				const _calendario = new Calendario();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_calendario.observaciones = calendario.observaciones;
					await _calendario
						.read()
						.then((_calendarios: Calendario[]) => {
							resolve(_calendarios);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_calendario.id = calendario.id;
					await _calendario
						.specificRead()
						.then((_calendario: Calendario) => {
							resolve(_calendario);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
