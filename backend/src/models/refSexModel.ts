import { pool } from '../config/database';

// get sex desc using id of sex
export const getRefSexDesc = (sex_id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT sex_desc FROM ref_sex
       WHERE sex_id = ?
    `;
    
    const queryValue = [sex_id];
    // the query defaultly returns [{json key: json pair}]
    // so i get the inner value inside these model functions here
    pool.query(query, queryValue, (err: Error, result: { sex_desc: string }[]) => {
      if (err) {
        console.error(`Failed to get sex desc`)
        reject(err);
      } else {
        console.log(`Successfuly got sex description`)
        resolve(result[0].sex_desc);
      }
      
    });

  });

}