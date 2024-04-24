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
    descricao TEXT CHARACTER SET utf8mb4,
    user_id int,
    user_name VARCHAR(255), 
    foreign key (user_id) references users(id)
);

create table curtidas (
	id int auto_increment primary key,
    user_id int,
    post_id int,
    foreign key (user_id) references users(id) on update cascade on delete cascade,
    foreign key (post_id) references postagem(id) on update cascade on delete cascade
);

select * from users;

ALTER TABLE postagem
ADD CONSTRAINT curtidas_ibfk_2 FOREIGN KEY (post_id) REFERENCES postagem(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE curtidas DROP FOREIGN KEY curtidas_ibfk_2;

alter table postagem modify descricao TEXT CHARACTER SET utf8mb4;

select * from curtidas where post_id = 6;

alter table users modify descricao text character set utf8mb4;

delete from users where id in (1,2,5);
