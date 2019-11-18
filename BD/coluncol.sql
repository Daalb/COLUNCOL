#CREATE SCHEMA `new_schema` ;
use COLUNCOL; 

CREATE TABLE Registro_Colegio(
  id_Registro INT NOT NULL,
  estado VARCHAR(45) NOT NULL,
  fecha_asig DATE NOT NULL,
  fecha_fin DATE NULL,
  renovación VARCHAR(45) NULL,
  PRIMARY KEY (id_Registro),
  UNIQUE INDEX id_Registro_UNIQUE (id_Registro ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Colegio (
  id_colegio INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  siglas VARCHAR(45) NOT NULL,
  pag_web VARCHAR(45) NULL,
  correo VARCHAR(45) NOT NULL,
  id_registro INT NOT NULL,
  PRIMARY KEY (id_colegio),
  FOREIGN KEY (id_registro) REFERENCES Registro_Colegio (id_Registro),
  UNIQUE INDEX id_colegio_UNIQUE (id_colegio ASC),
  UNIQUE INDEX id_registro_UNIQUE (id_registro ASC)
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;
  
CREATE TABLE Sede (
  id_colegio INT NOT NULL,
  num_sede INT NOT NULL,
  ubcación_geo VARCHAR(45),
  PRIMARY KEY (id_colegio, num_sede),
  FOREIGN KEY (id_colegio) REFERENCES Colegio (id_colegio),
  UNIQUE INDEX num_sede_UNIQUE (num_sede ASC),
  UNIQUE INDEX id_colegio_UNIQUE (id_colegio ASC)
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Telefono_Sede (
  Id_telefono INT NOT NULL,
  num_telofono INT(10) NOT NULL,
  tipo VARCHAR(45) NOT NULL,
  id_colegio INT NOT NULL,
  num_sede INT NOT NULL,
  PRIMARY KEY (Id_telefono),
  FOREIGN KEY (id_colegio) REFERENCES Sede (id_colegio),
  FOREIGN KEY (num_sede) REFERENCES Sede (num_sede)
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Persona (
  id_persona INT NOT NULL,
  nombre1 VARCHAR(45) NOT NULL,
  nombre2 VARCHAR(45) NOT NULL,
  apellido1 VARCHAR(45) NOT NULL,
  apellido2 VARCHAR(45) NOT NULL,
  sexo VARCHAR(1) NOT NULL,
  PRIMARY KEY (id_persona),
  UNIQUE INDEX id_area_UNIQUE (id_persona ASC)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Cuenta_Bancaria (
  num_cuenta INT NOT NULL,
  entidad_bancaria VARCHAR(45) NOT NULL,
  PRIMARY KEY (num_cuenta)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Empleado (
  id_persona INT NOT NULL,
  salario_bruto INT NOT NULL,
  compensaciones INT NOT NULL,
  prestaciones INT NOT NULL,
  num_cuenta INT NOT NULL,
  PRIMARY KEY (id_persona),
  UNIQUE INDEX id_persona_UNIQUE (id_persona ASC),
  FOREIGN KEY (num_cuenta) REFERENCES Cuenta_Bancaria (num_cuenta),
  FOREIGN KEY (id_persona) REFERENCES Persona (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Docente (
  id_persona INT NOT NULL,
  nivel_de_est VARCHAR(45) NOT NULL,
  especialidad VARCHAR(45) NULL,
  rol VARCHAR(45) NULL,
  PRIMARY KEY (id_persona),
  FOREIGN KEY (id_persona) REFERENCES Empleado (id_persona),
  UNIQUE INDEX id_persona_UNIQUE (id_persona ASC)
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Do_Co (
  id_docente INT NOT NULL,
  id_colegio INT NOT NULL,
  PRIMARY KEY (id_docente, id_colegio),
  FOREIGN KEY (id_docente) REFERENCES Docente (id_persona),
  FOREIGN KEY (id_colegio) REFERENCES Colegio (id_colegio)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Area(
  id_area INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  id_director INT NOT NULL,
  id_colegio INT NOT NULL,
  PRIMARY KEY (id_area),
  FOREIGN KEY (id_director) REFERENCES Docente (id_persona),
  FOREIGN KEY (id_colegio) REFERENCES Colegio (id_colegio)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Asignatura (
  id_asignatura INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  Horas INT NOT NULL,
  id_area INT NOT NULL,
  PRIMARY KEY (id_asignatura),
  FOREIGN KEY (id_area) REFERENCES Area(id_area)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Bloques_Educativos (
  id_slot INT (1) NOT NULL,
  hora_inicio time,
  hora_fin time,
  tipo VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_slot),
  UNIQUE INDEX id_slot_UNIQUE (id_slot ASC)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Asg_Be (
  id_asignatura_be INT NOT NULL,
  id_slot_as INT NOT NULL,
  PRIMARY KEY (id_asignatura_be, id_slot_as),
  FOREIGN KEY (id_asignatura_be) REFERENCES Asignatura (id_asignatura),
  FOREIGN KEY (id_slot_as) REFERENCES Bloques_Educativos (id_slot)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Adscrito_a (
  id_area INT NOT NULL,
  id_profesor INT NOT NULL,
  PRIMARY KEY (id_area, id_profesor),
  FOREIGN KEY (id_area) REFERENCES Area (id_area),
  FOREIGN KEY (id_profesor) REFERENCES Docente (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Col_Per(
  id_colegio INT NOT NULL,
  id_persona INT NOT NULL,
  PRIMARY KEY (id_colegio, id_persona),
  FOREIGN KEY (id_colegio) REFERENCES Colegio (id_colegio),
  FOREIGN KEY (id_persona) REFERENCES Persona (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Administrativo (
  id_persona INT NOT NULL,
  cargo VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_persona),
  FOREIGN KEY (id_persona) REFERENCES Empleado (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Otros_Empleados(
	id_persona INT NOT NULL,
    cargo VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_persona),
	FOREIGN KEY (id_persona) REFERENCES Empleado (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Informacion_Medica(
	id_reportemedico INT NOT NULL,
    tipo_sangre VARCHAR(3) NOT NULL,
    entidad_salud VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_reportemedico)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Condiciones_Medicas(
	nombre VARCHAR(45) NOT NULL,
    tipo VARCHAR(45) NOT NULL,
    PRIMARY KEY (nombre)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Im_Cm(
  nombre VARCHAR(45) NOT NULL,
  id_reportemedico INT NOT NULL,
  PRIMARY KEY (nombre,id_reportemedico),
  FOREIGN KEY (nombre) REFERENCES Condiciones_Medicas (nombre),
  FOREIGN KEY (id_reportemedico) REFERENCES Informacion_Medica (id_reportemedico)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Grado(
	id_grado INT NOT NULL,
    nivel_institucional VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_grado)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Salon(
	id_salon INT NOT NULL,
    capacidad INT(2),
    id_colegio INT NOT NULL,
    PRIMARY KEY (id_salon),
    FOREIGN KEY (id_colegio) REFERENCES Colegio (id_colegio),
    UNIQUE INDEX id_salon_UNIQUE (id_salon ASC)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Curso(
	id_curso INT NOT NULL,
    num_estudiantes INT(2),
    id_salon INT NOT NULL,
    id_grado INT NOT NULL,
    id_persona_docente INT NOT NULL,
    PRIMARY KEY (id_curso),
    FOREIGN KEY (id_salon) REFERENCES Salon (id_salon),
    FOREIGN KEY (id_grado) REFERENCES Grado (id_grado),
    FOREIGN KEY (id_persona_docente) REFERENCES Docente (id_persona),
    UNIQUE INDEX id_salon_UNIQUE (id_salon ASC)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Estudiante(
	id_persona INT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    id_reportemedico INT NOT NULL,
    id_curso INT NOT NULL,
    PRIMARY KEY (id_persona),
    FOREIGN KEY (id_reportemedico) REFERENCES Informacion_Medica (id_reportemedico),
    UNIQUE INDEX id_reportemedico_UNIQUE (id_reportemedico ASC),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso),
	FOREIGN KEY (id_persona) REFERENCES Persona (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Historial_Disciplina(
id_historial INT NOT NULL,
id_colegio INT NOT NULL,
fecha_inicio DATE NOT NULL,
fecha_fin DATE,
detalle VARCHAR(45) NOT NULL,
PRIMARY KEY (id_historial)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Es_Dis(
	id_estudiante INT NOT NULL ,
    id_historial INT NOT NULL,
    PRIMARY KEY (id_estudiante,id_historial),
    FOREIGN KEY (id_historial) REFERENCES Historial_Disciplina (id_historial),
    FOREIGN KEY (id_estudiante) REFERENCES Estudiante (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Acudiente(
	id_persona INT NOT NULL,
    ocupacion VARCHAR(45) NOT NULL,
    parentesco VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_persona),
    UNIQUE INDEX id_persona_UNIQUE (id_persona ASC),
	FOREIGN KEY (id_persona) REFERENCES Persona (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Tel_Acudiente(
	id_tel INT NOT NULL,
    num_tel INT(10),
    tipo VARCHAR(30),
    vigencia VARCHAR(2),
    id_persona_acudiente INT NOT NULL,
    PRIMARY KEY (id_tel),
    FOREIGN KEY (id_persona_acudiente) REFERENCES Acudiente (id_persona),
    UNIQUE INDEX id_tel_UNIQUE (id_tel ASC)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Horario(
	id_horario INT NOT NULL,
    id_grado INT NOT NULL,
    id_asignatura INT NOT NULL,
    id_slot INT NOT NULL,
    PRIMARY KEY (id_horario),
    FOREIGN KEY (id_grado) REFERENCES Grado (id_grado),
    FOREIGN KEY (id_asignatura) REFERENCES Asignatura (id_asignatura),
    FOREIGN KEY (id_slot) REFERENCES Bloques_Educativos (id_slot),
    UNIQUE INDEX id_grado_UNIQUE (id_grado ASC)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Cambio_Colegio(
	id_registro INT NOT NULL,
    id_colegio INT NOT NULL,
    id_colegio_nue INT NOT NULL,
    id_estudiante INT NOT NULL,
    fecha_ingreso DATE NOT NULL,
    PRIMARY KEY (id_registro,id_colegio,id_colegio_nue,id_estudiante)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Tarifa(
	id_colegio INT NOT NULL,
    id_tarifa INT NOT NULL,
    valor INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    id_grado INT NOT NULL,
    PRIMARY KEY (id_colegio,id_tarifa),
    FOREIGN KEY (id_grado) REFERENCES Grado (id_grado)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Pension(
	id_colegio INT NOT NULL,
    id_pension INT NOT NULL,
    valor INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    id_grado INT NOT NULL,
    PRIMARY KEY (id_colegio,id_pension),
    FOREIGN KEY (id_grado) REFERENCES Grado (id_grado)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Ingresos_Varios(
	id_colegio INT NOT NULL,
    id_ingreso INT NOT NULL,
    nombre_ingreso VARCHAR(45) NOT NULL,
    valor INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    id_grado INT NOT NULL,
    PRIMARY KEY (id_colegio,id_ingreso),
    FOREIGN KEY (id_grado) REFERENCES Grado (id_grado)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

CREATE TABLE Planilla_Nota(
	id_colegio INT NOT NULL,
    id_curso INT NOT NULL,
    id_persona_docente INT NOT NULL,
    id_asignatura INT NOT NULL,
    num_nota INT NOT NULL,
    nota FLOAT NOT NULL,
    PRIMARY KEY (id_colegio,id_curso,id_persona_docente,id_asignatura,num_nota)
)ENGINE = InnoDB DEFAULT CHARACTER SET =latin1;

