import PropTypes from "prop-types"; //for propTyping below
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const PersonalInfo = ({
  formData,
  setFormData,
  nextPage,
  formRef,
  fromAdmin, // From admin edit, has some ui changes if true
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

  useEffect(() => {
    console.log(`Updated formData:`, formData);
  }, [formData]);

  const [showOthersCivil, setShowOthersCivil] = useState(false);
  const [showOthersCitizenship, setShowOthersCitizenship] = useState(false);

  // all rows that has sub__label don't need mb-4 since they are already big enough to have space
  // i added mb-4 instead for those rows

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
              name="l_name"
              placeholder="Enter your last name"
              required
              value={formData.l_name}
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
              name="f_name"
              placeholder="Enter your first name"
              required
              value={formData.f_name}
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
              name="e_name"
              placeholder="Enter your extension name"
              value={formData.e_name}
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
              name="m_name"
              placeholder="Enter your middle name"
              pattern="^[A-Za-z]+(\s[A-Za-z]+)*$"
              title="Please enter a valid middle name"
              value={formData.m_name}
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
              name="sex_desc"
              required
              value={formData.sex_desc}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
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
              name="cstat_desc"
              required
              value={formData.cstat_desc}
              onChange={(e) => {
                handleInputChange(e);
                // Puts up true in the showOthersCivil if value is 'others'
                setShowOthersCivil(e.target.value === "Others");
              }}
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
              <option value="Others">Others</option>
            </select>
            {showOthersCivil && (
              <input
                type="text"
                className="form-control mt-4"
                id="civil_status_other"
                name="cstat_other"
                placeholder="Please Specify*"
                required
                value={formData.cstat_other}
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
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
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
              name="pagibig_id"
              inputMode="numeric"
              placeholder="Enter your Pag-IBIG number"
              value={formData.pagibig_id}
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
              name="philhealth_id"
              inputMode="numeric"
              placeholder="Enter your PhilHealth number"
              value={formData.philhealth_id}
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
              name="tin"
              inputMode="numeric"
              placeholder="Enter your TIN number"
              value={formData.tin}
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
              name="agency_empno"
              inputMode="numeric"
              placeholder="Enter your agency employee number"
              value={formData.agency_empno}
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
              name="cit_desc"
              required
              value={formData.cit_desc}
              onChange={(e) => {
                handleInputChange(e);
                setShowOthersCitizenship(e.target.value === "Dual Citizen");
              }}
            >
              <option value="">Select</option>
              <option value="Filipino">Filipino</option>
              <option value="Dual Citizen">Dual Citizenship</option>
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
                      value="By Birth"
                      checked={formData.dual_citizenship_status === "By Birth"}
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
                      value="By Naturalization"
                      checked={
                        formData.dual_citizenship_status === "By Naturalization"
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
          {/* house no. */}
          <label htmlFor="res_house_no" className="col-sm-3 col-form-label">
            Residential House No.
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="res_house_no"
              name="res_house_no"
              placeholder="House no."
              value={formData.res_house_no}
              onChange={handleInputChange}
            />
          </div>

          {/* house strt */}
          <label htmlFor="res_house_street" className="col-sm-2 col-form-label">
            Residential Street *
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="res_house_street"
              name="res_house_street"
              placeholder="House street"
              required
              value={formData.res_house_street}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* row */}
        <div className="mb-4 row">
          {/* res_village */}
          <label htmlFor="res_village" className="col-sm-3 col-form-label">
            Residential Village
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="res_village"
              name="res_village"
              placeholder="Village"
              value={formData.res_village}
              onChange={handleInputChange}
            />
          </div>

          {/* res_bgy */}
          <label htmlFor="res_bgy" className="col-sm-2 col-form-label">
            Residential Barangay *
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="res_bgy"
              name="res_bgy"
              placeholder="Barangay"
              required
              value={formData.res_bgy}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* res_citymun */}
        <div className="mb-4 row">
          <label htmlFor="res_citymun" className="col-sm-3 col-form-label">
            Residential City / Municipality *
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="res_citymun"
              name="res_citymun"
              placeholder="Municipality"
              required
              value={formData.res_citymun}
              onChange={handleInputChange}
            />
          </div>

          {/* res_prov */}
          <label htmlFor="res_prov" className="col-sm-2 col-form-label">
            Residential Province *
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="res_prov"
              name="res_prov"
              placeholder="Province"
              required
              value={formData.res_prov}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* res_zipcode */}
        <div className="mb-4 row">
          <label htmlFor="res_zipcode" className="col-sm-3 col-form-label">
            Residential Zipcode *
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="res_zipcode"
              name="res_zipcode"
              placeholder="Zipcode"
              required
              value={formData.res_zipcode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Permanent Address */}
        {/* row */}
        <div className="mb-4 row">
          {/* perm_house_no */}
          <label htmlFor="perm_house_no" className="col-sm-3 col-form-label">
            Permanent House No.
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="perm_house_no"
              name="perm_house_no"
              placeholder="House no."
              value={formData.perm_house_no}
              onChange={handleInputChange}
            />
          </div>

          {/* perm_house_street */}
          <label
            htmlFor="perm_house_street"
            className="col-sm-2 col-form-label"
          >
            Permanent Street *
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="perm_house_street"
              name="perm_house_street"
              placeholder="House street"
              required
              value={formData.perm_house_street}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* row */}
        <div className="mb-4 row">
          {/* perm_village */}
          <label htmlFor="perm_village" className="col-sm-3 col-form-label">
            Permanent Village
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="perm_village"
              name="perm_village"
              placeholder="Village"
              value={formData.perm_village}
              onChange={handleInputChange}
            />
          </div>

          {/* perm_bgy */}
          <label htmlFor="perm_bgy" className="col-sm-2 col-form-label">
            Permanent Barangay *
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="perm_bgy"
              name="perm_bgy"
              placeholder="Barangay"
              required
              value={formData.perm_bgy}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* perm_citymun */}
        <div className="mb-4 row">
          <label htmlFor="perm_citymun" className="col-sm-3 col-form-label">
            Permanent City / Municipality *
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="perm_citymun"
              name="perm_citymun"
              placeholder="Municipality"
              required
              value={formData.perm_citymun}
              onChange={handleInputChange}
            />
          </div>

          {/* perm_prov */}
          <label htmlFor="perm_prov" className="col-sm-2 col-form-label">
            Residential Province *
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="perm_prov"
              name="perm_prov"
              placeholder="Province"
              required
              value={formData.perm_prov}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* perm_zipcode */}
        <div className="mb-4 row">
          <label htmlFor="perm_zipcode" className="col-sm-3 col-form-label">
            Permanent Zipcode *
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="perm_zipcode"
              name="perm_zipcode"
              placeholder="Zipcode"
              required
              value={formData.perm_zipcode}
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
              name="tel_no"
              placeholder="Enter your telephone number"
              value={formData.tel_no}
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
              name="email_address"
              placeholder="Enter your email address"
              required
              value={formData.email_address}
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
  fromAdmin: PropTypes.bool
};

export default PersonalInfo;
