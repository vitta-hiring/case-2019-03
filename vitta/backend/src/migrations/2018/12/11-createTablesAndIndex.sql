DROP TABLE IF EXISTS Pessoa;
CREATE TABLE Pessoa
(
       id        integer PRIMARY KEY auto_increment,
       nome      varchar(255) not null,
       documento varchar(11)  not null,
       medico    boolean      not null default false
);

CREATE INDEX idx_medicos on Pessoa(medico);


DROP TABLE IF EXISTS Medicamento;
CREATE TABLE Medicamento
(
       id        integer PRIMARY KEY auto_increment,
       nome      varchar(255) not null
);

DROP TABLE IF EXISTS VinculoMedicamentoFarmaco;
CREATE TABLE VinculoMedicamentoFarmaco
(
       id        integer PRIMARY KEY auto_increment,
       idMedicamento      varchar(255),
       farmaco            varchar(255)
);
create index idx_medicamento on VinculoMedicamentoFarmaco(idMedicamento);


DROP TABLE IF EXISTS InteracaoMedicamentos;
CREATE TABLE InteracaoMedicamentos
(
       id        integer PRIMARY KEY auto_increment,
       farmaco1  varchar(255),
       farmaco2  varchar(255),
       gravidade varchar(255),
       descricao varchar(255)
);

create index idx_farmaco1 on InteracaoMedicamentos(farmaco1);
create index idx_farmaco2 on InteracaoMedicamentos(farmaco2);


DROP TABLE IF EXISTS Atendimento;
CREATE TABLE Atendimento
(
       id         integer PRIMARY KEY auto_increment,
       idMedico   integer not null,
       idPaciente integer not null,
       data       datetime
);
create index idx_medico on Atendimento(idMedico);
create index idx_paciente on Atendimento(idPaciente);




DROP TABLE IF EXISTS AtendimentoItens;
create table AtendimentoItens
(
       id            integer PRIMARY KEY auto_increment,
       idAtendimento integer not null,
       idMedicamento integer not null
);

create index idx_medicamento on AtendimentoItens(idMedicamento);
create index idx_atendimento on AtendimentoItens(idAtendimento);

drop table if exists ControleInsert;
create table ControleInsert
(
    id integer,
    insertsFeitos boolean default false
);


insert into ControleInsert set id = 1, insertsFeitos = false;


