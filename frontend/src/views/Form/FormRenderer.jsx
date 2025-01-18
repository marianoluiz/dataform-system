import { useState, useRef, useEffect } from "react";
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
    lastname: "",
    firstname: "",
    middlename: "",
    extension_name: "",
    dob: "",
    pob: "",
    sex: "",
    civil_status: "",
    height: "",
    weight: "",
    blood_type: "",
    gsis_no: "",
    pagibig_no: "",
    philhealth_no: "",
    sss_no: "",
    tin_no: "",
    agency_employee_no: "",
    citizenship: "",
    residential_address: "",
    permanent_address: "",
    telephone_no: "",
    mobile_no: "",
    email: "",
    civil_status_other: "", // Added for "Other" civil status
    dual_citizen_status: "", // Added for dual citizenship
    dual_citizenship_country: "", // Added for dual citizenship country
    // Page 2: Family Background
    spouse_lastname: "",
    spouse_firstname: "",
    spouse_middlename: "",
    spouse_extension: "",
    occupation: "",
    employer: "",
    business_address: "",
    business_telephone_no: "",
    father_lastname: "",
    father_firstname: "",
    father_middlename: "",
    father_extension: "",
    mother_lastname: "",
    mother_firstname: "",
    mother_middlename: "",
    mother_extension: "",
    children: [
      {
        id: `child_fullname_1`,
        child_fullname: "",
        dob: "",
      },
    ],
  };

  // Current Page state
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  // Automatically populate form fields
  /* useEffect(() => {
        setFormData({
            lastname: 'Pork',
            firstname: 'John',
            middlename: 'Skibidi',
            extension_name: 'Jr.',
            dob: '2005-12-10',
            pob: 'city',
            sex: 'male',
            civil_status: 'others',
            civil_status_other: 'certified pork', //other
            height: '100',
            weight: '160',
            blood_type: 'o+',
            gsis_no: '123456789',
            pagibig_no: '987654321',
            philhealth_no: '456789123',
            sss_no: '987654321',
            tin_no: '123456789',
            agency_employee_no: '001',
            citizenship: 'dual citizen',
            dual_citizen_status: 'by_naturalization',
            dual_citizenship_country: 'Hotel Transelvania',
            residential_address: '123 Main St',
            permanent_address: '123 Main St',
            telephone_no: '123456789',
            mobile_no: '09123456789',
            email: 'john.pork@email.com',

            spouse_lastname: 'Pork',
            spouse_firstname: 'Maris',
            spouse_middlename: 'Skibidi',
            spouse_extension: 'Jr.',

            spouse_occupation: 'Stripper',

            occupation: 'Professional Eater',
            employer: 'XYZ School',
            business_address: '123 Diddy Mansion St, Country',
            business_telephone: '1234567890',

            father_lastname: 'Diddy',
            father_firstname: 'Sean',
            father_middlename: 'Pie',
            father_extension: 'Sr.',
            mother_lastname: 'Emily',
            mother_firstname: 'Simile',
            mother_middlename: 'Smiths',
            mother_extension: 'Cooper',
            children: [
                {
                    id: 'child_fullname_1',
                    child_fullname: 'HevAbi978',
                    dob: '2015-01-01',
                },
            ],
        });
    }, []); */

  const formPages = ["Personal Information", "Family Background"];

  // I didnt continue using formRef because I got stucked in error for like friggin 8 hours I hate my life

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
