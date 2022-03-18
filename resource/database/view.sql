ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

-- View: view_amonestacion
-- DROP VIEW view_amonestacion;
CREATE OR REPLACE VIEW view_amonestacion
 AS
 SELECT t.id,
    t.idjugador,
    t.tipotarjeta,
    t.estado,
    t.observaciones,
    t.fechareg,
    t.registradopor
   FROM amonestacion t
  ORDER BY t.id DESC;

-- View: view_calendario
-- DROP VIEW view_calendario;
CREATE OR REPLACE VIEW view_calendario
 AS
 SELECT t.id,
    t.idestadio,
    t.idserie,
    t.idequipoa,
    t.idequipob,
    t.numfecha,
    t.fechapartido,
    t.horapartido,
    t.observaciones,
    t.usuario,
    t.fechareg,
    t.estado
   FROM calendario t
  ORDER BY t.id DESC;

-- View: view_campeonato
-- DROP VIEW view_campeonato;
CREATE OR REPLACE VIEW view_campeonato
 AS
 SELECT t.id,
    t.codigo,
    t.nombre,
    t.periodo,
    t.fechareg,
    t.estado,
    t.creadopor,
    t.observaciones
   FROM campeonato t
  ORDER BY t.id DESC;

-- View: view_equipo
-- DROP VIEW view_equipo;
CREATE OR REPLACE VIEW view_equipo
 AS
 SELECT t.id,
    t.idserie,
    t.nombre,
    t.estado
   FROM equipo t
  ORDER BY t.id DESC;

-- View: view_estadio
-- DROP VIEW view_estadio;
CREATE OR REPLACE VIEW view_estadio
 AS
 SELECT t.id,
    t.nombre,
    t.descripcion,
    t.estado
   FROM estadio t
  ORDER BY t.id DESC;

-- View: view_jugador
-- DROP VIEW view_jugador;
CREATE OR REPLACE VIEW view_jugador
 AS
 SELECT t.id,
    t.cedula,
    t.idequipo,
    t.nombre,
    t.apellido,
    t.fechanac,
    t.telefono,
    t.direccion,
    t.estado
   FROM jugador t
  ORDER BY t.id DESC;

-- View: view_partido
-- DROP VIEW view_partido;
CREATE OR REPLACE VIEW view_partido
 AS
 SELECT t.id,
    t.idcalendario,
    t.idcampeonato,
    t.idserie,
    t.estado
   FROM partido t
  ORDER BY t.id DESC;

-- View: view_resultado
-- DROP VIEW view_resultado;
CREATE OR REPLACE VIEW view_resultado
 AS
 SELECT t.id,
    t.idcalendario,
    t.idpartido,
    t.idequipo,
    t.goles,
    t.estado
   FROM resultado t
  ORDER BY t.id DESC;

-- View: view_serie
-- DROP VIEW view_serie;
CREATE OR REPLACE VIEW view_serie
 AS
 SELECT t.id,
    t.idcampeonato,
    t.codigo,
    t.genero,
    t.descripcion,
    t.estado
   FROM serie t
  ORDER BY t.id DESC;

-- View: view_tabla_posicion
-- DROP VIEW view_tabla_posicion;
CREATE OR REPLACE VIEW view_tabla_posicion
 AS
 SELECT t.id,
    t.idequipo,
    t.idcampeonato,
    t.idserie,
    t.pj,
    t.pg,
    t.pp,
    t.pe,
    t.gf,
    t.gc,
    t.gd,
    t.puntos
   FROM tabla_posicion t
  ORDER BY t.id DESC;

-- View: view_tipouser
-- DROP VIEW view_tipouser;

CREATE OR REPLACE VIEW view_tipouser
 AS
 SELECT t.id,
    t.nombre,
    t.estado,
    t.descripcion
   FROM tipouser t
  ORDER BY t.id DESC;

-- View: view_usuario
-- DROP VIEW view_usuario;
CREATE OR REPLACE VIEW view_usuario
 AS
 SELECT t.id,
    t.cedula,
    t.nombres,
    t.nick,
    t.correo,
    t.password,
    t.estado,
    t.ulogin,
    t.tipouser,
    t.cargo,
    t.direccion,
    t.pe
   FROM usuario t
  ORDER BY t.id DESC;
