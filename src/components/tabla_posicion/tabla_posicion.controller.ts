import { TablaPosicion } from './tabla_posicion.class';

export const validation = (tabla_posicion: TablaPosicion, url: string) => {
	return new Promise<TablaPosicion | TablaPosicion[] | boolean | any>(
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
				const _tabla_posicion = new TablaPosicion();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_tabla_posicion.puntos = tabla_posicion.puntos;
					await _tabla_posicion
						.read()
						.then((_tablaPosicions: TablaPosicion[]) => {
							resolve(_tablaPosicions);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_tabla_posicion.id = tabla_posicion.id;
					await _tabla_posicion
						.specificRead()
						.then((_tablaPosicion: TablaPosicion) => {
							resolve(_tablaPosicion);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 12) == '/bySerieRead') {
					/** set required attributes for action */
					_tabla_posicion.serie = tabla_posicion.serie;
					await _tabla_posicion
						.bySerieRead()
						.then((_tablaPosicion: TablaPosicion[]) => {
							resolve(_tablaPosicion);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
