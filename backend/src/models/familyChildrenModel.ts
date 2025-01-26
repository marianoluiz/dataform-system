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
          reject(err);
        } else {
          resolve();
        }
      });

  });
}