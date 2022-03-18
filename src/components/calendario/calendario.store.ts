import { clientSucuaDeportesMySQL } from '../../utils/conections';
import { Calendario } from './calendario.class';

/**
 * Inners and columns for the resolution of ids
 */
const COLUMNS_RETURN: string = `vc.id as vc_idcalendario, vc.idestadio as vc_idestadio, vc.idserie as vc_idserie, vc.idequipoa as vc_idequipoa, vc.idequipob as vc_idequipob, vc.numfecha as vc_numfecha, vc.fechapartido as vc_fechapartido, vc.horapartido as vc_horapartido, vc.observaciones as vc_observaciones, vc.usuario as vc_usuario, vc.fechareg as vc_fechareg, vc.estado as vc_estado, ve.nombre as ve_nombre, ve.descripcion as ve_descripcion, ve.estado as ve_estado, vs.idcampeonato as vs_idcampeonato, vs.codigo as vs_codigo, vs.genero as vs_genero, vs.descripcion as vs_descripcion, vs.estado as vs_estado, vca.codigo as vca_codigo, vca.nombre as vca_nombre, vca.periodo as vca_periodo, vca.fechareg as vca_fechareg, vca.estado as vca_estado, vca.creadopor as vca_creadopor, vca.observaciones as vca_observaciones,veqa.nombre as nombreequipoa, veqa.estado as estadoequipoa, veqb.nombre as nombreequipob, veqb.estado as estadoequipob`;
const INNERS_JOIN: string = ` inner join estadio ve on vc.idestadio = ve.id
inner join serie vs on vc.idserie = vs.id
inner join campeonato vca on vs.idcampeonato = vca.id
inner join equipo veqa on vc.idequipoa = veqa.id
inner join equipo veqb on vc.idequipob = veqb.id`;

export const view_calendario = (calendario: Calendario) => {
	return new Promise<Calendario[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_calendario vc${INNERS_JOIN}${
			calendario.observaciones != 'query-all'
				? ` where lower(ve.nombre) LIKE '%${calendario.observaciones}%'`
				: ``
		} order by vc.id desc`;

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

export const view_calendario_specific_read = (calendario: Calendario) => {
	return new Promise<Calendario[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_calendario vc${INNERS_JOIN} where vc.id = ${calendario.id}`;

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

export const view_calendario_by_serie_read = (calendario: Calendario) => {
	return new Promise<Calendario[]>(async (resolve, reject) => {
		const query = `select ${COLUMNS_RETURN} from view_calendario vc${INNERS_JOIN} where vc.idserie = ${calendario.serie}`;

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
