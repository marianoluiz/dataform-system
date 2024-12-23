import plmLogoBannerBlurred from "../img/plm-logo-banner-blurred.png";

const FormBanner = () => {
  return (
    <>
      <div className="form__banner container">
        <h1 className="form__banner-h1">Pamantasan ng Lungsod ng Maynila</h1>
        <h4 className="form__banner-h4">Online Registration</h4>
        <img
          src={plmLogoBannerBlurred}
          alt="Pamantasan ng Lungsod ng Maynila Logo Design"
          className="form__banner-img"
        />
      </div>
    </>
  );
};

export default FormBanner;
