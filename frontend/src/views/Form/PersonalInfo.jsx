import PropTypes from "prop-types"; //for propTyping below
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const PersonalInfo = ({
  formData,
  setFormData,
  nextPage,
  formRef,
  fromAdmin,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // validation here
    console.log("submit done");
    nextPage();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [showOthersCivil, setShowOthersCivil] = useState(false);
  const [showOthersCitizenship, setShowOthersCitizenship] = useState(false);

  // all rows that has sub__label don't need mb-4 since they are already big enough to have space
  // i added mb-4 instead for those rows
  const navigate = useNavigate();

  return (
    <div className="form container">
      <p className="form__disclaimer">*Required Fields</p>
      <form ref={formRef} onSubmit={handleSubmit} className="row">
        {/* Surname */}
        <div className="row mb-4">
          <label htmlFor="lastname" className="col-sm-3">
            Last Name*
            <p className="form__sub-label">(ex. Dela Cruz)</p>
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
              required
              value={formData.lastname}
              onChange={handleInputChange}
              /* no need to pass e, onchange automatically does that */
            />
          </div>
        </div>

        {/* Firstname */}
        <div className="row mb-4">
          <label htmlFor="firstname" className="col-sm-3">
            First Name*
            <p className="form__sub-label">(ex. Juan)</p>
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
              required
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>

          {/*Extension Name*/}
          <label htmlFor="extension_name" className="col-sm-2">
            Extension Name
            <p className="form__sub-label">(ex. Jr./Sr.)</p>
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="extension_name"
              name="extension_name"
              placeholder="Enter your extension name"
              value={formData.extension_name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Middlename */}
        <div className="mb-4 row">
          <label htmlFor="middlename" className="col-sm-3 col-form-label">
            Middle Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="middlename"
              name="middlename"
              placeholder="Enter your middle name"
              pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
              title="Please enter a valid middle name"
              value={formData.middlename}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4 row">
          <label htmlFor="dob" className="col-sm-3 col-form-label">
            Date of Birth*
          </label>
          <div className="col-sm-9">
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              required
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Place of Birth */}
        <div className="mb-4 row">
          <label htmlFor="pob" className="col-sm-3 col-form-label">
            Place of Birth*
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="pob"
              name="pob"
              placeholder="Enter your place of birth"
              required
              value={formData.pob}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Sex */}
        <div className="mb-4 row">
          <label htmlFor="sex" className="col-sm-3 col-form-label">
            Sex*
          </label>
          <div className="col-sm-9">
            <select
              className="form-select"
              id="sex"
              name="sex"
              required
              value={formData.sex}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Civil Status */}
        <div className="mb-4 row">
          <label htmlFor="civil_status" className="col-sm-3 col-form-label">
            Civil Status*
          </label>
          <div className="col-sm-9">
            <select
              className="form-select"
              id="civil_status"
              name="civil_status"
              required
              value={formData.civil_status}
              onChange={(e) => {
                handleInputChange(e);
                // Puts up true in the showOthersCivil if value is 'others'
                setShowOthersCivil(e.target.value === "others");
              }}
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="divorced">Divorced</option>
              <option value="others">Others</option>
            </select>
            {showOthersCivil && (
              <input
                type="text"
                className="form-control mt-4"
                id="civil_status_other"
                name="civil_status_other"
                placeholder="Please Specify*"
                required
                value={formData.civil_status_other}
                onChange={handleInputChange}
              />
            )}
          </div>
        </div>

        {/* Height */}
        <div className="mb-4 row">
          <label htmlFor="height" className="col-sm-3 col-form-label">
            Height (cm)
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="height"
              name="height"
              min="0"
              placeholder="Enter your height in cm"
              value={formData.height}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Weight */}
        <div className="mb-4 row">
          <label htmlFor="weight" className="col-sm-3 col-form-label">
            Weight (kg)
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              min="0"
              placeholder="Enter your weight in kg"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Blood Type */}
        <div className="mb-4 row">
          <label htmlFor="blood_type" className="col-sm-3 col-form-label">
            Blood Type
          </label>
          <div className="col-sm-9">
            <select
              className="form-select"
              id="blood_type"
              name="blood_type"
              value={formData.blood_type}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
              <option value="o+">O+</option>
              <option value="o-">O-</option>
            </select>
          </div>
        </div>

        {/* GSIS */}
        <div className="mb-4 row">
          <label htmlFor="gsis_no" className="col-sm-3 col-form-label">
            GSIS No.
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="gsis_no"
              name="gsis_no"
              inputMode="numeric"
              placeholder="Enter your GSIS number"
              value={formData.gsis_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Pag Ibig */}
        <div className="mb-4 row">
          <label htmlFor="pagibig_no" className="col-sm-3 col-form-label">
            Pag-IBIG No.
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="pagibig_no"
              name="pagibig_no"
              inputMode="numeric"
              placeholder="Enter your Pag-IBIG number"
              value={formData.pagibig_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* PhilHealth */}
        <div className="mb-4 row">
          <label htmlFor="philhealth_no" className="col-sm-3 col-form-label">
            PhilHealth No.
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="philhealth_no"
              name="philhealth_no"
              inputMode="numeric"
              placeholder="Enter your PhilHealth number"
              value={formData.philhealth_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* SSS */}
        <div className="mb-4 row">
          <label htmlFor="sss_no" className="col-sm-3 col-form-label">
            SSS No.
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="sss_no"
              name="sss_no"
              inputMode="numeric"
              placeholder="Enter your SSS number"
              value={formData.sss_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Tin */}
        <div className="mb-4 row">
          <label htmlFor="tin_no" className="col-sm-3 col-form-label">
            TIN No.
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="tin_no"
              name="tin_no"
              inputMode="numeric"
              placeholder="Enter your TIN number"
              value={formData.tin_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Agency Employee Number */}
        <div className="mb-4 row">
          <label
            htmlFor="agency_employee_no"
            className="col-sm-3 col-form-label"
          >
            Agency Employee No.
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="agency_employee_no"
              name="agency_employee_no"
              inputMode="numeric"
              placeholder="Enter your agency employee number"
              value={formData.agency_employee_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Citizenship */}
        <div className="mb-4 row">
          <label htmlFor="citizenship" className="col-sm-3 col-form-label">
            Citizenship *
          </label>
          <div className="col-sm-9">
            <select
              className="form-select"
              id="citizenship"
              name="citizenship"
              required
              value={formData.citizenship}
              onChange={(e) => {
                handleInputChange(e);
                setShowOthersCitizenship(e.target.value === "dual citizen");
              }}
            >
              <option value="">Select</option>
              <option value="filipino">Filipino</option>
              <option value="dual citizen">Dual Citizenship</option>
            </select>

            {showOthersCitizenship && (
              <div className="row  mt-4">
                {/* Radio */}
                <div className="form__citizenship-radio d-flex col-sm-4">
                  <div className="form-check">
                    {/* by birth */}
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dual_citizenship_status"
                      onChange={handleInputChange}
                      id="by_birth"
                      value="by_birth"
                      checked={formData.dual_citizenship_status === "by_birth"}
                      required
                    />
                    <label className="form-check-label" htmlFor="by_birth">
                      By Birth
                    </label>
                  </div>

                  <div className="form-check mx-3">
                    {/* by naturalization */}
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dual_citizenship_status"
                      id="by_naturalization"
                      value="by_naturalization"
                      checked={
                        formData.dual_citizenship_status === "by_naturalization"
                      }
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="by_naturalization"
                    >
                      By Naturalization
                    </label>
                  </div>
                </div>

                <div className="col-sm-8 form__citizenship-country">
                  <input
                    type="text"
                    className="form-control flex-grow-1"
                    id="dual_citizenship_country"
                    name="dual_citizenship_country"
                    placeholder="Please Specify Country*"
                    pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
                    title="Please enter a valid country"
                    value={formData.dual_citizenship_country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Residential Address */}
        <div className="mb-4 row">
          <label
            htmlFor="residential_address"
            className="col-sm-3 col-form-label"
          >
            Residential Address *
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="residential_address"
              name="residential_address"
              placeholder="Enter your residential address"
              required
              value={formData.residential_address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Permanent Address */}
        <div className="mb-4 row">
          <label
            htmlFor="permanent_address"
            className="col-sm-3 col-form-label"
          >
            Permanent Address *
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="permanent_address"
              name="permanent_address"
              placeholder="Enter your permanent address"
              required
              value={formData.permanent_address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Telephone Number */}
        <div className="mb-4 row">
          <label htmlFor="telephone_no" className="col-sm-3 col-form-label">
            Telephone No.
          </label>
          <div className="col-sm-9">
            <input
              type="tel"
              className="form-control"
              id="telephone_no"
              name="telephone_no"
              placeholder="Enter your telephone number"
              value={formData.telephone_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="mb-4 row">
          <label htmlFor="mobile_no" className="col-sm-3 col-form-label">
            Mobile No. *
          </label>
          <div className="col-sm-9">
            <input
              type="tel"
              className="form-control"
              id="mobile_no"
              name="mobile_no"
              required
              inputMode="numeric"
              placeholder="Enter your mobile number"
              value={formData.mobile_no}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="row mb-4">
          <label htmlFor="email" className="col-sm-3 col-form-label">
            Email Address*
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* errors */}

        {/* {errors.email && 
                <p className="error">{errors.email}</p>} */}

        <hr className="form__line mb-4" />

        {/* Navigate */}
        <div className="d-flex justify-content-between mb-4">
          {/* Back Button */}
          <div>
            {fromAdmin ? (
              <NavLink
                className="form__navbtn btn btn-primary"
                to="/admin/manage"
              >
                Back to Admin
              </NavLink>
            ) : (
              <NavLink to="/" className="form__navbtn btn btn-primary">
                Back to Home
              </NavLink>
            )}
          </div>

          {/* Next Button */}
          <div>
            {/* this is submit */}
            <button type="submit" className="form__navbtn btn btn-primary">
              Next Page
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

PersonalInfo.propTypes = {
  nextPage: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  formRef: PropTypes.object.isRequired,
};

export default PersonalInfo;
