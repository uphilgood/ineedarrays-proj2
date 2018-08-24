drop database marketplace_db;
CREATE DATABASE marketplace_db;
USE marketplace_db;

-- Create the table actors.
CREATE TABLE posts (
  id int AUTO_INCREMENT NOT NULL,
  post_title varchar(50) NOT NULL,
  post_body varchar(500) NOT NULL,
  post_sold boolean, 
  community_id int(10),
  PRIMARY KEY(id)
);

CREATE TABLE community (
  community_id int AUTO_INCREMENT,
  community_name varchar(50) NOT NULL,
  PRIMARY KEY(community_id)
);