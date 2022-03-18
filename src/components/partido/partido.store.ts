import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Partido } from './partido.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vp.id as idpartido, vp.idcalendario, vp.idcampeonato, vp.idserie, vp.estado, vc.numfecha, vc.fechapartido, vc.horapartido, vc.observaciones, vc.usuario, vc.fechareg, vc.estado, vca.codigo, vca.nombre, vca.periodo, vca.fechareg, vca.estado, vca.creadopor, vca.observaciones`;
const INNERS_JOIN: string = ` inner join calendario vc on vp.idcalendario = vc.id
inner join campeonato vca on vp.idcampeonato = vca.id`;

export const view_partido = (partido: Partido) => {
	return new Promise<Partido[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_partido vp${INNERS_JOIN}${
			partido.estado != 'query-all'
				? ` where lower(vp.estado) LIKE '%${partido.estado}%'`
				: ``
		} order by vp.id desc`;

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

export const view_partido_specific_read = (partido: Partido) => {
	return new Promise<Partido[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_partido vp${INNERS_JOIN} where vp.id = ${partido.id}`;

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
