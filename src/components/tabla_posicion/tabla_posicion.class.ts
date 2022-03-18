import { Campeonato } from '../campeonato/campeonato.class';
import { _campeonato } from '../campeonato/campeonato.data';
import { Equipo } from '../equipo/equipo.class';
import { _equipo } from '../equipo/equipo.data';
import { Serie } from '../serie/serie.class';
import { _serie } from '../serie/serie.data';
import {
	view_tabla_posicion,
	view_tabla_posicion_specific_read,
} from './tabla_posicion.store';

export class TablaPosicion {
	/** Attributes */
	public id?: number;
	public equipo?: Equipo;
	public campeonato?: Campeonato;
	public serie?: Serie;
	public pj?: number;
	public pg?: number;
	public pp?: number;
	public pe?: number;
	public gf?: number;
	public gc?: number;
	public gd?: number;
	public puntos?: number;
	/** Constructor */
	constructor(
		id: number = 0,
		equipo: Equipo = _equipo,
		campeonato: Campeonato = _campeonato,
		serie: Serie = _serie,
		pj: number = 0,
		pg: number = 0,
		pp: number = 0,
		pe: number = 0,
		gf: number = 0,
		gc: number = 0,
		gd: number = 0,
		puntos: number = 0
	) {
		this.id = id;
		this.equipo = equipo;
		this.campeonato = campeonato;
		this.serie = serie;
		this.pj = pj;
		this.pg = pg;
		this.pp = pp;
		this.pe = pe;
		this.gf = gf;
		this.gc = gc;
		this.gd = gd;
		this.puntos = puntos;
	}
	/** Setters and Getters */
	set _id(id: number) {
		this.id = id;
	}
	get _id() {
		return this.id!;
	}

	set _equipo(equipo: Equipo) {
		this.equipo = equipo;
	}
	get _equipo() {
		return this.equipo!;
	}

	set _campeonato(campeonato: Campeonato) {
		this.campeonato = campeonato;
	}
	get _campeonato() {
		return this.campeonato!;
	}

	set _serie(serie: Serie) {
		this.serie = serie;
	}
	get _serie() {
		return this.serie!;
	}

	set _pj(pj: number) {
		this.pj = pj;
	}
	get _pj() {
		return this.pj!;
	}

	set _pg(pg: number) {
		this.pg = pg;
	}
	get _pg() {
		return this.pg!;
	}

	set _pp(pp: number) {
		this.pp = pp;
	}
	get _pp() {
		return this.pp!;
	}

	set _pe(pe: number) {
		this.pe = pe;
	}
	get _pe() {
		return this.pe!;
	}

	set _gf(gf: number) {
		this.gf = gf;
	}
	get _gf() {
		return this.gf!;
	}

	set _gc(gc: number) {
		this.gc = gc;
	}
	get _gc() {
		return this.gc!;
	}

	set _gd(gd: number) {
		this.gd = gd;
	}
	get _gd() {
		return this.gd!;
	}

	set _puntos(puntos: number) {
		this.puntos = puntos;
	}
	get _puntos() {
		return this.puntos!;
	}

	/** Methods */
	read() {
		return new Promise<TablaPosicion[]>(async (resolve, reject) => {
			await view_tabla_posicion(this)
				.then((tablaPosicions: TablaPosicion[]) => {
					resolve(tablaPosicions);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	specificRead() {
		return new Promise<TablaPosicion>(async (resolve, reject) => {
			await view_tabla_posicion_specific_read(this)
				.then((tablaPosicions: TablaPosicion[]) => {
					resolve(tablaPosicions[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	/**
	 * Eliminar ids de entidades externas y formatear la informacion en el esquema correspondiente
	 * @param tablaPosicions
	 * @returns
	 */
	private mutateResponse(tablaPosicions: TablaPosicion[]): TablaPosicion[] {
		let _tablaPosicions: TablaPosicion[] = [];

		tablaPosicions.map((item: any) => {
			let _tablaPosicion: TablaPosicion | any = {
				...item,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _tablaPosicion.id_preparacion_academica;

			_tablaPosicions.push(_tablaPosicion);
		});

		return _tablaPosicions;
	}
}
