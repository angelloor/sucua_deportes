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
					resolve(partidos);
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
					resolve(partidos[0]);
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
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _partido.id_preparacion_academica;

			_partidos.push(_partido);
		});

		return _partidos;
	}
}
