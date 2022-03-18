import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Amonestacion } from './amonestacion.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `va.id as va_id, va.idjugador as va_idjugador, va.tipotarjeta as va_tipotarjeta, va.estado as va_estado, va.observaciones as va_observaciones, va.fechareg as va_fechareg, va.registradopor as va_registradopor, vj.cedula as vj_cedula, vj.idequipo as vj_idequipo, vj.nombre as vj_nombre, vj.apellido as vj_apellido, vj.fechanac as vj_fechanac, vj.telefono as vj_telefono, vj.direccion as vj_direccion, vj.estado as vj_estado, ve.idserie as ve_idserie, ve.nombre as ve_nombre, ve.estado as ve_estado, vs.idcampeonato as vs_idcampeonato, vs.codigo as vs_codigo, vs.genero as vs_genero, vs.descripcion as vs_descripcion, vs.estado as vs_estado, vc.codigo as vc_codigo, vc.nombre as vc_nombre, vc.periodo as vc_periodo, vc.fechareg as vc_fechareg, vc.estado as vc_estado,vc.creadopor as vc_creadopor, vc.observaciones as vc_observaciones`;
const INNERS_JOIN: string = ` inner join jugador vj on va.idjugador = vj.id
inner join equipo ve on vj.idequipo = ve.id
inner join serie vs on ve.idserie = vs.id
inner join campeonato vc on vs.idcampeonato = vc.id`;

export const view_amonestacion = (amonestacion: Amonestacion) => {
	return new Promise<Amonestacion[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_amonestacion va${INNERS_JOIN}${
			amonestacion.observaciones != 'query-all'
				? ` where lower(vj.nombre) LIKE '%${amonestacion.observaciones}%'`
				: ``
		} order by va.id desc`;

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

export const view_amonestacion_specific_read = (amonestacion: Amonestacion) => {
	return new Promise<Amonestacion[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_amonestacion va${INNERS_JOIN} where va.id = ${amonestacion.id}`;

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
