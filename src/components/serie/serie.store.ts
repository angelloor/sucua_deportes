import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Serie } from './serie.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vs.id as idserie, vs.idcampeonato, vs.codigo, vs.genero, vs.descripcion, vs.estado, vc.codigo, vc.nombre, vc.periodo, vc.fechareg, vc.estado, vc.creadopor, vc.observaciones`;
const INNERS_JOIN: string = ` inner join campeonato vc on vs.idcampeonato = vc.id`;

export const view_serie = (serie: Serie) => {
	return new Promise<Serie[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_serie vs${INNERS_JOIN}${
			serie.codigo != 'query-all'
				? ` where lower(vs.codigo) LIKE '%${serie.codigo}%'`
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

export const view_serie_specific_read = (serie: Serie) => {
	return new Promise<Serie[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_serie vs${INNERS_JOIN} where vs.id = ${serie.id}`;

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
