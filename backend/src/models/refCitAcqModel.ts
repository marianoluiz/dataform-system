import { pool } from "../config/database";

// get citizenship acquisition description using citizenship id
export const getCitAcqDesc = (cit_acq_id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT cit_acq_desc from ref_cit_acq
       WHERE cit_acq_id = ?
    `;

    const queryValue = [cit_acq_id];
    // the query defaultly returns [{json key: json pair}]
    // so i get the inner value inside these model functions here
    pool.query(query, queryValue,  (err: Error, result: {cit_acq_desc: string}[]) => {
      if (err) {
        console.error("Failed to get citizenship acquisition description");
        reject(err);
      } else {
        console.log("Successfully got citizenship acquisition description");
        resolve(result[0].cit_acq_desc);
      }

    });
  });
}

// get citizenship id description using citizenship acquisition
export const getCitAcqId = (cit_acq_desc: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT cit_acq_id from ref_cit_acq
       WHERE cit_acq_desc = ?
    `;

    const queryValue = [cit_acq_desc];
    // the query defaultly returns [{json key: json pair}]
    // so i get the inner value inside these model functions here
    pool.query(query, queryValue,  (err: Error, result: {cit_acq_id: number}[]) => {
      if (err) {
        console.error("Failed to get citizenship acquisition id");
        reject(err);
      } else {
        console.log("Successfully got citizenship acquisition id");
        resolve(result[0].cit_acq_id);
      }

    });
  });
}