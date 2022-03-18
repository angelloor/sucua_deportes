import { Campeonato } from '../campeonato/campeonato.class';
import { _campeonato } from '../campeonato/campeonato.data';
import { Equipo } from '../equipo/equipo.class';
import { _equipo } from '../equipo/equipo.data';
import { Serie } from '../serie/serie.class';
import { _serie } from '../serie/serie.data';
import {
	view_tabla_posicion,
	view_tabla_posicion_by_serie_read,
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
					/**
					 * Mutate response
					 */
					const _tablaPosicions = this.mutateResponse(tablaPosicions);

					resolve(_tablaPosicions);
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
					/**
					 * Mutate response
					 */
					const _tablaPosicions = this.mutateResponse(tablaPosicions);

					resolve(_tablaPosicions[0]);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	bySerieRead() {
		return new Promise<TablaPosicion[]>(async (resolve, reject) => {
			await view_tabla_posicion_by_serie_read(this)
				.then((tablaPosicions: TablaPosicion[]) => {
					/**
					 * Mutate response
					 */
					const _tablaPosicions = this.mutateResponse(tablaPosicions);

					resolve(_tablaPosicions);
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
				id: item.vtp_id,
				equipo: {
					idequipo: item.vtp_idequipo,
					nombre: item.ve_nombre,
					estado: item.ve_estado,
				},
				campeonato: {
					idcampeonato: item.vtp_idcampeonato,
					codigo: item.vctp_codigo,
					nombre: item.vctp_nombre,
					periodo: item.vctp_periodo,
					fechareg: item.vctp_fechareg,
					estado: item.vctp_estado,
					creadopor: item.vctp_creadopor,
					observaciones: item.vctp_observaciones,
				},
				serie: {
					idserie: item.vtp_idserie,
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
				pj: item.vtp_pj,
				pg: item.vtp_pg,
				pp: item.vtp_pp,
				pe: item.vtp_pe,
				gf: item.vtp_gf,
				gc: item.vtp_gc,
				gd: item.vtp_gd,
				puntos: item.vtp_puntos,
				/**
				 * Generate structure of second level the entity (is important add the ids of entity)
				 * similar the return of read
				 */
			};
			/**
			 * delete ids of principal object level
			 */
			delete _tablaPosicion.vtp_id;
			delete _tablaPosicion.vtp_idequipo;
			delete _tablaPosicion.vtp_idcampeonato;
			delete _tablaPosicion.vtp_idserie;
			delete _tablaPosicion.vtp_pj;
			delete _tablaPosicion.vtp_pg;
			delete _tablaPosicion.vtp_pp;
			delete _tablaPosicion.vtp_pe;
			delete _tablaPosicion.vtp_gf;
			delete _tablaPosicion.vtp_gc;
			delete _tablaPosicion.vtp_gd;
			delete _tablaPosicion.vtp_puntos;
			delete _tablaPosicion.ve_nombre;
			delete _tablaPosicion.ve_estado;
			delete _tablaPosicion.vs_idcampeonato;
			delete _tablaPosicion.vs_codigo;
			delete _tablaPosicion.vs_genero;
			delete _tablaPosicion.vs_descripcion;
			delete _tablaPosicion.vs_estado;
			delete _tablaPosicion.vc_codigo;
			delete _tablaPosicion.vc_nombre;
			delete _tablaPosicion.vc_periodo;
			delete _tablaPosicion.vc_fechareg;
			delete _tablaPosicion.vc_estado;
			delete _tablaPosicion.vc_creadopor;
			delete _tablaPosicion.vc_observaciones;
			delete _tablaPosicion.vctp_codigo;
			delete _tablaPosicion.vctp_nombre;
			delete _tablaPosicion.vctp_periodo;
			delete _tablaPosicion.vctp_fechareg;
			delete _tablaPosicion.vctp_estado;
			delete _tablaPosicion.vctp_creadopor;
			delete _tablaPosicion.vctp_observaciones;

			_tablaPosicions.push(_tablaPosicion);
		});

		return _tablaPosicions;
	}
}
