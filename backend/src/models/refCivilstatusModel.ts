import { pool } from '../config/database';

// convert civil status id to civil status desc
export const getCivilstatusDesc = (cstat_id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
      const query= `
        SELECT cstat_desc from ref_civilstatus
         WHERE cstat_id = ?
      `;

      const queryValue = [cstat_id];

      // the query defaultly returns [{json key: json pair}]
      // so i get the inner value inside these model functions here
      pool.query(query, queryValue, (err: Error, result: {cstat_desc: string}[]) => {
        if (err) {
          console.error(`Failed to get civilstatus descrioption`)
          reject(err);
        } else {
          console.log(`Successfuly got civilstatus description`)
          resolve(result[0].cstat_desc);
        }
      })

  });
}

// convert civil status desc to civil status id
export const getCivilstatusId = (cstat_desc: string): Promise<number> => {
  return new Promise((resolve, reject) => {
      const query= `
        SELECT cstat_id from ref_civilstatus
         WHERE cstat_desc = ?
      `;

      const queryValue = [cstat_desc];

      // the query defaultly returns [{json key: json pair}]
      // so i get the inner value inside these model functions here
      pool.query(query, queryValue, (err: Error, result: {cstat_id: number}[]) => {
        if (err) {
          console.error(`Failed to get civilstatus id`)
          reject(err);
        } else {
          console.log(`Successfuly got civilstatus id`)
          resolve(result[0].cstat_id);
        }
      })

  });
}