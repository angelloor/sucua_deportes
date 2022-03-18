import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Campeonato } from './campeonato.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vc.id as idcampeonato, vc.codigo, vc.nombre, vc.periodo, vc.fechareg, vc.estado, vc.creadopor, vc.observaciones`;

export const view_campeonato = (campeonato: Campeonato) => {
	return new Promise<Campeonato[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_campeonato vc${
			campeonato.nombre != 'query-all'
				? ` where lower(vc.nombre) LIKE '%${campeonato.nombre}%'`
				: ``
		} order by vc.id desc`;

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

export const view_campeonato_specific_read = (campeonato: Campeonato) => {
	return new Promise<Campeonato[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_campeonato vc where vc.id = ${campeonato.id}`;

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
