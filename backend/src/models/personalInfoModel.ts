import { Connection } from "mysql";
import { StudentInfo } from "./studentModel";

// this is called from studentModel
export const addPersonalInfo = async (connection: Connection, newStudent: StudentInfo): Promise<number> => {
  return new Promise((resolve, reject) => {
    // query template
    const personalInfoQuery = `
      INSERT INTO personal_info (
        sex_id
        , cstat_id
        , cit_id
        , cit_acq_id
        , l_name
        , f_name
        , m_name
        , dob
        , pob
        , height
        , weight
        , blood_type
        , gsis_no
        , pagibig_id
        , philhealth_id
        , sss_no
        , tin
        , agency_empno 
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // get the values from the passed object
    const personalInfoValues = [
      newStudent.sex_id, newStudent.cstat_id, newStudent.cit_id, newStudent.cit_acq_id, newStudent.l_name, newStudent.f_name, newStudent.m_name, newStudent.dob, newStudent.pob, newStudent.height, newStudent.weight, newStudent.blood_type, newStudent.gsis_no, newStudent.pagibig_id, newStudent.philhealth_id, newStudent.sss_no, newStudent.tin, newStudent.agency_empno
    ];


    connection.query(personalInfoQuery, personalInfoValues, (err: Error | null, result: any) => {
      if(err) {
        console.error("Failed to fetch students");
          return reject(err);
      } else {
        resolve(result.insertId); // insertid property gets the generated id from mysql
      }
    });

  })
 



}