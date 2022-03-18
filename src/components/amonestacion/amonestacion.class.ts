import { Jugador } from '../jugador/jugador.class';
import { _jugador } from '../jugador/jugador.data';
import {
	view_amonestacion,
	view_amonestacion_specific_read
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
					resolve(amonestacions);
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
					resolve(amonestacions[0]);
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
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _amonestacion.id_preparacion_academica;

			_amonestacions.push(_amonestacion);
		});

		return _amonestacions;
	}
}
