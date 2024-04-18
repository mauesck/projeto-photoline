create database photoline;

use photoline;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

create table users (
	id int auto_increment primary key,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto text,
	descricao TEXT CHARACTER SET utf8mb4
);

create table postagem (
	id int auto_increment primary key,
    imagem text not null,
    descricao text,
    user_id int,
    foreign key (user_id) references users(id)
);

select * from users;

alter table users modify descricao text character set utf8mb4;

delete from users where id in (1,2,5);
