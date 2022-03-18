import {
	view_campeonato,
	view_campeonato_specific_read,
} from './campeonato.store';

export class Campeonato {
	/** Attributes */
	public id?: number;
	public codigo?: string;
	public nombre?: string;
	public periodo?: string;
	public fechareg?: string;
	public estado?: string;
	public creadopor?: string;
	public observaciones?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		codigo: string = '',
		nombre: string = '',
		periodo: string = '',
		fechareg: string = '',
		estado: string = '',
		creadopor: string = '',
		observaciones: string = ''
	) {
		this.id = id;
		this.codigo = codigo;
		this.nombre = nombre;
		this.periodo = periodo;
		this.fechareg = fechareg;
		this.estado = estado;
		this.creadopor = creadopor;
		this.observaciones = observaciones;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _codigo(codigo: string) {
		this.codigo = codigo;
	}
	get _codigo() {
		return this.codigo!;
	}

	set _nombre(nombre: string) {
		this.nombre = nombre;
	}
	get _nombre() {
		return this.nombre!;
	}

	set _periodo(periodo: string) {
		this.periodo = periodo;
	}
	get _periodo() {
		return this.periodo!;
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

	set _creadopor(creadopor: string) {
		this.creadopor = creadopor;
	}
	get _creadopor() {
		return this.creadopor!;
	}

	set _observaciones(observaciones: string) {
		this.observaciones = observaciones;
	}
	get _observaciones() {
		return this.observaciones!;
	}

	/** Methods */
	read() {
		return new Promise<Campeonato[]>(async (resolve, reject) => {
			await view_campeonato(this)
				.then((campeonatos: Campeonato[]) => {
					resolve(campeonatos);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Campeonato>(async (resolve, reject) => {
			await view_campeonato_specific_read(this)
				.then((campeonatos: Campeonato[]) => {
					resolve(campeonatos[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param campeonatos
	 * @returns
	 */
	private mutateResponse(campeonatos: Campeonato[]): Campeonato[] {
		let _campeonatos: Campeonato[] = [];

		campeonatos.map((item: any) => {
			let _campeonato: Campeonato | any = {
				...item,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _campeonato.id_preparacion_academica;

			_campeonatos.push(_campeonato);
		});

		return _campeonatos;
	}
}
