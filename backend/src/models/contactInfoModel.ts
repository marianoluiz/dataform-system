import { Connection } from "mysql";
import { StudentInfo } from "./studentModel";

// this is called from studentModel
export const addContactInfo = (p_id: number, connection: Connection, newStudent: StudentInfo): Promise<void> => {
  return new Promise((resolve, reject) => {
    // query template
    const contactInfoQuery = `
      INSERT INTO contact_info (
        p_id, res_house_no, res_house_street, res_village, res_bgy, res_citymun, res_prov, res_zipcode, perm_house_no, perm_house_street, perm_village, perm_bgy, perm_citymun, perm_prov, perm_zipcode, tel_no, mobile_no, email_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const contactInfoValues = [
      p_id, newStudent.res_house_no, newStudent.res_house_street, newStudent.res_village, newStudent.res_bgy, newStudent.res_citymun, newStudent.res_prov, newStudent.res_zipcode, newStudent.perm_house_no, newStudent.perm_house_street, newStudent.perm_village, newStudent.perm_bgy, newStudent.perm_citymun, newStudent.perm_prov, newStudent.perm_zipcode, newStudent.tel_no, newStudent.mobile_no, newStudent.email_address
    ];

    connection.query(contactInfoQuery, contactInfoValues, (err: Error | null, result: any) => {
        if (err) {
          reject(err);
        } else {
          console.log(`ContactInfo added of ${p_id}`);
          resolve();
        }
      });
    });


}


export const updateContactInfo = (connection: Connection, student: StudentInfo): Promise<void> => {
  return new Promise((resolve, reject) => {

    const contactInfoQuery = `
      UPDATE family_background
         SET res_house_no = ?
         , res_house_street = ?
         , res_village = ?
         , res_bgy = ?
         , res_citymun = ?
         , res_prov = ?
         , res_zipcode = ?
         , perm_house_no = ?
         , perm_house_street = ?
         , perm_village = ?
         , perm_bgy = ?
         , perm_citymun = ?
         , perm_prov = ?
         , perm_zipcode = ?
         , tel_no = ?
         , mobile_no = ?
         , email_address = ?
       WHERE p_id = ?
    `;

    const contactInfoValues = [
      student.res_house_no, student.res_house_street, student.res_village, student.res_bgy, student.res_citymun, student.res_prov, student.res_zipcode, student.perm_house_no, student.perm_house_street, student.perm_village, student.perm_bgy, student.perm_citymun, student.perm_prov, student.perm_zipcode, student.tel_no, student.mobile_no, student.email_address, student.p_id
    ];

    connection.query(contactInfoQuery, contactInfoValues, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })

  });
}

export const deleteContactInfo = async (p_id: number, connection: Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
    
    const deleteQuery = `
      DELETE FROM contact_info
       WHERE p_id = ?
    `;

    connection.query(deleteQuery, [p_id], (err) => {
      if (err) {
        console.error("Failed to delete contact info");
        reject(err);
      } else {
        resolve();
      }
    })

  })

}