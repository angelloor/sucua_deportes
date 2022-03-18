import { Calendario } from '../calendario/calendario.class';
import { _calendario } from '../calendario/calendario.data';
import { Equipo } from '../equipo/equipo.class';
import { _equipo } from '../equipo/equipo.data';
import { Partido } from '../partido/partido.class';
import { _partido } from '../partido/partido.data';
import {
	view_resultado,
	view_resultado_specific_read,
} from './resultado.store';

export class Resultado {
	/** Attributes */
	public id?: number;
	public calendario?: Calendario;
	public partido?: Partido;
	public equipo?: Equipo;
	public goles?: number;
	public estado?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		calendario: Calendario = _calendario,
		partido: Partido = _partido,
		equipo: Equipo = _equipo,
		goles: number = 0,
		estado: string = ''
	) {
		this.id = id;
		this.calendario = calendario;
		this.partido = partido;
		this.equipo = equipo;
		this.goles = goles;
		this.estado = estado;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _calendario(calendario: Calendario) {
		this.calendario = calendario;
	}
	get _calendario() {
		return this.calendario!;
	}

	set _partido(partido: Partido) {
		this.partido = partido;
	}
	get _partido() {
		return this.partido!;
	}

	set _equipo(equipo: Equipo) {
		this.equipo = equipo;
	}
	get _equipo() {
		return this.equipo!;
	}

	set _goles(goles: number) {
		this.goles = goles;
	}
	get _goles() {
		return this.goles!;
	}

	set _estado(estado: string) {
		this.estado = estado;
	}
	get _estado() {
		return this.estado!;
	}

	/** Methods */
	read() {
		return new Promise<Resultado[]>(async (resolve, reject) => {
			await view_resultado(this)
				.then((resultados: Resultado[]) => {
					/**
					 * Mutate response
					 */
					const _resultados = this.mutateResponse(resultados);

					resolve(_resultados);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Resultado>(async (resolve, reject) => {
			await view_resultado_specific_read(this)
				.then((resultados: Resultado[]) => {
					/**
					 * Mutate response
					 */
					const _resultados = this.mutateResponse(resultados);

					resolve(_resultados[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param resultados
	 * @returns
	 */
	private mutateResponse(resultados: Resultado[]): Resultado[] {
		let _resultados: Resultado[] = [];

		resultados.map((item: any) => {
			let _resultado: Resultado | any = {
				...item,
				id: item.vr_id,
				calendario: {
					idcalendario: item.vr_idcalendario,
					numfecha: item.vcale_numfecha,
					fechapartido: item.vcale_fechapartido,
					horapartido: item.vcale_horapartido,
					observaciones: item.vcale_observaciones,
					usuario: item.vcale_usuario,
					fechareg: item.vcale_fechareg,
					estado: item.vcale_estado,
				},
				partido: {
					idpartido: item.vr_idpartido,
					calendario: {
						idcalendario: item.vp_idcalendario,
						numfecha: item.vc_numfecha,
						fechapartido: item.vc_fechapartido,
						horapartido: item.vc_horapartido,
						observaciones: item.vc_observaciones,
						usuario: item.vc_usuario,
						fechareg: item.vc_fechareg,
						estado: item.vc_estado,
					},
					campeonato: {
						idcampeonato: item.vp_idcampeonato,
						codigo: item.vca_codigo,
						nombre: item.vca_nombre,
						periodo: item.vca_periodo,
						fechareg: item.vca_fechareg,
						estado: item.vca_estado,
						creadopor: item.vca_creadopor,
						observaciones: item.vca_observaciones,
					},
					serie: {
						idserie: item.vp_idserie,
					},
					estado: item.vp_estado,
				},
				equipo: {
					idequipo: item.vr_idequipo,
					nombre: item.ve_nombre,
					estado: item.ve_estado,
				},
				goles: item.vr_goles,
				estado: item.vr_estado,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _resultado.vr_id;
			delete _resultado.vr_idcalendario;
			delete _resultado.vr_idpartido;
			delete _resultado.vr_idequipo;
			delete _resultado.vr_goles;
			delete _resultado.vr_estado;
			delete _resultado.vcale_numfecha;
			delete _resultado.vcale_fechapartido;
			delete _resultado.vcale_horapartido;
			delete _resultado.vcale_observaciones;
			delete _resultado.vcale_usuario;
			delete _resultado.vcale_fechareg;
			delete _resultado.vcale_estado;
			delete _resultado.vp_idcalendario;
			delete _resultado.vp_idcampeonato;
			delete _resultado.vp_idserie;
			delete _resultado.vp_estado;
			delete _resultado.vc_numfecha;
			delete _resultado.vc_fechapartido;
			delete _resultado.vc_horapartido;
			delete _resultado.vc_observaciones;
			delete _resultado.vc_usuario;
			delete _resultado.vc_fechareg;
			delete _resultado.vc_estado;
			delete _resultado.vca_codigo;
			delete _resultado.vca_nombre;
			delete _resultado.vca_periodo;
			delete _resultado.vca_fechareg;
			delete _resultado.vca_estado;
			delete _resultado.vca_creadopor;
			delete _resultado.vca_observaciones;
			delete _resultado.ve_nombre;
			delete _resultado.ve_estado;

			_resultados.push(_resultado);
		});

		return _resultados;
	}
}
