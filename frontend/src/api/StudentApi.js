import apiClient from "./apiClient";

export const fetchStudentData = async () => {
  try {
    //code here
    /* const response = await apiClient.get("/personalinfo");
    return response.data; */
    const dummyData = [
      {
        cs_id: 20230001,
        lastname: "Pork",
        firstname: "John",
        middlename: "Skibidi",
        extension_name: "Jr.",
        dob: "2005-12-10",
        pob: "city",
        sex: "male",
        civil_status: "others",
        civil_status_other: "certified pork",
        height: "100",
        weight: "160",
        blood_type: "o+",
        gsis_no: "123456789",
        pagibig_no: "987654321",
        philhealth_no: "456789123",
        sss_no: "987654321",
        tin_no: "123456789",
        agency_employee_no: "001",
        citizenship: "dual citizen",
        dual_citizen_status: "by_naturalization",
        dual_citizenship_country: "Hotel Transelvania",
        residential_address: "123 Main St",
        permanent_address: "123 Main St",
        telephone_no: "123456789",
        mobile_no: "09123456789",
        email: "john.pork@email.com",

        spouse_lastname: "Pork",
        spouse_firstname: "Maris",
        spouse_middlename: "Skibidi",
        spouse_extension: "Jr.",

        spouse_occupation: "Stripper",

        occupation: "Professional Eater",
        employer: "XYZ School",
        business_address: "123 Diddy Mansion St, Country",
        business_telephone: "1234567890",

        father_lastname: "Diddy",
        father_firstname: "Sean",
        father_middlename: "Pie",
        father_extension: "Sr.",
        mother_lastname: "Emily",
        mother_firstname: "Motherfucker",
        mother_middlename: "Smiths",
        mother_extension: "Cooper",
        children: [
          {
            id: "child_fullname_1",
            child_fullname: "HevAbi978",
            dob: "2015-01-01",
          },
        ],
      },
      {
        cs_id: 20230002,
        lastname: "Skrrt",
        firstname: "Lil",
        middlename: "Zoom",
        extension_name: "",
        dob: "2004-07-16",
        pob: "Raceway",
        sex: "male",
        civil_status: "single",
        height: "140",
        weight: "200",
        blood_type: "a-",
        gsis_no: "111222333",
        pagibig_no: "444555666",
        philhealth_no: "777888999",
        sss_no: "112233445",
        tin_no: "667788990",
        agency_employee_no: "002",
        citizenship: "filipino",
        dual_citizen_status: "",
        dual_citizenship_country: "",
        residential_address: "69 Drift Street",
        permanent_address: "69 Drift Street",
        telephone_no: "1123581321",
        mobile_no: "09112233445",
        email: "lil.skrrt@email.com",

        spouse_lastname: "",
        spouse_firstname: "",
        spouse_middlename: "",
        spouse_extension: "",

        spouse_occupation: "",

        occupation: "Racecar Driver",
        employer: "Fast Inc.",
        business_address: "123 Finish Line",
        business_telephone: "876543210",

        father_lastname: "Skrrt",
        father_firstname: "Big",
        father_middlename: "Zoom",
        father_extension: "Sr.",
        mother_lastname: "Fast",
        mother_firstname: "Speedy",
        mother_middlename: "McQueen",
        mother_extension: "",
        children: [],
      },
      {
        cs_id: 20230003,
        lastname: "Slurp",
        firstname: "Yummy",
        middlename: "Slime",
        extension_name: "",
        dob: "2003-03-15",
        pob: "Oozeville",
        sex: "female",
        civil_status: "single",
        height: "120",
        weight: "110",
        blood_type: "ab+",
        gsis_no: "998877665",
        pagibig_no: "554433221",
        philhealth_no: "443322110",
        sss_no: "556677889",
        tin_no: "221144556",
        agency_employee_no: "003",
        citizenship: "filipino",
        dual_citizen_status: "by_birth",
        dual_citizenship_country: "Slime Planet",
        residential_address: "888 Ooze Lane",
        permanent_address: "888 Ooze Lane",
        telephone_no: "789123456",
        mobile_no: "09233455678",
        email: "yummy.slurp@email.com",

        spouse_lastname: "",
        spouse_firstname: "",
        spouse_middlename: "",
        spouse_extension: "",

        spouse_occupation: "",

        occupation: "Slime Researcher",
        employer: "Slurp Labs",
        business_address: "999 Goo Street",
        business_telephone: "321654987",

        father_lastname: "Slurp",
        father_firstname: "Drippy",
        father_middlename: "Blob",
        father_extension: "",
        mother_lastname: "Goo",
        mother_firstname: "Sticky",
        mother_middlename: "Sludge",
        mother_extension: "",
        children: [],
      },
      {
        cs_id: 20230004,
        lastname: "Brrr",
        firstname: "Chilly",
        middlename: "Frost",
        extension_name: "III",
        dob: "2002-01-01",
        pob: "Snowtown",
        sex: "female",
        civil_status: "married",
        civil_status_other: "",
        height: "180",
        weight: "75",
        blood_type: "b-",
        gsis_no: "445566778",
        pagibig_no: "998877665",
        philhealth_no: "223344556",
        sss_no: "667788990",
        tin_no: "334455667",
        agency_employee_no: "004",
        citizenship: "filipino",
        dual_citizen_status: "",
        dual_citizenship_country: "",
        residential_address: "123 Igloo St",
        permanent_address: "123 Igloo St",
        telephone_no: "456789012",
        mobile_no: "09091234567",
        email: "chilly.brrr@email.com",

        spouse_lastname: "Cool",
        spouse_firstname: "Icey",
        spouse_middlename: "Glacier",
        spouse_extension: "",

        spouse_occupation: "Snow Sculptor",

        occupation: "Snow Cone Vendor",
        employer: "Frosty Delights",
        business_address: "789 Ice Street",
        business_telephone: "9876543210",

        father_lastname: "Brrr",
        father_firstname: "Jack",
        father_middlename: "Freeze",
        father_extension: "Sr.",
        mother_lastname: "Frost",
        mother_firstname: "Crystal",
        mother_middlename: "Snowflake",
        mother_extension: "",
        children: [],
      },
      {
        cs_id: 20230005,
        lastname: "Munch",
        firstname: "Chomp",
        middlename: "Nom",
        extension_name: "",
        dob: "2001-05-25",
        pob: "Snackville",
        sex: "female",
        civil_status: "widowed",
        height: "155",
        weight: "90",
        blood_type: "o-",
        gsis_no: "667788990",
        pagibig_no: "445566778",
        philhealth_no: "334455667",
        sss_no: "556677889",
        tin_no: "998877665",
        agency_employee_no: "005",
        citizenship: "filipino",
        dual_citizen_status: "",
        dual_citizenship_country: "",
        residential_address: "123 Crunchy Lane",
        permanent_address: "123 Crunchy Lane",
        telephone_no: "123098765",
        mobile_no: "09123456789",
        email: "chomp.munch@email.com",

        spouse_lastname: "",
        spouse_firstname: "",
        spouse_middlename: "",
        spouse_extension: "",

        spouse_occupation: "",

        occupation: "Food Critic",
        employer: "Yum Magazine",
        business_address: "999 Tasty Avenue",
        business_telephone: "876543219",

        father_lastname: "Munch",
        father_firstname: "Chewy",
        father_middlename: "Crunch",
        father_extension: "",
        mother_lastname: "Snack",
        mother_firstname: "Bitey",
        mother_middlename: "Crisp",
        mother_extension: "",
        children: [],
      },
    ];
    return dummyData;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

export const createStudent = async (student) => {
  try {
    console.log(`student created success:`);
    console.log(student);
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (id, student) => {
  try {
    console.log(id);
    console.log(student);
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    console.log(`delete id ${id}`);
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
