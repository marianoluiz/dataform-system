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
          resolve();
        }
      });
    });


}