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
					resolve(resultados);
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
					resolve(resultados[0]);
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
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _resultado.id_preparacion_academica;

			_resultados.push(_resultado);
		});

		return _resultados;
	}
}
