import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Estadio } from './estadio.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vs.id, vs.nombre, vs.descripcion, vs.estado`;

export const view_estadio = (estadio: Estadio) => {
	return new Promise<Estadio[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_estadio vs${
			estadio.nombre != 'query-all'
				? ` where lower(vs.nombre) LIKE '%${estadio.nombre}%'`
				: ``
		} order by vs.id desc`;

		// console.log(query);

		try {
			await clientSucuaDeportesMySQL.query(
				query,
				(error: any, results: any) => {
					if (error) {
						reject(error.toString());
					} else if (results) {
						resolve(results);
					}
				}
			);
		} catch (error: any) {
			reject(error.toString());
		}
	});
};

export const view_estadio_specific_read = (estadio: Estadio) => {
	return new Promise<Estadio[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_estadio vs where vs.id = ${estadio.id}`;

		// console.log(query);

		try {
			await clientSucuaDeportesMySQL.query(
				query,
				(error: any, results: any) => {
					if (error) {
						reject(error.toString());
					} else if (results) {
						resolve(results);
					}
				}
			);
		} catch (error: any) {
			reject(error.toString());
		}
	});
};
