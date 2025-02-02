import AdminLayout from "../../layout/AdminLayout";
import FormStepper from "../../components/FormStepper";
import { useState, useEffect } from "react";
import * as StudentApi from "../../api/StudentApi.js";
import delete__btn from "../../img/delete__btn.svg";
import edit__btn from "../../img/edit__btn.svg";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import StatusModal from "../Modal/StatusModal";


const AdminMangement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const formPages = ["Personal Information", "Contact Information", "Family Background"];
  const [formData, setFormData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate(); // will be used to pass formData in update form

  // status modal
  const { openStatusModal } = useModal();

  // get students
  useEffect(() => {
    const getStudentData = async () => {
      try {
        const data = await StudentApi.getStudentData();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    getStudentData();
  }, []);

  const tbl1Headers = [
    "#",
    "CS ID",
    "Name",
    "Date of Birth",
    "Place of Birth",
    "Sex",
    "Civil Status",
    "Height",
    "Weight",
    "Blood Type",
    "GSIS ID No.",
    "PHILHEALTH ID No.",
    "SSS ID No.",
    "TIN ID No.",
    "Agency Employee No.",
    "Citizenship",
  ];

  const tbl2Headers = [
    "#",
    "CS ID",
    "Name",
    "Residential Address",
    "Permanent Address",
    "Telephone No.",
    "Mobile No.",
    "Email No.",
  ];

  const tbl3Headers = [
    "#",
    "CS ID",
    "Name",
    "Spouse's Name",
    "Occupation",
    "Spouse's Employer",
    "Business Address",
    "Father's Name",
    "Mother's Name",
    "Children's Name",
    "Children's Date of Birth",
  ];

  let currentNavHeader;

  if (currentPage === 2) {
    currentNavHeader = tbl2Headers;
  } else if (currentPage === 3) {
    currentNavHeader = tbl3Headers;
  } else {
    currentNavHeader = tbl1Headers;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // search logic
  const filteredData = formData.filter((data) => 
    `${data.f_name} ${data.m_name} ${data.l_name} ${data.e_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  // this is the action when user clicks update
  const handleEdit = (data) => {
    setFormData({
      ...data
      , p_id: data.p_id, // this includes the p_id to the form data when I click edit to a student
    });
    
    console.log('handle edit data: ', data);
    // Navigate to the FormRenderer component with the selected student's data
    navigate("/form", { state: { formData: data } });
    // pass state to the location when navigating using the navigate function
  };

  const handleDelete = async (p_id) => {
    try {
      await StudentApi.deleteStudent(p_id);
      openStatusModal("Student deleted successfully", "success");
      // refresh
      const response = await StudentApi.getStudentData();
      setFormData(response);
    } catch (err) {
      openStatusModal("Failed to delete student", "error");
      console.error("Error deleting student:", err);
    }
  };

  return (
    <AdminLayout>
      <StatusModal />
      <div className="admin__management container">
        <h1 className="mgmt__title text-end">Management</h1>

        <div className="row mgmt__no-padding">
          <div className="col-sm-6 mgmt__no-padding ">
            <div className=" mgmt__search-wrapper">
              <p className="mgmt__text">Search Student</p>
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="btn btn__search btn-outline-success">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-6 d-flex align-items-end justify-content-end mgmt__no-padding mt-4">
            <FormStepper
              currentPage={currentPage - 1}
              formPages={formPages}
              onPageClick={setCurrentPage}
              adminStyles={{
                paddingBottom: 0,
                paddingTop: 0,
                margin: "0",
                maxWidth: "80%",
              }}
              cursorStyle={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <div className="mt-3">
          <table className="admin__tbl table table-bordered table-striped">
            <thead>
              <tr className="">
                {currentNavHeader.map((header, index) => (
                  <th key={index} scope="col" className="th__fw-normal">
                    {header}
                  </th>
                ))}
                <th className="action__cell action__cell-th">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* if filtered data has 0 or below result, show no result found */}
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => {
                  /* this javascript logic (let, if else
                  is allowed since it is part of
                  the map function logic */
                  let content;

                  if (currentPage === 1) {
                    content = (
                      <>
                        <td>{data.dob}</td>
                        <td>{data.pob}</td>
                        <td>{data.sex_desc}</td>
                        <td>{data.cstat_desc}</td>
                        <td>{data.height}</td>
                        <td>{data.weight}</td>
                        <td>{data.blood_type}</td>
                        <td>{data.gsis_no}</td>
                        <td>{data.pagibig_id}</td>
                        <td>{data.sss_no}</td>
                        <td>{data.tin}</td>
                        <td>{data.agency_empno}</td>
                        <td>{data.cit_desc}</td>
                      </>
                    );
                  } else if (currentPage === 2) {
                    content = (
                      <>
                        <td>
                          {`${data.res_house_no ? `${data.res_house_no} ` : ""}${data.res_house_street ? `${data.res_house_street}, ` : ""}${data.res_village ? `${data.res_village} ` : ""}${data.res_bgy ? `${data.res_bgy}, ` : ""}${data.res_citymun ? `${data.res_citymun}, ` : ""}${data.res_zipcode ? `${data.res_zipcode}` : ""}`}
                        </td>
                        <td>
                          {`${data.perm_house_no ? `${data.perm_house_no} ` : ""}${data.perm_house_street ? `${data.perm_house_street}, ` : ""}${data.perm_village ? `${data.perm_village} ` : ""}${data.perm_bgy ? `${data.perm_bgy}, ` : ""}${data.perm_citymun ? `${data.perm_citymun}, ` : ""}${data.perm_zipcode ? `${data.perm_zipcode}` : ""}`}
                        </td>
                        <td>{data.tel_no}</td>
                        <td>{data.mobile_no}</td>
                        <td>{data.email_address}</td>
                      </>
                    );
                  } else if (currentPage === 3) {
                    content = (
                      <>
                        <td>
                          {`${data.spouse_firstname ? `${data.spouse_firstname} ` : ""}${data.spouse_middlename ? `${data.spouse_middlename} ` : ""}${data.spouse_lastname ? `${data.spouse_lastname} ` : ""}${data.spouse_extension ? `${data.spouse_extension}` : ""}`}
                        </td>
                        <td>{data.spouse_occupation}</td>
                        <td>{data.spouse_employer}</td>
                        <td>{data.spouse_emp_address}</td>
                        <td>
                          {`${data.father_lname ? `${data.father_lname}, ` : ""}${data.father_fname ? `${data.father_fname} ` : ""}${data.father_mname ? `${data.father_mname} ` : ""}${data.father_ename ? `${data.father_ename}` : ""}`}
                        </td>
                        <td>
                          {`${data.mother_mn_lname ? `${data.mother_mn_lname}, ` : ""}${data.mother_mn_fname ? `${data.mother_mn_fname} ` : ""}${data.mother_mn_mname ? `${data.mother_mn_mname} ` : ""}${data.mother_mn_ename ? `${data.mother_mn_ename}` : ""}`}
                        </td>
                        <td>
                          {data.children
                            .map((child) => child.child_fullname)
                            .join(", ")}
                        </td>
                        <td>
                          {data.children
                            .map((child) => child.child_dob)
                            .join(", ")}
                        </td>
                      </>
                    );
                  }

                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.p_id}</td>
                      <td>{`${data.l_name}, ${data.f_name} ${data.m_name ? `${data.m_name}` : ""}  ${data.e_name ? `${data.e_name}` : ""}`}</td>

                      {content}

                      <td className="action__cell action__cell-td">
                        <button onClick={() => handleEdit(data)}>
                          <img src={edit__btn} alt="Edit" />
                        </button>
                        <button onClick={() => handleDelete(data.p_id)}>
                          {" "}
                          {/* this function is from other file */}
                          <img src={delete__btn} alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={22} className="text-sm-center py-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMangement;
