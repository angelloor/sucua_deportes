import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Equipo } from './equipo.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `ve.id as ve_id, ve.idserie as ve_idserie, ve.nombre as ve_nombre, ve.estado as ve_estado, vs.idcampeonato as vs_idcampeonato, vs.codigo as vs_codigo, vs.genero as vs_genero, vs.descripcion as vs_descripcion, vs.estado as vs_estado, vc.codigo as vc_codigo, vc.nombre as vc_nombre, vc.periodo as vc_periodo, vc.fechareg as vc_fechareg, vc.estado as vc_estado, vc.creadopor as vc_creadopor, vc.observaciones as vc_observaciones`;
const INNERS_JOIN: string = ` inner join serie vs on ve.idserie = vs.id
inner join campeonato vc on vs.idcampeonato = vc.id`;

export const view_equipo = (equipo: Equipo) => {
	return new Promise<Equipo[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_equipo ve${INNERS_JOIN}${
			equipo.nombre != 'query-all'
				? ` where lower(ve.nombre) LIKE '%${equipo.nombre}%'`
				: ``
		} order by ve.id desc`;

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

export const view_equipo_specific_read = (equipo: Equipo) => {
	return new Promise<Equipo[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_equipo ve${INNERS_JOIN} where ve.id = ${equipo.id}`;

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
