const pool = require('./../config/database');

export interface ContactInfo {
  contact_id: number;
  p_id: number;
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
}

const getContactInfos = async (): Promise<ContactInfo[]> => {

  try {
    const [ rows ] = await pool.query("SELECT * FROM contact_info");

    console.log("rows ", rows);
    return rows as ContactInfo[];

  } catch (err) {
    console.error("Error fetching contact infos: ", err);
    throw err;
  }

}