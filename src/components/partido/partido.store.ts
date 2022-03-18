import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Partido } from './partido.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vp.id as vp_id, vp.idcalendario as vp_idcalendario, vp.idcampeonato as vp_idcampeonato, vp.idserie as vp_idserie, vp.estado as vp_estado, vc.numfecha as vc_numfecha, vc.fechapartido as vc_fechapartido, vc.horapartido as vc_horapartido, vc.observaciones as vc_observaciones, vc.usuario as vc_usuario, vc.fechareg as vc_fechareg, vc.estado as vc_estado, vca.codigo as vca_codigo, vca.nombre as vca_nombre, vca.periodo as vca_periodo, vca.fechareg as vca_fechareg, vca.estado as vca_estado, vca.creadopor as vca_creadopor, vca.observaciones as vca_observaciones`;
const INNERS_JOIN: string = ` inner join calendario vc on vp.idcalendario = vc.id
inner join campeonato vca on vp.idcampeonato = vca.id`;

export const view_partido = (partido: Partido) => {
	return new Promise<Partido[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_partido vp${INNERS_JOIN}${
			partido.estado != 'query-all'
				? ` where lower(vca.nombre) LIKE '%${partido.estado}%'`
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
