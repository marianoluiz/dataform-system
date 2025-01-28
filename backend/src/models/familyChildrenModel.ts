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
      // need to insert p_id to know who is the owner of the child
      const familyChildrenQuery = `
        INSERT INTO family_children (
          p_id, child_fullname, child_dob
        ) VALUES ?
      `;

      if (!children || children.length === 0) {
        console.log(`No children to add for ${p_id}`);
        return resolve(); // Resolve the promise if children is undefined or empty
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
          return reject(err);
        } else {
          console.log(`Family Children of ${p_id} added`);
          resolve();
        }
      });

  });
}


export const updateFamilyChildren = async (p_id: number, connection: Connection, children: FamilyChildren[] | undefined): Promise<void> => {
  try {
    await deleteFamilyChildren(p_id, connection);
    await addFamilyChildren(p_id, connection, children);
    console.log(`Family Children of ${p_id} updated`);
  } catch (err) {
    console.error(`Failed to update Family Children of ${p_id}:`, err);
    throw err; // Re-throw the error to be handled by the caller
  }
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
        return reject(err);
      } else {
        console.log(`Family Children of ${p_id} deleted`);
        resolve();
      }
    })

  })

}