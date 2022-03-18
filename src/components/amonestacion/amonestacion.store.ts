import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Amonestacion } from './amonestacion.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `va.id as idamonestacion, va.idjugador, va.tipotarjeta, va.estado, va.observaciones, va.fechareg, va.registradopor, vj.cedula, vj.idequipo, vj.nombre, vj.apellido, vj.fechanac, vj.telefono, vj.direccion, vj.estado, ve.idserie, ve.nombre, ve.estado, vs.idcampeonato, vs.codigo, vs.genero, vs.descripcion, vs.estado, vc.codigo, vc.nombre, vc.periodo, vc.fechareg, vc.estado, vc.creadopor, vc.observaciones`;
const INNERS_JOIN: string = ` inner join jugador vj on va.idjugador = vj.id
inner join equipo ve on vj.idequipo = ve.id
inner join serie vs on ve.idserie = vs.id
inner join campeonato vc on vs.idcampeonato = vc.id`;

export const view_amonestacion = (amonestacion: Amonestacion) => {
	return new Promise<Amonestacion[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_amonestacion va${INNERS_JOIN}${
			amonestacion.observaciones != 'query-all'
				? ` where lower(va.observaciones) LIKE '%${amonestacion.observaciones}%'`
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
