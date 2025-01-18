import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const FormComplete = ({ formData, fromAdmin }) => {
  return (
    <div className="form container">
      <h1 className="fs-1 text-center mt-5">
        {fromAdmin ? "Update Summary" : "Submission Summary"}
      </h1>
      <p className="fs-6 text-center mb-5">
        {fromAdmin
          ? "Student Updated Successfully"
          : "We have received your response. For any concerns, please contact the administrator."}
      </p>

      {/* Personal Information */}
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="card summary__card">
            <div className="card-body">
              <h5 className="card-title">Personal Information</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Full Name:</strong> {formData.firstname}{" "}
                  {formData.middlename} {formData.lastname}{" "}
                  {formData.extension_name}
                </li>
                <li>
                  <strong>Date of Birth:</strong> {formData.dob}
                </li>
                <li>
                  <strong>Place of Birth:</strong> {formData.pob}
                </li>
                <li>
                  <strong>Sex:</strong> {formData.sex}
                </li>
                <li>
                  <strong>Civil Status:</strong>{" "}
                  {formData.civil_status === "others"
                    ? formData.civil_status_other
                    : formData.civil_status}
                </li>
                <li>
                  <strong>Height:</strong> {formData.height} cm
                </li>
                <li>
                  <strong>Weight:</strong> {formData.weight} kg
                </li>
                <li>
                  <strong>Blood Type:</strong> {formData.blood_type}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="col-12 col-md-6 mb-4">
          <div className="card summary__card">
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Telephone No:</strong> {formData.telephone_no}
                </li>
                <li>
                  <strong>Mobile No:</strong> {formData.mobile_no}
                </li>
                <li>
                  <strong>Email:</strong> {formData.email}
                </li>
                <li>
                  <strong>Residential Address:</strong>{" "}
                  {formData.residential_address}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Family Information */}
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="card summary__card">
            <div className="card-body">
              <h5 className="card-title">Family Background</h5>

              <h6>Spouse</h6>
              <ul className="list-unstyled">
                <li>
                  <strong>Name:</strong> {formData.spouse_firstname}{" "}
                  {formData.spouse_middlename} {formData.spouse_lastname}{" "}
                  {formData.spouse_extension}
                </li>
                <li>
                  <strong>Occupation:</strong> {formData.spouse_occupation}
                </li>
                <li>
                  <strong>Employer:</strong> {formData.employer}
                </li>
                <li>
                  <strong>Business Address:</strong> {formData.business_address}
                </li>
                <li>
                  <strong>Business Telephone:</strong>{" "}
                  {formData.business_telephone}
                </li>
              </ul>

              <h6>Parents</h6>
              <ul className="list-unstyled">
                <li>
                  <strong>Father:</strong> {formData.father_firstname}{" "}
                  {formData.father_middlename} {formData.father_lastname}{" "}
                  {formData.father_extension}
                </li>
                <li>
                  <strong>Mother:</strong> {formData.mother_firstname}{" "}
                  {formData.mother_middlename} {formData.mother_lastname}{" "}
                  {formData.mother_extension}
                </li>
              </ul>

              <h6>Children</h6>
              <ul className="list-unstyled">
                {formData.children.map((child, index) => (
                  <li key={index}>
                    <strong>Child {index + 1}:</strong> {child.child_fullname},
                    Date of Birth: {child.dob}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Citizenship Information */}
        <div className="col-12 col-md-6 mb-4">
          <div className="card summary__card">
            <div className="card-body">
              <h5 className="card-title">Citizenship Information</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Citizenship:</strong> {formData.citizenship}
                </li>
                <li>
                  <strong>Dual Citizenship Status:</strong>{" "}
                  {formData.dual_citizenship_status === "by_birth"
                    ? "By Birth"
                    : "By Naturalization"}
                </li>
                {formData.dual_citizenship_country && (
                  <li>
                    <strong>Dual Citizenship Country:</strong>{" "}
                    {formData.dual_citizenship_country}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="d-flex justify-content-center mt-4">
        <NavLink
          className="btn btn-primary form__navbtn text-center my-5"
          to={fromAdmin? "/admin/dashboard":"/"}
        >
          {fromAdmin ? "Back to Dashboard" : "Back to Home"}
        </NavLink>
      </div>
    </div>
  );
};

FormComplete.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default FormComplete;
