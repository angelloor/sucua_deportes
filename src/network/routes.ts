import { routerAmonestacion } from '../components/amonestacion/amonestacion.network';
import { routerCalendario } from '../components/calendario/calendario.network';
import { routerCampeonato } from '../components/campeonato/campeonato.network';
import { routerEquipo } from '../components/equipo/equipo.network';
import { routerEstadio } from '../components/estadio/estadio.network';
import { routerJugador } from '../components/jugador/jugador.network';
import { routerPartido } from '../components/partido/partido.network';
import { routerResultado } from '../components/resultado/resultado.network';
import { routerSerie } from '../components/serie/serie.network';
import { routerTablaPosicion } from '../components/tabla_posicion/tabla_posicion.network';

export const appRoutes = (app: any) => {
	/**
	 * Components
	 */
	app.use('/components/serie', routerSerie);
	app.use('/components/equipo', routerEquipo);
	app.use('/components/jugador', routerJugador);
	app.use('/components/amonestacion', routerAmonestacion);
	app.use('/components/estadio', routerEstadio);
	app.use('/components/calendario', routerCalendario);
	app.use('/components/partido', routerPartido);
	app.use('/components/resultado', routerResultado);
	app.use('/components/tabla_posicion', routerTablaPosicion);
	app.use('/components/campeonato', routerCampeonato);
};
