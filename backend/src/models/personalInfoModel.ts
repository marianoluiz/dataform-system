
// interfaces used as blueprints for objects.
export interface PersonalInfo {
  p_id: number;
  sex_id: number;
  cstat_id: number;
  cit_id: number;
  cit_acq_id: number;
  l_name: string;
  f_name: string;
  m_name: string;
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
}

export const getPersonalInfos = async (): Promise<PersonalInfo[]> => {
  // Promise<PersonalInfo[]> means the function resolves to an array of objects
  // where each object adheres to the structure defined by the PersonalInfo interface.

  
};