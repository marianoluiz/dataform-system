import { useState, useRef } from "react";
import PersonalInfo from "./PersonalInfo";
import FamilyBg from "./FamilyBg";
import FormComplete from "./FormComplete";
import MainLayout from "../../layout/MainLayout";
import FormStepper from "../../components/FormStepper";
import FormBanner from "../../components/FormBanner";
import { useLocation } from "react-router-dom";

const FormRenderer = () => {
  const location = useLocation(); 
  // checks if formData is passed via the location.state. If it is, initialFormData is populated with this data.
  const initialFormData = location.state?.formData || {
    l_name: "",
    f_name: "",
    m_name: "",
    e_name: "",
    dob: "",
    pob: "",
    height: 0,
    weight: 0,
    blood_type: "",
    gsis_no: "",
    pagibig_id: "",
    philhealth_id: "",
    sss_no: "",
    tin: "",
    agency_empno: "",

    res_house_no: "",
    res_house_street: "",
    res_village: "",
    res_bgy: "",
    res_citymun: "",
    res_prov: "",
    res_zipcode: "",
    perm_house_no: "",
    perm_house_street: "",
    perm_village: "",
    perm_bgy: "",
    perm_citymun: "",
    perm_prov: "",
    perm_zipcode: "",
    tel_no: "",
    mobile_no: "",
    email_address: "",

    spouse_lname: "",
    spouse_fname: "",
    spouse_mname: "",
    spouse_ename: "",
    spouse_occupation: "",
    spouse_employer: "",
    spouse_emp_address: "",
    father_lname: "",
    father_fname: "",
    father_mname: "",
    father_ename: "",
    mother_mn_lname: "",
    mother_mn_fname: "",
    mother_mn_mname: "",
    mother_mn_ename: "",

    children: [],
    sex_desc: "",
    cstat_desc: "",
    cit_desc: "",
    cit_acq_desc: "",
    cstat_other: "",
    dual_citizenship_country: "",
  };

  // Current Page state
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  // Automatically populate form fields
  /* useEffect(() => {
        setFormData({
          l_name: "Kings",
          f_name: "Mariano Luiz",
          m_name: "Skibidi",
          e_name: "Jr.",
          dob: "2005-12-10",
          pob: "city",
          sex_desc: "M",
          cstat_desc: "Others",
          civil_status_other: "certified pork",
          height: "0",
          weight: "0",
          blood_type: "O+",
          gsis_no: "06378",
          pagibig_id: "07378",
          philhealth_id: "27964",
          sss_no: "86367",
          tin: "875895",
          agency_empno: "07456",

          cit_desc: "Dual Citizen",
          cit_acq_desc: "By Naturalization",

          dual_citizenship_country: "Hotel Transelvania",
          res_house_no: "123",
          res_house_street: "Cornelia St.",
          res_village: "Tondo Village",
          res_bgy: "223",
          res_citymun: "Manila",
          res_prov: "Metro Manila",
          res_zipcode: "9732",

          perm_house_no: "123",
          perm_house_street: "Cornelia St.",
          perm_village: "Tondo Village",
          perm_bgy: "223",
          perm_citymun: "Manila",
          perm_prov: "Metro Manila",
          perm_zipcode: "9732",

          tel_no: "123456789",
          mobile_no: "09123456789",
          email_address: "john.pork@email.com",

          spouse_lname: "Pork",
          spouse_fname: "Maris",
          spouse_mname: "Skibidi",
          spouse_ename: "Jr.",
          spouse_occupation: "Bagger",
          spouse_employer: "XYZ School",
          spouse_emp_address: "123 Doug Mansion St, Country",

          father_lname: "Dan",
          father_fname: "Sean",
          father_mname: "Pie",
          father_ename: "",

          mother_mn_lname: "Emily",
          mother_mn_fname: "Truck",
          mother_mn_mname: "Smiths",
          mother_mn_ename: "",

          children: [
            {
              child_fullname: "Tom Cruise",
              child_dob: "2015-01-01",
            },
            {
              child_fullname: "Brad Pitt",
              child_dob: "2000-01-01",
            },
          ],
        });
    }, []); */

  
  
  const formPages = ["Personal Information", "Family Background"];
    // reference to the form element
 
  const formRef = useRef(null);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  /* 
    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex + 1);
    }; */

  // pages starts with 1 cause there is no case 0 on switch case
  // Use this function for enabled navigation in stepper


  // i will only pass this to as a prop to component pages
  const fromAdmin = true;

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <PersonalInfo
            formData={formData}
            nextPage={nextPage}
            setFormData={setFormData}
            formRef={formRef}
            {...(location.state ? { fromAdmin } : {})}
            // location.state is used to pass state between routes
            // fromAdmin is always set to true, so when u pass it, it is true
          />
        );
      case 2:
        return (
          <FamilyBg
            nextPage={nextPage}
            prevPage={prevPage}
            formData={formData}
            setFormData={setFormData}
            formRef={formRef}
            {...(location.state ? { fromAdmin } : {})}
          />
        );
      case 3:
        return (
          <FormComplete
            formData={formData}
            {...(location.state ? { fromAdmin } : {})}
          />
        );
      default:
        return (
          <PersonalInfo
            nextPage={nextPage}
            {...(location.state ? { fromAdmin } : {})}
          />
        );
    }
  };

  return (
    <MainLayout>
      <FormBanner />
      <FormStepper
        formPages={formPages}
        currentPage={currentPage - 1}
        //onPageClick={goToPage} - Use this prop for enabled navigation in stepper
        disabled={currentPage === 3}
      />
      {renderPage()}
    </MainLayout>
  );
};

export default FormRenderer;
