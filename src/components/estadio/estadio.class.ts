import { view_estadio, view_estadio_specific_read } from './estadio.store';

export class Estadio {
	/** Attributes */
	public id?: number;
	public nombre?: string;
	public descripcion?: string;
	public estado?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		nombre: string = '',
		descripcion: string = '',
		estado: string = ''
	) {
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.estado = estado;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _nombre(nombre: string) {
		this.nombre = nombre;
	}
	get _nombre() {
		return this.nombre!;
	}

	set _descripcion(descripcion: string) {
		this.descripcion = descripcion;
	}
	get _descripcion() {
		return this.descripcion!;
	}

	set _estado(estado: string) {
		this.estado = estado;
	}
	get _estado() {
		return this.estado!;
	}

	/** Methods */
	read() {
		return new Promise<Estadio[]>(async (resolve, reject) => {
			await view_estadio(this)
				.then((estadios: Estadio[]) => {
					/**
					 * Mutate response
					 */
					const _estadios = this.mutateResponse(estadios);

					resolve(_estadios);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Estadio>(async (resolve, reject) => {
			await view_estadio_specific_read(this)
				.then((estadios: Estadio[]) => {
					/**
					 * Mutate response
					 */
					const _estadios = this.mutateResponse(estadios);

					resolve(_estadios[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param estadios
	 * @returns
	 */
	private mutateResponse(estadios: Estadio[]): Estadio[] {
		let _estadios: Estadio[] = [];

		estadios.map((item: any) => {
			let _estadio: Estadio | any = {
				...item,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _estadio.id_preparacion_academica;

			_estadios.push(_estadio);
		});

		return _estadios;
	}
}
