import { Equipo } from '../equipo/equipo.class';
import { _equipo } from '../equipo/equipo.data';
import { Estadio } from '../estadio/estadio.class';
import { _estadio } from '../estadio/estadio.data';
import { Serie } from '../serie/serie.class';
import { _serie } from '../serie/serie.data';
import {
	view_calendario,
	view_calendario_specific_read,
} from './calendario.store';

export class Calendario {
	/** Attributes */
	public id?: number;
	public estadio?: Estadio;
	public serie?: Serie;
	public equipoa?: Equipo;
	public equipob?: Equipo;
	public numfecha?: number;
	public fechapartido?: string;
	public horapartido?: string;
	public observaciones?: string;
	public usuario?: string;
	public fechareg?: string;
	public estado?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		estadio: Estadio = _estadio,
		serie: Serie = _serie,
		equipoa: Equipo = _equipo,
		equipob: Equipo = _equipo,
		numfecha: number = 0,
		fechapartido: string = '',
		horapartido: string = '',
		observaciones: string = '',
		usuario: string = '',
		fechareg: string = '',
		estado: string = ''
	) {
		this.id = id;
		this.estadio = estadio;
		this.serie = serie;
		this.equipoa = equipoa;
		this.equipob = equipob;
		this.numfecha = numfecha;
		this.fechapartido = fechapartido;
		this.horapartido = horapartido;
		this.observaciones = observaciones;
		this.usuario = usuario;
		this.fechareg = fechareg;
		this.estado = estado;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _estadio(estadio: Estadio) {
		this.estadio = estadio;
	}
	get _estadio() {
		return this.estadio!;
	}

	set _serie(serie: Serie) {
		this.serie = serie;
	}
	get _serie() {
		return this.serie!;
	}

	set _equipoa(equipoa: Equipo) {
		this.equipoa = equipoa;
	}
	get _equipoa() {
		return this.equipoa!;
	}

	set _equipob(equipob: Equipo) {
		this.equipob = equipob;
	}
	get _equipob() {
		return this.equipob!;
	}

	set _numfecha(numfecha: number) {
		this.numfecha = numfecha;
	}
	get _numfecha() {
		return this.numfecha!;
	}

	set _fechapartido(fechapartido: string) {
		this.fechapartido = fechapartido;
	}
	get _fechapartido() {
		return this.fechapartido!;
	}

	set _horapartido(horapartido: string) {
		this.horapartido = horapartido;
	}
	get _horapartido() {
		return this.horapartido!;
	}

	set _observaciones(observaciones: string) {
		this.observaciones = observaciones;
	}
	get _observaciones() {
		return this.observaciones!;
	}

	set _usuario(usuario: string) {
		this.usuario = usuario;
	}
	get _usuario() {
		return this.usuario!;
	}

	set _fechareg(fechareg: string) {
		this.fechareg = fechareg;
	}
	get _fechareg() {
		return this.fechareg!;
	}

	set _estado(estado: string) {
		this.estado = estado;
	}
	get _estado() {
		return this.estado!;
	}

	/** Methods */
	read() {
		return new Promise<Calendario[]>(async (resolve, reject) => {
			await view_calendario(this)
				.then((calendarios: Calendario[]) => {
					/**
					 * Mutate response
					 */
					const _calendarios = this.mutateResponse(calendarios);

					resolve(_calendarios);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Calendario>(async (resolve, reject) => {
			await view_calendario_specific_read(this)
				.then((calendarios: Calendario[]) => {
					/**
					 * Mutate response
					 */
					const _calendarios = this.mutateResponse(calendarios);

					resolve(_calendarios[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param calendarios
	 * @returns
	 */
	private mutateResponse(calendarios: Calendario[]): Calendario[] {
		let _calendarios: Calendario[] = [];

		calendarios.map((item: any) => {
			let _calendario: Calendario | any = {
				...item,
				estadio: {
					idestadio: item.vc_idestadio,
					nombre: item.ve_nombre,
					descripcion: item.ve_descripcion,
					estado: item.ve_estado,
				},
				serie: {
					idserie: item.vc_idserie,
					campeonato: {
						idcampeonato: item.vs_idcampeonato,
						codigo: item.vca_codigo,
						nombre: item.vca_nombre,
						periodo: item.vca_periodo,
						fechareg: item.vca_fechareg,
						estado: item.vca_estado,
						creadopor: item.vca_creadopor,
						observaciones: item.vca_observaciones,
					},
					codigo: item.vs_codigo,
					genero: item.vs_genero,
					descripcion: item.vs_descripcion,
					estado: item.vs_estado,
				},
				equipoa: {
					idequipo: item.vc_idequipoa,
					nombre: item.nombreequipoa,
					estado: item.estadoequipoa,
				},
				equipob: {
					idequipo: item.vc_idequipob,
					nombre: item.nombreequipob,
					estado: item.estadoequipob,
				},
				observaciones: item.vc_observaciones,
				fechareg: item.vc_fechareg,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _calendario.vc_idcalendario;
			delete _calendario.vc_idestadio;
			delete _calendario.vc_idserie;
			delete _calendario.vc_idequipoa;
			delete _calendario.vc_idequipob;
			delete _calendario.ve_nombre;
			delete _calendario.ve_descripcion;
			delete _calendario.ve_estado;
			delete _calendario.vs_idcampeonato;
			delete _calendario.vs_codigo;
			delete _calendario.vs_genero;
			delete _calendario.vs_descripcion;
			delete _calendario.vs_estado;
			delete _calendario.vca_codigo;
			delete _calendario.vca_nombre;
			delete _calendario.vca_periodo;
			delete _calendario.vca_fechareg;
			delete _calendario.vca_estado;
			delete _calendario.vca_creadopor;
			delete _calendario.vca_observaciones;
			delete _calendario.nombreequipoa;
			delete _calendario.estadoequipoa;
			delete _calendario.nombreequipob;
			delete _calendario.estadoequipob;

			_calendarios.push(_calendario);
		});

		return _calendarios;
	}
}
