import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Jugador } from './jugador.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vj.id as idjugador, vj.cedula, vj.idequipo, vj.nombre as nombrejugador, vj.apellido, vj.fechanac, vj.telefono, vj.direccion, vj.estado, ve.idserie, ve.nombre as nombreestadio, ve.estado, vs.idcampeonato, vs.codigo, vs.genero, vs.descripcion, vs.estado, vc.codigo, vc.nombre as nombrecampeonato, vc.periodo, vc.fechareg, vc.estado, vc.creadopor, vc.observaciones`;
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
