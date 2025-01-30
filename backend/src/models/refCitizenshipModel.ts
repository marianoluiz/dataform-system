import { pool } from "../config/database";

// get citizenship description using citizenship id
export const getCitizenshipDesc = (cit_id: number): Promise<string> => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT cit_desc FROM ref_citizenship
       WHERE cit_id = ?
    `;

    const queryValue = [cit_id];

    // the query defaultly returns [{json key: json pair}]
    // so i get the inner value inside these model functions here
    pool.query(query, queryValue, (err: Error, result: {cit_desc: string}[]) => {
      if (err) {
        console.error(`Failed to get citizenship description`);
        reject(err);
      } else {
        console.log(`Successfuly got citizenship description`);
        resolve(result[0].cit_desc);
      }
    })
  });
}  


// get citizenship id using citizenship description
export const getCitizenshipId = (cit_desc: string): Promise<number> => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT cit_id FROM ref_citizenship
       WHERE cit_desc = ?
    `;

    const queryValue = [cit_desc];

    // the query defaultly returns [{json key: json pair}]
    // so i get the inner value inside these model functions here
    pool.query(query, queryValue, (err: Error, result: {cit_id: number}[]) => {
      if (err) {
        console.error(`Failed to get citizenship id`);
        reject(err);
      } else {
        console.log(`Successfuly got citizenship id`);
        resolve(result[0].cit_id);
      }
    })
  });
}  