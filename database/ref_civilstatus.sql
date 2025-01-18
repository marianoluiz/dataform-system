SELECT * FROM finalsinfoman.ref_civilstatus;

INSERT INTO finalsinfoman.ref_civilstatus (cstat_id, cstat_desc)
VALUES
  (1, 'Single')
, (2, 'Married')
, (3, 'Divorced')
, (4, 'Others');

UPDATE finalsinfoman.ref_civilstatus
SET cstat_desc = CONCAT(UPPER(SUBSTRING(cstat_desc, 1, 1)), LOWER(SUBSTRING(cstat_desc, 2)));