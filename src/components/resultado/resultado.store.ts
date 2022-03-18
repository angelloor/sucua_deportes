import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Resultado } from './resultado.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vr.id as idresultado, vr.idcalendario, vr.idpartido, vr.idequipo, vr.goles, vr.estado, vcale.numfecha, vcale.fechapartido, vcale.horapartido, vcale.observaciones, vcale.usuario, vcale.fechareg, vcale.estado, vp.idcalendario, vp.idcampeonato, vp.idserie, vp.estado, vc.numfecha, vc.fechapartido, vc.horapartido, vc.observaciones, vc.usuario, vc.fechareg, vc.estado, vca.codigo, vca.nombre, vca.periodo, vca.fechareg, vca.estado, vca.creadopor, vca.observaciones, ve.nombre, ve.estado`;
const INNERS_JOIN: string = ` inner join calendario vcale on vr.idcalendario = vcale.id
inner join partido vp on vr.idpartido = vp.id
inner join calendario vc on vp.idcalendario = vc.id
inner join campeonato vca on vp.idcampeonato = vca.id
inner join equipo ve on vr.idequipo = ve.id`;

export const view_resultado = (resultado: Resultado) => {
	return new Promise<Resultado[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_resultado vr${INNERS_JOIN}${
			resultado.estado != 'query-all'
				? ` where lower(vr.estado) LIKE '%${resultado.estado}%'`
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
