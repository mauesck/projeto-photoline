create database photoline;

use photoline;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

create table users (
	id int auto_increment primary key,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

create table perfil (
	id int auto_increment primary key,
    foto text,
    descricao text,
    user_id int,
    foreign key (user_id) references users(id)
);

create table postagem (
	id int auto_increment primary key,
    imagem text not null,
    descricao text,
    user_id int,
    foreign key (user_id) references users(id)
);

drop table postagem;

select * from users;