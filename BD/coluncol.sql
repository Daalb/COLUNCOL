#CREATE SCHEMA `new_schema` ;
use temporal; 

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

CREATE TABLE Docente (
  id_persona INT(3) NOT NULL,
  nivel_de_est VARCHAR(45) NOT NULL,
  especialidad VARCHAR(45) NULL,
  rol VARCHAR(45) NULL,
  PRIMARY KEY (id_persona),
  UNIQUE INDEX id_persona_UNIQUE (id_persona ASC)
  ) ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Do_Co (
  id_docente INT NOT NULL,
  id_colegio INT NOT NULL,
  PRIMARY KEY (id_docente, id_colegio),
  FOREIGN KEY (id_docente) REFERENCES Docente (id_persona),
  FOREIGN KEY (id_colegio) REFERENCES temporal.Colegio (id_colegio)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Area(
  id_area INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  id_director INT NOT NULL,
  id_colegio INT NOT NULL,
  PRIMARY KEY (id_area),
  FOREIGN KEY (id_director) REFERENCES Docente (id_persona),
  FOREIGN KEY (id_colegio) REFERENCES temporal.Colegio (id_colegio)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Asignatura (
  id_asignatura INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  Horas INT NOT NULL,
  id_area INT NOT NULL,
  PRIMARY KEY (id_asignatura),
  FOREIGN KEY (id_area) REFERENCES Area(id_area),
  UNIQUE INDEX id_area_UNIQUE (id_area ASC)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Bloques_Educativos (
  id_slot INT NOT NULL,
  hora_inicio time,
  hora_fin time,
  tipo VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_slot)
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

CREATE TABLE col_per(
  id_colegio INT NOT NULL,
  id_persona INT NOT NULL,
  PRIMARY KEY (id_colegio, id_persona),
  FOREIGN KEY (id_colegio) REFERENCES Colegio (id_colegio),
  FOREIGN KEY (id_persona) REFERENCES Persona (id_persona)
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
  UNIQUE INDEX id_area_UNIQUE (id_persona ASC),
  FOREIGN KEY (num_cuenta) REFERENCES Cuenta_Bancaria (num_cuenta)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;

CREATE TABLE Administrativos (
  id_persona INT NOT NULL,
  cargo VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_persona)
)ENGINE = InnoDB DEFAULT CHARACTER SET = latin1;









