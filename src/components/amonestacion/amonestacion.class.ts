import { Jugador } from '../jugador/jugador.class';
import { _jugador } from '../jugador/jugador.data';
import {
	view_amonestacion,
	view_amonestacion_specific_read,
} from './amonestacion.store';

export class Amonestacion {
	/** Attributes */
	public id?: number;
	public jugador?: Jugador;
	public tipotarjeta?: string;
	public estado?: string;
	public observaciones?: string;
	public fechareg?: string;
	public registradopor?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		jugador: Jugador = _jugador,
		tipotarjeta: string = '',
		estado: string = '',
		observaciones: string = '',
		fechareg: string = '',
		registradopor: string = ''
	) {
		this.id = id;
		this.jugador = jugador;
		this.tipotarjeta = tipotarjeta;
		this.estado = estado;
		this.observaciones = observaciones;
		this.fechareg = fechareg;
		this.registradopor = registradopor;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _jugador(jugador: Jugador) {
		this.jugador = jugador;
	}
	get _jugador() {
		return this.jugador!;
	}

	set _tipotarjeta(tipotarjeta: string) {
		this.tipotarjeta = tipotarjeta;
	}
	get _tipotarjeta() {
		return this.tipotarjeta!;
	}

	set _estado(estado: string) {
		this.estado = estado;
	}
	get _estado() {
		return this.estado!;
	}

	set _observaciones(observaciones: string) {
		this.observaciones = observaciones;
	}
	get _observaciones() {
		return this.observaciones!;
	}

	set _fechareg(fechareg: string) {
		this.fechareg = fechareg;
	}
	get _fechareg() {
		return this.fechareg!;
	}

	set _registradopor(registradopor: string) {
		this.registradopor = registradopor;
	}
	get _registradopor() {
		return this.registradopor!;
	}

	/** Methods */
	read() {
		return new Promise<Amonestacion[]>(async (resolve, reject) => {
			await view_amonestacion(this)
				.then((amonestacions: Amonestacion[]) => {
					/**
					 * Mutate response
					 */
					const _amonestacions = this.mutateResponse(amonestacions);

					resolve(_amonestacions);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Amonestacion>(async (resolve, reject) => {
			await view_amonestacion_specific_read(this)
				.then((amonestacions: Amonestacion[]) => {
					/**
					 * Mutate response
					 */
					const _amonestacions = this.mutateResponse(amonestacions);

					resolve(_amonestacions[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param amonestacions
	 * @returns
	 */
	private mutateResponse(amonestacions: Amonestacion[]): Amonestacion[] {
		let _amonestacions: Amonestacion[] = [];

		amonestacions.map((item: any) => {
			let _amonestacion: Amonestacion | any = {
				...item,
				id: item.va_id,
				jugador: {
					idjugador: item.va_idjugador,
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
				},
				tipotarjeta: item.va_tipotarjeta,
				estado: item.va_estado,
				observaciones: item.va_observaciones,
				fechareg: item.va_fechareg,
				registradopor: item.va_registradopor,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _amonestacion.va_id;
			delete _amonestacion.va_idjugador;
			delete _amonestacion.vj_cedula;
			delete _amonestacion.vj_idequipo;
			delete _amonestacion.vj_nombre;
			delete _amonestacion.vj_apellido;
			delete _amonestacion.vj_fechanac;
			delete _amonestacion.vj_telefono;
			delete _amonestacion.vj_direccion;
			delete _amonestacion.vj_estado;

			delete _amonestacion.va_tipotarjeta;
			delete _amonestacion.va_estado;
			delete _amonestacion.va_observaciones;
			delete _amonestacion.va_fechareg;
			delete _amonestacion.va_registradopor;

			delete _amonestacion.ve_idserie;
			delete _amonestacion.ve_nombre;
			delete _amonestacion.ve_estado;
			delete _amonestacion.vs_idcampeonato;
			delete _amonestacion.vs_codigo;
			delete _amonestacion.vs_genero;
			delete _amonestacion.vs_descripcion;
			delete _amonestacion.vs_estado;

			delete _amonestacion.vc_codigo;
			delete _amonestacion.vc_nombre;
			delete _amonestacion.vc_periodo;
			delete _amonestacion.vc_fechareg;
			delete _amonestacion.vc_estado;
			delete _amonestacion.vc_creadopor;
			delete _amonestacion.vc_observaciones;

			_amonestacions.push(_amonestacion);
		});

		return _amonestacions;
	}
}
