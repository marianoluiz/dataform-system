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
        , e_name
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // get the values from the passed object
    const personalInfoValues = [
      newStudent.sex_id, newStudent.cstat_id, newStudent.cit_id, newStudent.cit_acq_id, newStudent.l_name, newStudent.f_name, newStudent.m_name, newStudent.e_name, newStudent.dob, newStudent.pob, newStudent.height, newStudent.weight, newStudent.blood_type, newStudent.gsis_no, newStudent.pagibig_id, newStudent.philhealth_id, newStudent.sss_no, newStudent.tin, newStudent.agency_empno
    ];


    connection.query(personalInfoQuery, personalInfoValues, (err: Error | null, result: any) => {
      if(err) {
        console.error("Failed to fetch students");
          return reject(err);
      } else {
        console.log(`personalInfo added of ${newStudent.l_name}`);
        resolve(result.insertId); // insertid property gets the generated id from mysql
      }
    });

  })
 



}

export const updatePersonalInfo = async (connection: Connection, student: StudentInfo): Promise<void> => {
  return new Promise((resolve, reject) => {
    const personalInfoQuery = `
      UPDATE TABLE personal_info
         SET sex_id = ?
         , cstat_id = ?
         , cit_id = ?
         , cit_acq_id = ?
         , l_name = ?
         , f_name = ?
         , m_name = ?
         , e_name = ?
         , dob = ?
         , pob = ?
         , height = ?
         , weight = ?
         , blood_type = ?
         , gsis_no = ?
         , pagibig_id = ?
         , philhealth_id = ?
         , sss_no = ?
         , tin = ?
         , agency_empno = ?
       WHERE p_id = ?
    `;

    // get the values from the passed object
    const personalInfoValues = [
      student.sex_id, student.cstat_id, student.cit_id, student.cit_acq_id, student.l_name, student.f_name, student.m_name, student.e_name, student.dob, student.pob, student.height, student.weight, student.blood_type, student.gsis_no, student.pagibig_id, student.philhealth_id, student.sss_no, student.tin, student.agency_empno, student.p_id
    ];

    connection.query(personalInfoQuery, personalInfoValues, (err: Error | null, result: any) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      } else {
        resolve();
      }
    });


  });
}

export const deletePersonalInfo = async (p_id: number, connection: Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
    
    const deleteQuery = `
      DELETE FROM personal_info
       WHERE p_id = ?
    `;

    connection.query(deleteQuery, [p_id], (err) => {
      if (err) {
        console.error("Failed to delete personal info");
        reject(err);
      } else {
        resolve();
      }
    })

  })

}