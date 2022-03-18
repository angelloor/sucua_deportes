import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { TablaPosicion } from './tabla_posicion.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vtp.id as vtp_id, vtp.idequipo as vtp_idequipo, vtp.idcampeonato as vtp_idcampeonato, vtp.idserie as vtp_idserie, vtp.pj as vtp_pj, vtp.pg as vtp_pg, vtp.pp as vtp_pp, vtp.pe as vtp_pe,vtp.gf as vtp_gf, vtp.gc as vtp_gc, vtp.gd as vtp_gd, vtp.puntos as vtp_puntos, ve.nombre as ve_nombre, ve.estado as ve_estado, vs.idcampeonato as vs_idcampeonato, vs.codigo as vs_codigo, vs.genero as vs_genero, vs.descripcion as vs_descripcion, vs.estado as vs_estado, vc.codigo as vc_codigo, vc.nombre as vc_nombre, vc.periodo as vc_periodo, vc.fechareg as vc_fechareg, vc.estado as vc_estado, vc.creadopor as vc_creadopor,vc.observaciones as vc_observaciones, vctp.codigo as vctp_codigo, vctp.nombre as vctp_nombre, vctp.periodo as vctp_periodo, vctp.fechareg as vctp_fechareg, vctp.estado as vctp_estado, vctp.creadopor as vctp_creadopor, vctp.observaciones as vctp_observaciones`;
const INNERS_JOIN: string = ` inner join equipo ve on vtp.idequipo = ve.id
inner join serie vs on ve.idserie = vs.id
inner join campeonato vc on vs.idcampeonato = vc.id
inner join campeonato vctp on vtp.idcampeonato = vctp.id`;

export const view_tabla_posicion = (tabla_posicion: TablaPosicion) => {
	return new Promise<TablaPosicion[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_tabla_posicion vtp${INNERS_JOIN}${
			tabla_posicion.puntos?.toString() != 'query-all'
				? ` where lower(ve.nombre) LIKE '%${tabla_posicion.puntos}%'`
				: ``
		} order by vtp.id desc`;

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

export const view_tabla_posicion_specific_read = (
	tabla_posicion: TablaPosicion
) => {
	return new Promise<TablaPosicion[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_tabla_posicion vtp${INNERS_JOIN} where vtp.id = ${tabla_posicion.id}`;

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
