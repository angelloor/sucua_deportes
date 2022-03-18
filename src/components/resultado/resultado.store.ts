import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Resultado } from './resultado.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vr.id as vr_id, vr.idcalendario as vr_idcalendario, vr.idpartido as vr_idpartido, vr.idequipo as vr_idequipo, vr.goles as vr_goles, vr.estado as vr_estado,vcale.numfecha as vcale_numfecha, vcale.fechapartido as vcale_fechapartido, vcale.horapartido as vcale_horapartido, vcale.observaciones as vcale_observaciones, vcale.usuario as vcale_usuario, vcale.fechareg as vcale_fechareg, vcale.estado as vcale_estado, vp.idcalendario as vp_idcalendario, vp.idcampeonato as vp_idcampeonato, vp.idserie as vp_idserie, vp.estado as vp_estado, vc.numfecha as vc_numfecha, vc.fechapartido as vc_fechapartido, vc.horapartido as vc_horapartido, vc.observaciones as vc_observaciones, vc.usuario as vc_usuario, vc.fechareg as vc_fechareg, vc.estado as vc_estado,vca.codigo as vca_codigo, vca.nombre as vca_nombre, vca.periodo as vca_periodo, vca.fechareg as vca_fechareg, vca.estado as vca_estado, vca.creadopor as vca_creadopor, vca.observaciones as vca_observaciones, ve.nombre as ve_nombre, ve.estado as ve_estado`;
const INNERS_JOIN: string = ` inner join calendario vcale on vr.idcalendario = vcale.id
inner join partido vp on vr.idpartido = vp.id
inner join calendario vc on vp.idcalendario = vc.id
inner join campeonato vca on vp.idcampeonato = vca.id
inner join equipo ve on vr.idequipo = ve.id`;

export const view_resultado = (resultado: Resultado) => {
	return new Promise<Resultado[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_resultado vr${INNERS_JOIN}${
			resultado.estado != 'query-all'
				? ` where lower(ve.nombre) LIKE '%${resultado.estado}%'`
				: ``
		} order by vr.id desc`;

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

export const view_resultado_specific_read = (resultado: Resultado) => {
	return new Promise<Resultado[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_resultado vr${INNERS_JOIN} where vr.id = ${resultado.id}`;

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
