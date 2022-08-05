-- create "trazapan" database
CREATE DATABASE trazapan;

-- create "empleados" table
CREATE TABLE empleados(
  cedula varchar(255) not null,
  nombre varchar(255) not null,
  apellido varchar(255) not null,
  fechaNacimiento varchar(50) not null,
  direccion varchar(50) not null,
  correo varchar(255) not null,
  sexo varchar(50) not null,
  estado varchar(50) not null,
  cargo varchar(50) not null,
  salario int not null,
  contrasena varchar(255) not null,
  primary key(cedula)
);

-- create "referencias" table
CREATE TABLE referencias(
  identificacion varchar(255) not null,
  nombreProducto varchar(255) not null,
  linea int not null,
  primary key(identificacion)
);

-- create "maquinarias" table
CREATE TABLE maquinarias(
  codigo varchar(255) not null,
  nombre varchar(255) not null,
  estado varchar(50) not null,
  primary key(codigo)
);

-- create "lotes" table
CREATE TABLE lotes(
  codigoLote varchar(255) not null,
  idReferencias varchar(255) not null,
  idEmpleado varchar(255) not null,
  jornadaLaboral varchar(50) not null,
  linea int not null,
  fc_listo varchar(255) not null default 0,
  em_listo varchar(255) not null default 0,
  listo boolean not null,
  primary key(codigoLote),
  foreign key(idReferencias) references referencias(identificacion),
  foreign key(idEmpleado) references empleados(cedula)
);

-- create "embalajes" table
CREATE TABLE embalajes(
  id int not null auto_increment,
  idReferencia varchar(255) not null,
  idLote varchar(255) not null,
  udsPorCanastilla int not null,
  primary key(id),
  foreign key(idReferencia) references referencias(identificacion),
  foreign key(idLote) references lotes(codigoLote)
);

-- create "formadocrecimiento" table
CREATE TABLE formadocrecimiento(
  id int not null auto_increment,
  idLote varchar(255) not null,
  idMaquina varchar(255) not null,
  horaIngreso varchar(50) not null,
  temperatura float not null,
  humedad float not null,
  cantidades int not null,
  comentarios varchar(255) not null,
  primary key(id),
  foreign key(idLote) references lotes(codigoLote),
  foreign key(idMaquina) references maquinarias(codigo)
);

-- create "empaques" table
CREATE TABLE empaques(
  id int not null auto_increment,
  idLote varchar(255) not null,
  idMaquina varchar(255) not null,
  temperatura float not null,
  torresCanastillas int not null,
  canastas int not null,
  udsDefCrudas int not null,
  udsDefCortas int not null,
  udsDefDeformes int not null,
  udsDefQuemadas int not null,
  udsDefAplastadas int not null,
  udsDefPegadas int not null,
  udsDefSucias int not null,
  primary key(id),
  foreign key(idLote) references lotes(codigoLote),
  foreign key(idMaquina) references maquinarias(codigo)
);



-- ALGUNAS CONSULTAS

-- obtener  el codigo y la referencia de los lotes que ya están listo
SELECT l.codigoLote, r.nombreProducto FROM lotes AS l, referencias AS r WHERE l.idReferencias = r.identificacion AND l.listo = 1;

-- obtener el nombre del encargado, el nombre del producto, todo del lote, todo de formadocrecimiento, todo de empaques dado el codigo del lote
SELECT e.nombre, r.nombreProducto, l.*, f.*, eq.* FROM empleados AS e, lotes AS l, formadocrecimiento AS f, empaques AS eq, referencias AS r WHERE l.idEmpleado = e.cedula AND l.idReferencias = r.identificacion AND f.idLote = l.codigoLote AND eq.idLote = l.codigoLote AND l.listo = 1 AND l.codigoLote = "CL.6.23.2022.3";

-- obtener el nombre del encargado, el nombre del producto, todo del lote, todo de formadocrecimiento, todo de empaques de todos los lotes de producción
SELECT e.nombre, r.nombreProducto, l.*, f.*, eq.*, m.*  FROM empleados AS e, lotes AS l, formadocrecimiento AS f, empaques AS eq, referencias AS r , maquinarias AS m WHERE l.idEmpleado = e.cedula AND l.idReferencias = r.identificacion AND f.idLote = l.codigoLote AND eq.idLote = l.codigoLote AND l.listo = 1 AND eq.idMaquina = m.codigo;
