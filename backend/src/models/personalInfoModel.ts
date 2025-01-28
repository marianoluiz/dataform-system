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
        console.log(`Personal Info of ${result.insertId} added`);
        resolve(result.insertId); // insertid property gets the generated id from mysql
      }
    });

  })
 



}

export const updatePersonalInfo = async (connection: Connection, student: StudentInfo): Promise<void> => {
  return new Promise((resolve, reject) => {
    
    // to satisfy unique constraint of gsisno, etc.. we need to update only the ones that are needed
    // or else we will have error from updating stuffs but not changing the gsisno, etc.
    let newData: StudentInfo = student;

    // First, fetch the current data from the database to compare it
    connection.query(`SELECT * FROM personal_info WHERE p_id = ?`, [student.p_id], (err: Error | null, result: StudentInfo[]) => {
      // The connection.query to fetch currentData is asynchronous, 
      // meaning the flow won't wait for it to finish before continuing to the rest of the logic
      // it would result in null values if u do not nest the rest of the code here
      
      if (err) {
        console.error("Error fetching current data:", err);
        reject(err);
        return;
      }
      
      const currentData: StudentInfo = result[0]; // Assuming you get one result back

      const fieldsToUpdate = [];
      const updateValues = [];

      // Loop through the new data and compare it with the current data
      for (const field in newData) {
        if (field === "agency_empno") break; // stop at this field

        if (newData[field as keyof StudentInfo] !== currentData[field as keyof StudentInfo]) {
          // console.log('New data:', newData[field as keyof StudentInfo]);
          // console.log('Current data:', currentData[field as keyof StudentInfo]);
          
          fieldsToUpdate.push(`${field} = ?`);
          updateValues.push(newData[field as keyof StudentInfo]);
        }
      }

      // Add the p_id value to the end of the update values for the WHERE clause
      updateValues.push(student.p_id);
      
      if (fieldsToUpdate.length === 0) {
        console.log("No changes detected. No update needed.");
        resolve(); // No need to update if no changes
        return;
      }

      const personalInfoQuery = `
        UPDATE personal_info
        SET ${fieldsToUpdate.join(", ")}
        WHERE p_id = ?
      `;

      // console.log("Generated Query:", personalInfoQuery);
      // console.log("Update Values:", updateValues);

      // Execute the update query
      connection.query(personalInfoQuery, updateValues, (err: Error | null, result: any) => {
        if (err) {
          console.error("Error updating data:", err);
          reject(err);
          return;
        }

        console.log(`Personal Info of ${student.p_id} updated`);
        resolve();
      });
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
        console.log(`Personal Info of ${p_id} deleted`);
        resolve();
      }
    });

  });

}