import { Calendario } from '../calendario/calendario.class';
import { _calendario } from '../calendario/calendario.data';
import { Campeonato } from '../campeonato/campeonato.class';
import { _campeonato } from '../campeonato/campeonato.data';
import { view_partido, view_partido_specific_read } from './partido.store';

export class Partido {
	/** Attributes */
	public id?: number;
	public calendario?: Calendario;
	public campeonato?: Campeonato;
	public idserie?: number;
	public estado?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		calendario: Calendario = _calendario,
		campeonato: Campeonato = _campeonato,
		idserie: number = 0,
		estado: string = ''
	) {
		this.id = id;
		this.calendario = calendario;
		this.campeonato = campeonato;
		this.idserie = idserie;
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

	set _campeonato(campeonato: Campeonato) {
		this.campeonato = campeonato;
	}
	get _campeonato() {
		return this.campeonato!;
	}

	set _idserie(idserie: number) {
		this.idserie = idserie;
	}
	get _idserie() {
		return this.idserie!;
	}

	set _estado(estado: string) {
		this.estado = estado;
	}
	get _estado() {
		return this.estado!;
	}

	/** Methods */
	read() {
		return new Promise<Partido[]>(async (resolve, reject) => {
			await view_partido(this)
				.then((partidos: Partido[]) => {
					/**
					 * Mutate response
					 */
					const _partidos = this.mutateResponse(partidos);

					resolve(_partidos);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Partido>(async (resolve, reject) => {
			await view_partido_specific_read(this)
				.then((partidos: Partido[]) => {
					/**
					 * Mutate response
					 */
					const _partidos = this.mutateResponse(partidos);

					resolve(_partidos[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param partidos
	 * @returns
	 */
	private mutateResponse(partidos: Partido[]): Partido[] {
		let _partidos: Partido[] = [];

		partidos.map((item: any) => {
			let _partido: Partido | any = {
				...item,
				id: item.vp_id,
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
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _partido.vp_id;
			delete _partido.vp_idcalendario;
			delete _partido.vp_idcampeonato;
			delete _partido.vp_idserie;
			delete _partido.vp_estado;
			delete _partido.vc_numfecha;
			delete _partido.vc_fechapartido;
			delete _partido.vc_horapartido;
			delete _partido.vc_observaciones;
			delete _partido.vc_usuario;
			delete _partido.vc_fechareg;
			delete _partido.vc_estado;
			delete _partido.vca_codigo;
			delete _partido.vca_nombre;
			delete _partido.vca_periodo;
			delete _partido.vca_fechareg;
			delete _partido.vca_estado;
			delete _partido.vca_creadopor;
			delete _partido.vca_observaciones;

			_partidos.push(_partido);
		});

		return _partidos;
	}
}
