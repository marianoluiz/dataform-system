import { pool } from '../config/database';

export const getRefSexDesc = (sex_id: number) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT sex_desc FROM ref_sex
      WHERE sex_id = ?
    `;
    
    const value = [sex_id];

    pool.query(query, value, (err: Error, result: string) => {
      if (err) {
        console.error(`Failed to get sex desc`)
        reject(err);
        return;
      } else {
        console.log(`Successfuly got sex description`)
        resolve(result);
      }
      
    });

  });

}