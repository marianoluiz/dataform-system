SELECT * FROM finalsinfoman.ref_sex;

INSERT INTO ref_sex (sex_id, sex_desc)
VALUES
  (1, 'male')
, (2, 'female');

TRUNCATE TABLE ref_sex;

UPDATE ref_sex 
   SET sex_desc = 'm'
 WHERE sex_desc = 'male';

UPDATE ref_sex 
   SET sex_desc = 'f'
 WHERE sex_desc = 'female';