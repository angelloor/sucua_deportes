import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { TablaPosicion } from './tabla_posicion.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vtp.id as idtabla_posicion, vtp.idequipo, vtp.idcampeonato, vtp.idserie, vtp.pj, vtp.pg, vtp.pp, vtp.pe, vtp.gf, vtp.gc, vtp.gd, vtp.puntos, ve.nombre, ve.estado, vs.idcampeonato, vs.codigo, vs.genero, vs.descripcion, vs.estado, vc.codigo, vc.nombre, vc.periodo, vc.fechareg, vc.estado, vc.creadopor, vc.observaciones, vctp.codigo, vctp.nombre, vctp.periodo, vctp.fechareg, vctp.estado, vctp.creadopor, vctp.observaciones`;
const INNERS_JOIN: string = ` inner join equipo ve on vtp.idequipo = ve.id
inner join serie vs on ve.idserie = vs.id
inner join campeonato vc on vs.idcampeonato = vc.id
inner join campeonato vctp on vtp.idcampeonato = vctp.id`;

export const view_tabla_posicion = (tabla_posicion: TablaPosicion) => {
	return new Promise<TablaPosicion[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_tabla_posicion vtp${INNERS_JOIN}${
			tabla_posicion.puntos?.toString() != 'query-all'
				? ` where lower(vtp.puntos) LIKE '%${tabla_posicion.puntos}%'`
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
