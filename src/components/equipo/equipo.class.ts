import { Serie } from '../serie/serie.class';
import { _serie } from '../serie/serie.data';
import { view_equipo, view_equipo_specific_read } from './equipo.store';

export class Equipo {
	/** Attributes */
	public id?: number;
	public serie?: Serie;
	public nombre?: string;
	public estado?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		serie: Serie = _serie,
		nombre: string = '',
		estado: string = ''
	) {
		this.id = id;
		this.serie = serie;
		this.nombre = nombre;
		this.estado = estado;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _serie(serie: Serie) {
		this.serie = serie;
	}
	get _serie() {
		return this.serie!;
	}

	set _nombre(nombre: string) {
		this.nombre = nombre;
	}
	get _nombre() {
		return this.nombre!;
	}

	set _estado(estado: string) {
		this.estado = estado;
	}
	get _estado() {
		return this.estado!;
	}

	/** Methods */
	read() {
		return new Promise<Equipo[]>(async (resolve, reject) => {
			await view_equipo(this)
				.then((equipos: Equipo[]) => {
					resolve(equipos);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Equipo>(async (resolve, reject) => {
			await view_equipo_specific_read(this)
				.then((equipos: Equipo[]) => {
					resolve(equipos[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param equipos
	 * @returns
	 */
	private mutateResponse(equipos: Equipo[]): Equipo[] {
		let _equipos: Equipo[] = [];

		equipos.map((item: any) => {
			let _equipo: Equipo | any = {
				...item,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _equipo.id_preparacion_academica;

			_equipos.push(_equipo);
		});

		return _equipos;
	}
}
