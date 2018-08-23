use marketplace_db;

INSERT INTO community (community_name) VALUES ('Cars');
INSERT INTO community (community_name) VALUES ('Electronics');
INSERT INTO community (community_name) VALUES ('Housing');
INSERT INTO community (community_name) VALUES ('Jobs');


INSERT INTO posts (post_title, post_body, post_sold, community_id) VALUES ('Toyota 4Runner For Sale!', 'I have a like new 2018 Toyota 4Runner for sale!  $34,000!  2 inch lift and off road tires included!', 0, 1);