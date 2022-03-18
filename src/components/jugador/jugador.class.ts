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
					/**
					 * Mutate response
					 */
					const _jugadors = this.mutateResponse(jugadors);

					resolve(_jugadors);
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
					/**
					 * Mutate response
					 */
					const _jugadors = this.mutateResponse(jugadors);

					resolve(_jugadors[0]);
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
				id: item.vj_id,
				cedula: item.vj_cedula,
				equipo: {
					idequipo: item.vj_idequipo,
					serie: {
						idserie: item.ve_idserie,
						campeonato: {
							idcampeonato: item.vs_idcampeonato,
							codigo: item.vc_codigo,
							nombre: item.vc_nombre,
							periodo: item.vc_periodo,
							fechareg: item.vc_fechareg,
							estado: item.vc_estado,
							creadopor: item.vc_creadopor,
							observaciones: item.vc_observaciones,
						},
						codigo: item.vs_codigo,
						genero: item.vs_genero,
						descripcion: item.vs_descripcion,
						estado: item.vs_estado,
					},
					nombre: item.ve_nombre,
					estado: item.ve_estado,
				},
				nombre: item.vj_nombre,
				apellido: item.vj_apellido,
				fechanac: item.vj_fechanac,
				telefono: item.vj_telefono,
				direccion: item.vj_direccion,
				estado: item.vj_estado,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _jugador.vj_id;
			delete _jugador.vj_cedula;
			delete _jugador.vj_idequipo;
			delete _jugador.vj_nombre;
			delete _jugador.vj_apellido;
			delete _jugador.vj_fechanac;
			delete _jugador.vj_telefono;
			delete _jugador.vj_direccion;
			delete _jugador.vj_estado;
			delete _jugador.ve_idserie;
			delete _jugador.ve_nombre;
			delete _jugador.ve_estado;
			delete _jugador.vs_idcampeonato;
			delete _jugador.vs_codigo;
			delete _jugador.vs_genero;
			delete _jugador.vs_descripcion;
			delete _jugador.vs_estado;
			delete _jugador.vc_codigo;
			delete _jugador.vc_nombre;
			delete _jugador.vc_periodo;
			delete _jugador.vc_fechareg;
			delete _jugador.vc_estado;
			delete _jugador.vc_creadopor;
			delete _jugador.vc_observaciones;

			_jugadors.push(_jugador);
		});

		return _jugadors;
	}
}
