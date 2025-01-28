import { Connection } from 'mysql';
import { pool } from '../config/database';
import * as personalInfoModel from './personalInfoModel';
import * as familyChildrenModel from './familyChildrenModel';
import * as familyBackgroundModel from './familyBackgroundModel';
import * as contactInfoModel from './contactInfoModel';

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
  e_name: string;
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
  spouse_ename: string;
  spouse_occupation: string;
  spouse_employer: string;
  spouse_emp_address: string;
  father_lname: string;
  father_fname: string;
  father_mname: string;
  father_ename: string;
  mother_mn_lname: string;
  mother_mn_fname: string;
  mother_mn_mname: string;
  mother_mn_ename: string;

  children?: familyChildrenModel.FamilyChildren[]; // array of family children
}

// mysql library, the query method does not natively support async/await, i need the callback
// regret: i could have used a mysql transaction query instead of this


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
    pool.getConnection((err: Error | null, connection: any) => {
        if (err) {
          console.error("Failed to connect with the database");
          reject(err);
          return;
        }

        // I read the docs & stackoverflow for this, bascially there are 2 ways,
        // sql transaction or this npm lib transaction thing
        connection.beginTransaction( async (transactionErr: Error) => {
          if (transactionErr) { 
            console.error("Failed to start transaction");
            throw transactionErr; 
          }

          try {
            // adds student and expect the primary key, use await cuz this is not a query
            const p_id = await personalInfoModel.addPersonalInfo(connection, newStudent);
            await familyBackgroundModel.addFamilyBackground(p_id, connection, newStudent);
            await contactInfoModel.addContactInfo(p_id, connection, newStudent);
            await familyChildrenModel.addFamilyChildren(p_id, connection, newStudent.children);

            connection.commit((commitErr: Error) => {

              if (commitErr) {
                connection.rollback(() => {
                  connection.release(); // release
                  console.error("Failed to commit transaction");
                  return reject(commitErr);
                });
              }

              console.log(`Successfully finished add transaction of person with id: ${p_id}`);
              connection.release(); // release
              resolve();
            });

          } catch (err) {
              connection.rollback(() => {
              connection.release(); // release
              console.error(`Failed to add new student`);
              reject(err);
            });
          }



        })

    })

  })
}

export const updateStudent = (student: StudentInfo): Promise<void> => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: Error | null, connection: any) => {
            if (err) {
              console.log('Failed getting connection');
              reject(err);
              return;
            }

            // this must be async so that i can await
            connection.beginTransaction(async (transacErr: Error) => {
              
              if (transacErr) {
                console.error("Failed to start transaction");
                reject(transacErr)
              }

              try {

                await personalInfoModel.updatePersonalInfo(connection, student);
                await familyBackgroundModel.updateFamilyBackground(connection, student);
                await contactInfoModel.updateContactInfo(connection, student);
                // updateFamilyChildren inside this if else
                if (student.p_id !== undefined) {
                  await familyChildrenModel.updateFamilyChildren(student.p_id, connection, student.children);
                } else {
                  throw new Error("Student ID is undefined");
                }

                connection.commit((commitErr: Error) => {
                    if (commitErr) {
                      connection.rollback(() => {
                        connection.release(); // release
                        console.error("Failed to commit transaction");
                        return reject(commitErr);
                      });
                    }
                    connection.release(); // release
                    resolve();
                    console.log(`Successfully completed transaction of student with id ${student.p_id}`);
                  });

              } catch (err) {

                connection.rollback(() => {
                  connection.release(); // release
                  console.error("Failed to update student");
                  reject(err);
                });

              }

            })
        })
    });
}

export const removeStudent = async (p_id: number): Promise<void> => {
  return new Promise((resolve, reject) => {

    pool.getConnection((err: Error | null, connection: any) => {
      if (err) {
        console.log('Failed getting connection');
        reject(err);
        return;
      }
      
      connection.beginTransaction(async (transacErr: Error) => {
        
        if (transacErr) {
          console.error("Failed to start transaction");
          reject(transacErr)
        }

        try {

          await familyChildrenModel.deleteFamilyChildren(p_id, connection);
          await familyBackgroundModel.deleteFamilyBackground(p_id, connection);
          await contactInfoModel.deleteContactInfo(p_id, connection);
          await personalInfoModel.deletePersonalInfo(p_id, connection);

            connection.commit((commitErr: Error) => {
              if (commitErr) {
                connection.rollback(() => {
                  connection.release(); // release
                  console.error("Failed to commit transaction");
                  return reject(commitErr);
                });
              }
              connection.release();
              resolve();
            });

        } catch (err) {

          connection.rollback(() => {
            connection.release();
            console.error(`Failed to add delete student with id ${p_id}`);
            reject(err);
          });

        }

      })
    });


  });
}

