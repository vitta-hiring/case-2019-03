create table if not exists medicamento
(
 idt_medicamento serial not null,
 des_nome_medicamento varchar(255) not null,
 des_farmaco varchar(255),
 des_concentracao integer,
 des_unidade varchar(255),
 des_tipo_medicamento varchar(255),
 des_forma_farmaceutica varchar(255),
 des_via_administracao varchar(255) not null,
 cod_atc varchar(255),
 flg_uso_interno smallint DEFAULT 0,
 flg_antimicrobiano smallint DEFAULT 0,
 des_url_bula varchar(255),
 des_portaria varchar(255),
 flg_controle_especial smallint DEFAULT 0,
 des_tiss varchar(255),
 flg_mip smallint DEFAULT 0,
 des_label varchar(255),
 des_unificado varchar(255),
 constraint medicamento_pkey
  primary key (idt_medicamento)
);
CREATE INDEX medicamento_idx01
  ON medicamento (des_nome_medicamento);

create table if not exists medico
(
 idt_medico serial not null,
 des_nome_medico varchar(255) not null,
 des_crm varchar(255),
 constraint medico_pkey
  primary key (idt_medico)
);
CREATE INDEX medico_idx01
  ON medico (des_crm);

create table if not exists paciente
(
 idt_paciente serial not null,
 des_paciente varchar(255) not null,
 des_cpf varchar(255),
 constraint paciente_pkey
  primary key (idt_paciente)
);
CREATE INDEX paciente_idx01
  ON paciente (des_cpf);

CREATE SEQUENCE sq_medicamento_idt START 2;
CREATE SEQUENCE sq_medico_idt START 1;
CREATE SEQUENCE sq_paciente_idt START 1;
CREATE SEQUENCE sq_prescricao_idt START 1;
CREATE SEQUENCE sq_prescmedicamento_idt START 1;

create table if not exists prescricao_medicamento
(
 idt_prescricao_medicamento serial not null,
 idt_medicamento integer not null,
 qtd_medicamento integer not null,
 constraint prescmedicamento_pkey
  primary key (idt_prescricao_medicamento)
);

ALTER TABLE vitta.prescricao_medicamento ADD CONSTRAINT pres_medicamento_fk FOREIGN KEY (idt_medicamento) REFERENCES vitta.medicamento (idt_medicamento);

create table if not exists prescricao
(
 idt_prescricao serial not null,
 idt_medico integer not null,
 idt_paciente integer not null,
 idt_prescricao_medicamento integer not null,
 dat_create           timestamp,
 dat_update           timestamp,
 constraint prescricaomed_pkey
  primary key (idt_prescricao)
);

ALTER TABLE vitta.prescricao ADD CONSTRAINT prescricao_medico_fk FOREIGN KEY (idt_medico) REFERENCES vitta.medico (idt_medico);
ALTER TABLE vitta.prescricao ADD CONSTRAINT prescricao_paciente_fk FOREIGN KEY (idt_paciente) REFERENCES vitta.paciente (idt_paciente);
ALTER TABLE vitta.prescricao ADD CONSTRAINT prescricao_prescmed_fk FOREIGN KEY (idt_prescricao_medicamento) REFERENCES vitta.prescricao_medicamento (idt_prescricao_medicamento);

create table if not exists interacao_medicamentosa
(
 idt_interacao_medicamentosa serial not null,
 des_farmaco1 varchar(255) not null,
 des_farmaco2 varchar(255) not null,
 nom_interacao_medicamentosa varchar(255) not null,
 des_interacao_medicamentosa varchar(255) not null,
 constraint interacaomedic_pkey
  primary key (idt_interacao_medicamentosa)
);

CREATE SEQUENCE sq_interacaomedic_idt START 1;
