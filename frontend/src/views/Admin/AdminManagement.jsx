import AdminLayout from "../../layout/AdminLayout";
import FormStepper from "../../components/FormStepper";
import { useState, useEffect } from "react";
import { fetchStudentData } from "../../api/StudentApi.js";
import delete__btn from "../../img/delete__btn.svg";
import edit__btn from "../../img/edit__btn.svg";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from "../../api/StudentApi.js";

const AdminMangement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const formPages = ["Personal Information", "Family Background"];
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const data = await fetchStudentData();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    getStudentData();
  }, []);

  useEffect(() => {
    console.log("current page: ", currentPage);
    console.log("form data: ", formData);
  }, [currentPage]);

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
    "Residential Address",
    "Permanent Address",
    "Telephone No.",
    "Mobile No.",
    "Email No.",
  ];

  const tbl2Headers = [
    "#",
    "CS ID",
    "Name",
    "Spouse's Name",
    "Occupation",
    "Employer / Business Name",
    "Business Address",
    "Telephone No.",
    "Father's Name",
    "Mother's Name",
    "Children's Name",
    "Children's Date of Birth",
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = formData.filter((data) =>
    `${data.firstname} ${data.middlename} ${data.lastname} ${data.extension_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (data) => {
    // Navigate to the FormRenderer component with the selected student's data
    navigate("/form", { state: { formData: data } });
    // pass state to the location when navigating using the navigate function
  };

  return (
    <AdminLayout>
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
                {(currentPage === 2 ? tbl2Headers : tbl1Headers).map(
                  (header, index) => (
                    <th key={index} scope="col" className="th__fw-normal">
                      {header}
                    </th>
                  ),
                )}
                <th className="action__cell action__cell-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* if filtered data has 0 or below result, show no result found */}
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.cs_id}</td>
                    <td>{`${data.firstname} ${data.middlename} ${data.lastname} ${data.extension_name}`}</td>
                    {currentPage === 1 ? (
                      <>
                        <td>{data.dob}</td>
                        <td>{data.pob}</td>
                        <td>{data.sex}</td>
                        <td>{data.civil_status}</td>
                        <td>{data.height}</td>
                        <td>{data.weight}</td>
                        <td>{data.blood_type}</td>
                        <td>{data.gsis_no}</td>
                        <td>{data.philhealth_no}</td>
                        <td>{data.sss_no}</td>
                        <td>{data.tin_no}</td>
                        <td>{data.agency_employee_no}</td>
                        <td>{data.citizenship}</td>
                        <td>{data.residential_address}</td>
                        <td>{data.permanent_address}</td>
                        <td>{data.telephone_no}</td>
                        <td>{data.mobile_no}</td>
                        <td>{data.email}</td>
                      </>
                    ) : (
                      <>
                        <td>{`${data.spouse_firstname} ${data.spouse_middlename} ${data.spouse_lastname} ${data.spouse_extension}`}</td>
                        <td>{data.spouse_occupation}</td>
                        <td>{data.employer}</td>
                        <td>{data.business_address}</td>
                        <td>{data.business_telephone}</td>
                        <td>{`${data.father_firstname} ${data.father_middlename} ${data.father_lastname} ${data.father_extension}`}</td>
                        <td>{`${data.mother_firstname} ${data.mother_middlename} ${data.mother_lastname} ${data.mother_extension}`}</td>
                        <td>
                          {data.children
                            .map((child) => child.child_fullname)
                            .join(", ")}
                        </td>
                        <td>
                          {data.children.map((child) => child.dob).join(", ")}
                        </td>
                      </>
                    )}
                    <td className="action__cell action__cell-td">
                      <button onClick={() => handleEdit(data)}>
                        <img src={edit__btn} alt="Edit" />
                      </button>
                      <button onClick={() => deleteStudent(data.cs_id)}>
                        <img src={delete__btn} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))
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
