
import PropTypes from "prop-types";
import * as StudentApi from "../../api/StudentApi";
import {  useState } from "react";

const FamilyBg = ({
  nextPage,
  prevPage,
  formData,
  setFormData,
  formRef,
  fromAdmin, /* if from admin, have some ui changes and query is update */
}) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (fromAdmin) {
        // update if from admin
        await StudentApi.updateStudent(formData);
      } else {
        // create if from admin
        await StudentApi.createStudent(formData);
      }

      nextPage();
    } catch (err) {
      setError(
        `An error occurred while submitting the form. Please try again.`
      );
      console.error(err);
    } finally {
      setLoading(false);      
    }
  };

  // Adding More a Child Section
  const addChild = () => {
    const newIndex = formData.children.length + 1;

    setFormData({
      ...formData,
      children: [
        ...formData.children,
        {
          id: `child_fullname_${newIndex}`,
          child_fullname: "",
          dob: "",
        },
      ],
    });
  };

  // Removing a Child Section
  const removeChild = () => {
    if (formData.children.length === 1) return;

    const newChildren = formData.children.filter(
      (_, i) => i !== formData.children.length - 1,
    );
    setFormData({
      ...formData,
      children: newChildren,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamic key, we use [].
    });
  };

  const handleChildInputChange = (e, index) => {
    const { name, value } = e.target;
    // name should be  the child_fullname

    setFormData({
      ...formData,
      children: formData.children.map((child, i) => {
        if (i === index) return { ...child, [name]: value };
        else return child;
      }),
    });

    // console.log("index: ", index);
    // console.log("formData: ", formData.children);
  };

  /* useEffect(() => {
    console.log(`Updated formData:`, formData);
  }, [formData]); */

  return (
    <div className="form container">
      <p className="form__disclaimer">*Required Fields</p>
      <form onSubmit={handleSubmit} ref={formRef} className="row">
        {/* Spouse Details */}
        <div className="mb-4 row">
          <label htmlFor="spouse_lastname" className="col-sm-3">
            Spouse&apos;s Last Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="spouse_lastname"
              name="spouse_lname"
              placeholder="Enter spouse's last name"
              value={formData.spouse_lname}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <label htmlFor="spouse_firstname" className="col-sm-3">
            Spouse&apos;s First Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="spouse_firstname"
              name="spouse_fname"
              value={formData.spouse_fname}
              onChange={handleInputChange}
              placeholder="Enter spouse's first name"
              required={formData.spouse_lname} // 'converts any value to a boolean.
            />
          </div>
          <label htmlFor="spouse_extension" className="col-sm-2">
            Extension Name
            <p className="form__sub-label">(ex. Jr./Sr.)</p>
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="spouse_extension"
              name="spouse_ename"
              placeholder="Enter spouse's extension name"
              value={formData.spouse_ename}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-5 row">
          <label htmlFor="spouse_middlename" className="col-sm-3">
            Spouse&apos;s Middle Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="spouse_middlename"
              name="spouse_mname"
              placeholder="Enter spouse's middle name"
              value={formData.spouse_mname}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-4 row">
          <label htmlFor="occupation" className="col-sm-3">
            Occupation*
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="occupation"
              name="spouse_occupation"
              placeholder="Enter occupation"
              value={formData.spouse_occupation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-4 row">
          <label htmlFor="employer" className="col-sm-3">
            Employer/Business Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="employer"
              name="spouse_employer"
              placeholder="Enter employer/business name"
              value={formData.spouse_employer}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-4 row">
          <label htmlFor="spouse_business_address" className="col-sm-3">
            Business Address
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="business_address"
              name="spouse_emp_address"
              placeholder="Enter business address"
              value={formData.spouse_emp_address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Father's Details */}
        <div className="mb-4 row">
          <label htmlFor="father_lastname" className="col-sm-3">
            Father&apos;s Last Name*
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="father_lastname"
              name="father_lname"
              value={formData.father_lname}
              placeholder="Enter father's last name"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <label htmlFor="father_firstname" className="col-sm-3">
            Father&apos;s First Name*
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="father_firstname"
              name="father_fname"
              value={formData.father_fname}
              placeholder="Enter father's first name"
              onChange={handleInputChange}
              required
            />
          </div>

          <label htmlFor="father_extension" className="col-sm-2">
            Extension Name
            <p className="form__sub-label">(ex. Jr./Sr.)</p>
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="father_extension"
              name="father_ename"
              value={formData.father_ename}
              placeholder="Enter father's extension name"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-5 row">
          <label htmlFor="father_middlename" className="col-sm-3">
            Father&apos;s Middle Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="father_middlename"
              name="father_mname"
              value={formData.father_mname}
              placeholder="Enter father's middle name"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Mother's Details */}
        <div className="row mb-4">
          <label htmlFor="mother_lastname" className="col-sm-3">
            Mother&apos;s Last Name*
            <p className="form__sub-label">(Maiden Name)</p>
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="mother_lastname"
              name="mother_mn_lname"
              value={formData.mother_mn_lname}
              placeholder="Enter mother's last name"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <label htmlFor="mother_firstname" className="col-sm-3">
            Mother&apos;s First Name*
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="mother_firstname"
              name="mother_mn_fname"
              value={formData.mother_mn_fname}
              placeholder="Enter mother's first name"
              required
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="mother_extension" className="col-sm-2">
            Extension Name
            <p className="form__sub-label">(Maiden Name; Ex. Jr./Sr.)</p>
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="mother_extension"
              name="mother_mn_ename"
              value={formData.mother_mn_ename}
              onChange={handleInputChange}
              placeholder="Enter mother's extension name"
            />
          </div>
        </div>

        <div className="row">
          <label htmlFor="mother_middlename" className="col-sm-3">
            Mother&apos;s Middle Name
            <p className="form__sub-label">(Maiden Name)</p>
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="mother_middlename"
              name="mother_mn_mname"
              value={formData.mother_mn_mname}
              placeholder="Enter mother's middle name"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Children Details */}
        <div className="children__details ">
          {formData.children.map((child, index) => (
            <div key={index}>
              <div className="mb-4 row mt-5">
                <label htmlFor={`child_fullname_${index}`} className="col-sm-3">
                  Child&apos;s Full Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id={`child_fullname_${index}`}
                    name={`child_fullname`}
                    placeholder="First name, Middle Name, Last Name"
                    value={formData.children[index].child_fullname}
                    onChange={(e) => handleChildInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor={`child_dob_${index}`} className="col-sm-3">
                  Date of Birth
                </label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    id={`child_dob_${index}`}
                    name={`child_dob`}
                    value={formData.children[index].child_dob}
                    required={formData.children[index].child_fullname}
                    onChange={(e) => handleChildInputChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add more children */}
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 d-flex justify-content-between">
              <button
                type="button"
                className="form__btn form__add-btn py-2 px-2 "
                onClick={addChild}
              >
                + Add Child
              </button>

              <button
                type="button"
                className="form__btn form__remove-btn py-2 px-2"
                onClick={removeChild}
              >
                - Remove Child
              </button>
            </div>
          </div>
        </div>

        <hr className="form__line mt-4" />

        {/* Navigate */}
        <div className=" d-flex justify-content-between mt-2 mb-4">
          {/* Back Button */}
          <div>
            <button
              type="button"
              className="btn btn-primary form__navbtn"
              onClick={prevPage}
            >
              Previous Page
            </button>
          </div>

          {error && <p className="text-danger">{error}</p>}

          {/* Submit Button */}
          <div>
            {fromAdmin ? (
              <button
                type="submit"
                className="btn form__navbtn btn-primary"
              >
                Update Form
              </button>
            ) : (
              <button
                type="submit"
                className="btn form__navbtn btn-primary"
                disabled={loading}
              >
                Submit Form
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

FamilyBg.propTypes = {
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  formRef: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  fromAdmin: PropTypes.bool
};

export default FamilyBg;
