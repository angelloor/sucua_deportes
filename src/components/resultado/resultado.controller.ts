import { Resultado } from './resultado.class';

export const validation = (resultado: Resultado, url: string) => {
	return new Promise<Resultado | Resultado[] | boolean | any>(
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
				const _resultado = new Resultado();
				/**
				 * Execute the url depending on the path
				 */
				if (url.substring(0, 5) == '/read') {
					/** set required attributes for action */
					_resultado.estado = resultado.estado;
					await _resultado
						.read()
						.then((_resultados: Resultado[]) => {
							resolve(_resultados);
						})
						.catch((error: any) => {
							reject(error);
						});
				} else if (url.substring(0, 13) == '/specificRead') {
					/** set required attributes for action */
					_resultado.id = resultado.id;
					await _resultado
						.specificRead()
						.then((_resultado: Resultado) => {
							resolve(_resultado);
						})
						.catch((error: any) => {
							reject(error);
						});
				}
			}
		}
	);
};
