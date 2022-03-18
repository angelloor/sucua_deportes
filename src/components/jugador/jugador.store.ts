import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Jugador } from './jugador.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vj.id as vj_id, vj.cedula as vj_cedula, vj.idequipo as vj_idequipo, vj.nombre as vj_nombre, vj.apellido as vj_apellido, vj.fechanac as vj_fechanac, vj.telefono as vj_telefono, vj.direccion as vj_direccion, vj.estado as vj_estado, ve.idserie as ve_idserie, ve.nombre as ve_nombre, ve.estado as ve_estado, vs.idcampeonato as vs_idcampeonato, vs.codigo as vs_codigo, vs.genero as vs_genero, vs.descripcion as vs_descripcion, vs.estado as vs_estado, vc.codigo as vc_codigo, vc.nombre as vc_nombre, vc.periodo as vc_periodo, vc.fechareg as vc_fechareg, vc.estado as vc_estado, vc.creadopor as vc_creadopor,vc.observaciones as vc_observaciones`;
const INNERS_JOIN: string = ` inner join equipo ve on vj.idequipo = ve.id
inner join serie vs on ve.idserie = vs.id
inner join campeonato vc on vs.idcampeonato = vc.id`;

export const view_jugador = (jugador: Jugador) => {
	return new Promise<Jugador[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_jugador vj${INNERS_JOIN}${
			jugador.nombre != 'query-all'
				? ` where lower(vj.nombre) LIKE '%${jugador.nombre}%'`
				: ``
		} order by vj.id desc`;

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

export const view_jugador_specific_read = (jugador: Jugador) => {
	return new Promise<Jugador[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_jugador vj${INNERS_JOIN} where vj.id = ${jugador.id}`;

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
