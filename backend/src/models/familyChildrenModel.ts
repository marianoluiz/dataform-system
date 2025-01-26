import { Connection } from "mysql";
import { StudentInfo } from "./studentModel";
import { resolveMx } from "dns";

// this is called from studentModel
export interface FamilyChildren {
  fam_ch_id?: number; // increment in db
  child_fullname: string;
  child_dob: Date;
}

export const addFamilyChildren = (p_id: number, connection: Connection, children: FamilyChildren[] | undefined): Promise<void> => {
  return new Promise((resolve, reject) => {
      const familyChildrenQuery = `
        INSERT INTO family_children (
          p_id, child_fullname, child_dob
        ) VALUES ?
      `;

      if (!children) {
        return reject(new Error("Children is undefined"));
      }
    
      // will have many array assigned to this var ( array is needed for the query(thats how it works in npm mysql))
      const familyChildrenValues = children.map(child => [
        p_id, child.child_fullname, child.child_dob
      ]);
      
      // need to pass the children values as array of an array of an array
        /* [
            [
              [202334010, 'Luna Maxwell', '2020-11-21'],
              [202334010, 'Maximus Blaze', '2023-05-30']
            ]
        ] 
          so i need to add an exterior bracket  
      */

      connection.query(familyChildrenQuery, [familyChildrenValues], (err: Error | null, result: any) => {
        if (err) {
          console.log("Failed to add children")
          reject(err);
        } else {
          console.log(`Family Children added of ${p_id}`);
          resolve();
        }
      });

  });
}


export const updateFamilyChildren = async (p_id: number, connection: Connection, children: FamilyChildren[] | undefined): Promise<void> => {
  await deleteFamilyChildren(p_id, connection);
  await addFamilyChildren(p_id, connection, children);
}

export const deleteFamilyChildren = async (p_id: number, connection: Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
    
    const deleteQuery = `
      DELETE FROM family_children
       WHERE p_id = ?
    `;

    connection.query(deleteQuery, [p_id], (err) => {
      if (err) {
        console.error("Failed to delete family children");
        reject(err);
      } else {
        resolve();
      }
    })

  })

}