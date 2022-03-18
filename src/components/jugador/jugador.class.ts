import { Equipo } from '../equipo/equipo.class';
import { _equipo } from '../equipo/equipo.data';
import { view_jugador, view_jugador_specific_read } from './jugador.store';

export class Jugador {
	/** Attributes */
	public id?: number;
	public cedula?: string;
	public equipo?: Equipo;
	public nombre?: string;
	public apellido?: string;
	public fechanac?: string;
	public telefono?: string;
	public direccion?: string;
	public estado?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		cedula: string = '',
		equipo: Equipo = _equipo,
		nombre: string = '',
		apellido: string = '',
		fechanac: string = '',
		telefono: string = '',
		direccion: string = '',
		estado: string = ''
	) {
		this.id = id;
		this.cedula = cedula;
		this.equipo = equipo;
		this.nombre = nombre;
		this.apellido = apellido;
		this.fechanac = fechanac;
		this.telefono = telefono;
		this.direccion = direccion;
		this.estado = estado;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _cedula(cedula: string) {
		this.cedula = cedula;
	}
	get _cedula() {
		return this.cedula!;
	}

	set _equipo(equipo: Equipo) {
		this.equipo = equipo;
	}
	get _equipo() {
		return this.equipo!;
	}

	set _nombre(nombre: string) {
		this.nombre = nombre;
	}
	get _nombre() {
		return this.nombre!;
	}

	set _apellido(apellido: string) {
		this.apellido = apellido;
	}
	get _apellido() {
		return this.apellido!;
	}

	set _fechanac(fechanac: string) {
		this.fechanac = fechanac;
	}
	get _fechanac() {
		return this.fechanac!;
	}

	set _telefono(telefono: string) {
		this.telefono = telefono;
	}
	get _telefono() {
		return this.telefono!;
	}

	set _direccion(direccion: string) {
		this.direccion = direccion;
	}
	get _direccion() {
		return this.direccion!;
	}

	set _estado(estado: string) {
		this.estado = estado;
	}
	get _estado() {
		return this.estado!;
	}

	/** Methods */
	read() {
		return new Promise<Jugador[]>(async (resolve, reject) => {
			await view_jugador(this)
				.then((jugadors: Jugador[]) => {
					resolve(jugadors);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Jugador>(async (resolve, reject) => {
			await view_jugador_specific_read(this)
				.then((jugadors: Jugador[]) => {
					resolve(jugadors[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param jugadors
	 * @returns
	 */
	private mutateResponse(jugadors: Jugador[]): Jugador[] {
		let _jugadors: Jugador[] = [];

		jugadors.map((item: any) => {
			let _jugador: Jugador | any = {
				...item,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _jugador.id_preparacion_academica;

			_jugadors.push(_jugador);
		});

		return _jugadors;
	}
}
