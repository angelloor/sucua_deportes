import { Campeonato } from '../campeonato/campeonato.class';
import { _campeonato } from '../campeonato/campeonato.data';
import { view_serie, view_serie_specific_read } from './serie.store';

export class Serie {
	/** Attributes */
	public id?: number;
	public campeonato?: Campeonato;
	public codigo?: string;
	public genero?: string;
	public descripcion?: string;
	public estado?: string;
	/** Constructor */
	constructor(
		id: number = 0,
		campeonato: Campeonato = _campeonato,
		codigo: string = '',
		genero: string = '',
		descripcion: string = '',
		estado: string = ''
	) {
		this.id = id;
		this.campeonato = campeonato;
		this.codigo = codigo;
		this.genero = genero;
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

	set _campeonato(campeonato: Campeonato) {
		this.campeonato = campeonato;
	}
	get _campeonato() {
		return this.campeonato!;
	}

	set _codigo(codigo: string) {
		this.codigo = codigo;
	}
	get _codigo() {
		return this.codigo!;
	}

	set _genero(genero: string) {
		this.genero = genero;
	}
	get _genero() {
		return this.genero!;
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
		return new Promise<Serie[]>(async (resolve, reject) => {
			await view_serie(this)
				.then((series: Serie[]) => {
					/**
					 * Mutate response
					 */
					const _series = this.mutateResponse(series);

					resolve(_series);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<Serie>(async (resolve, reject) => {
			await view_serie_specific_read(this)
				.then((series: Serie[]) => {
					/**
					 * Mutate response
					 */
					const _series = this.mutateResponse(series);

					resolve(_series[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param series
	 * @returns
	 */
	private mutateResponse(series: Serie[]): Serie[] {
		let _series: Serie[] = [];

		series.map((item: any) => {
			let _serie: Serie | any = {
				...item,
				id: item.vs_id,
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
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _serie.vs_id;
			delete _serie.vs_idcampeonato;
			delete _serie.vs_codigo;
			delete _serie.vs_genero;
			delete _serie.vs_descripcion;
			delete _serie.vs_estado;
			delete _serie.vc_codigo;
			delete _serie.vc_nombre;
			delete _serie.vc_periodo;
			delete _serie.vc_fechareg;
			delete _serie.vc_estado;
			delete _serie.vc_creadopor;
			delete _serie.vc_observaciones;

			_series.push(_serie);
		});

		return _series;
	}
}
