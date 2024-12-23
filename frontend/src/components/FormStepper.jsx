import PropTypes from "prop-types";

/* these props are from MultiPageForm */
const FormStepper = ({
  formPages,
  currentPage,
  disabled,
  adminStyles,
  onPageClick,
  cursorStyle,
}) => {
  return (
    <div className="stepper container" style={adminStyles}>
      {formPages.map((pageStep, index) => (
        <button
          key={index}
          className={`stepper__item ${index === currentPage ? "active" : ""} `}
          onClick={() => onPageClick(index + 1)} //add 1 cuz i subtract 1 when i passed this from admin
          style={cursorStyle}
        >
          {/* If on Completion page, dont render pageSteps Array*/}
          {disabled ? "" : pageStep}
        </button>
      ))}
      {/* add pt-5 if disabled */}
      <div className={`stepper__line ${disabled ? "pt-5" : ""}`}></div>
    </div>
  );
};

// required maker?
FormStepper.propTypes = {
  formPages: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.number,
  onPageClick: PropTypes.func,
  disabled: PropTypes.bool,
  adminStyles: PropTypes.object,
  onTableClick: PropTypes.func,
  cursorStyle: PropTypes.object,
};

export default FormStepper;
