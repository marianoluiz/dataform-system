import { Connection } from 'mysql';
import { pool } from '../config/database';
import { addPersonalInfo } from './personalInfoModel';
import { addFamilyChildren, FamilyChildren } from './familyChildrenModel';
import { addFamilyBackground } from './familyBackgroundModel';
import { addContactInfo } from './contactInfoModel';

export interface StudentInfo {
  // personal info
  p_id?: number; // db is auto increment so this no need
  sex_id: number;
  cstat_id: number;
  cit_id: number;
  cit_acq_id: number;
  l_name: string;
  f_name: string;
  m_name: string;
  dob: Date;
  pob: string;
  height: number;
  weight: number;
  blood_type: string;
  gsis_no: string;
  pagibig_id: string;
  philhealth_id: string;
  sss_no: string;
  tin: string;
  agency_empno: string;

  // contact info
  contact_id: number;
  res_house_no: string;
  res_house_street: string;
  res_village: string;
  res_bgy: string;
  res_citymun: string;
  res_prov :string;
  res_zipcode :string;
  perm_house_no :string;
  perm_house_street :string;
  perm_village :string;
  perm_bgy :string;
  perm_citymun :string;
  perm_prov :string;
  perm_zipcode :string;
  tel_no :string;
  mobile_no :string;
  email_address :string;

  // family bg
  spouse_lname: string;
  spouse_fname: string;
  spouse_mname: string;
  spouse_occupation: string;
  spouse_employer: string;
  spouse_emp_address: string;
  father_lname: string;
  father_fname: string;
  father_mname: string;
  mother_mn_lname: string;
  mother_mn_fname: string;
  mother_mn_mname: string;

  children?: FamilyChildren[]; // array of family children
}

// mysql library, the query method does not natively support async/await

export const getStudents = (): Promise<StudentInfo[]> => {
  return new Promise((resolve, reject) => {
    // gets all students (left) then the contact info of 
    // them and fam bg (might be null since the left table 
    // is the most important)

    const query = `
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
    `;
    
    // callback in query
    pool.query(query, (err: Error | null, result: StudentInfo[]) => { 
      if(err) {
        console.error("Failed to fetch students");
        reject(err)
      } else {
        resolve(result)
      }

    });
  });

}

export const addNewStudent = (newStudent: StudentInfo): Promise<void> => {
  
  return new Promise((resolve, reject) => {
    
    // need to get connection again since 
    // since accord to docs, 
    // Simple transaction support is available at the connection level
    pool.getConnection((err: Error | null, connection: Connection) => {
        if (err) {
          console.error("Failed to connect with the database");
          reject(err);
          return;
        }

        // I read the docs & stackoverflow for this, bascially there are 2 ways,
        // sql transaction or this npm lib transaction thing
        connection.beginTransaction( async (transactionErr) => {
          if (transactionErr) { 
            console.error("Failed to start transaction");
            throw transactionErr; 
          }

          try {
            // adds student and expect the primary key, use await cuz this is not a query
            const p_id = await addPersonalInfo(connection, newStudent);
            await addFamilyBackground(p_id, connection, newStudent);
            await addContactInfo(p_id, connection, newStudent);
            await addFamilyChildren(p_id, connection, newStudent.children);

            connection.commit((commitErr) => {
              if (commitErr) {
                connection.rollback(() => {
                  connection.end(); // release
                  console.error("Failed to commit transaction");
                  return reject(commitErr);
                });
              }
              connection.end(); // release
              resolve();
            });

          } catch (err) {
              connection.rollback(() => {
              connection.end(); // release
              console.error("Failed to add new student");
              reject(err);
            });
          }



        })

    })

  })
}

export const updateStudent = async (): Promise<void> => {
  
}

export const removeStudent = async (): Promise<void> => {

}

