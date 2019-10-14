
create table if not exists Atendimento
(
	id int auto_increment
		primary key,
	idMedico int not null,
	idPaciente int not null,
	data datetime null,
	parecer text null
);

create index idx_medico
	on Atendimento (idMedico);

create index idx_paciente
	on Atendimento (idPaciente);

create table if not exists AtendimentoItens
(
	id int auto_increment
		primary key,
	idAtendimento int not null,
	idMedicamento int not null
);

create index idx_atendimento
	on AtendimentoItens (idAtendimento);

create index idx_medicamento
	on AtendimentoItens (idMedicamento);

create table if not exists ControleInsert
(
	id int unique not null ,
	insertsFeitos tinyint(1) default 0 null
);

insert ignore into ControleInsert set id = 1 and insertsFeitos = false;

create table if not exists InteracaoMedicamentos
(
	id int auto_increment
		primary key,
	farmaco1 varchar(255) null,
	farmaco2 varchar(255) null,
	gravidade varchar(255) null,
	descricao text null
);

create index idx_farmaco1
	on InteracaoMedicamentos (farmaco1);

create index idx_farmaco2
	on InteracaoMedicamentos (farmaco2);

create table if not exists Medicamento
(
	id int auto_increment
		primary key,
	nome varchar(255) not null,
	descricao text null,
	viaAdministracao varchar(255) not null
);

create table if not exists Pessoa
(
	id int auto_increment
		primary key,
	nome varchar(255) not null,
	documento varchar(11) not null,
	medico tinyint(1) default 0 not null
);

create index idx_medicos
	on Pessoa (medico);

create table if not exists VinculoMedicamentoFarmaco
(
	id int auto_increment
		primary key,
	idMedicamento varchar(255) null,
	farmaco varchar(255) null
);

create index idx_medicamento
	on VinculoMedicamentoFarmaco (idMedicamento);

