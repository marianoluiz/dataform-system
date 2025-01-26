-- finalsinfoman backend
SELECT * FROM personal_info;

ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';

-- joined query the all
SELECT
  pi.*,
  ci.*,
  fb.*
FROM
  personal_info pi
LEFT JOIN
  contact_info ci ON pi.p_id = ci.p_id
LEFT JOIN
  family_background fb ON pi.p_id = fb.p_id;

-- change personal_info pk to ai

ALTER TABLE personal_info
MODIFY COLUMN p_id INT NOT NULL AUTO_INCREMENT;

DESCRIBE family_background;
DESCRIBE contact_info;

SHOW CREATE TABLE family_background;
SHOW CREATE TABLE family_children;
SHOW CREATE TABLE contact_info;
SHOW CREATE TABLE personal_info;

-- drop the fk constraint first before i can alter the pk
ALTER TABLE family_background DROP FOREIGN KEY fk1_p_id;
ALTER TABLE family_children DROP FOREIGN KEY fk2_p_id;
ALTER TABLE contact_info DROP FOREIGN KEY fk3_p_id;

-- create the foreign key constraints back
ALTER TABLE family_background
ADD CONSTRAINT fk1_p_id
FOREIGN KEY (p_id) REFERENCES personal_info(p_id);

ALTER TABLE family_children
ADD CONSTRAINT fk2_p_id
FOREIGN KEY (p_id) REFERENCES personal_info(p_id);

ALTER TABLE contact_info
ADD CONSTRAINT fk3_p_id
FOREIGN KEY (p_id) REFERENCES personal_info(p_id);

-- check constraint? asside from show create table
SELECT
  CONSTRAINT_NAME,
  TABLE_NAME,
  COLUMN_NAME,
  REFERENCED_TABLE_NAME,
  REFERENCED_COLUMN_NAME
FROM
  INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
  TABLE_NAME = 'family_background' AND
  TABLE_SCHEMA = 'finalsinfoman' AND
  REFERENCED_TABLE_NAME IS NOT NULL;

SELECT * FROM personal_info;
SELECT * FROM family_background;
SELECT * FROM contact_info;
SELECT * FROM family_children;

ALTER TABLE personal_info
  ADD COLUMN e_name VARCHAR(50);
  
ALTER TABLE personal_info
MODIFY COLUMN e_name VARCHAR(50) AFTER m_name;

ALTER TABLE family_background
ADD COLUMN mother_mn_ename VARCHAR(50) AFTER mother_mn_mname;

DELETE FROM personal_info 
 WHERE p_id = 202334008;

DESCRIBE personal_info;

ALTER TABLE personal_info
 DROP INDEX agency_empno_UNIQUE;
 
ALTER TABLE family_children
MODIFY COLUMN fam_ch_id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE contact_info
MODIFY COLUMN contact_id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE family_background
MODIFY COLUMN fam_bg_id INT NOT NULL AUTO_INCREMENT;