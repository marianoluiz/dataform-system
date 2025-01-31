import Header from "../components/Header";
import PropTypes from "prop-types";
import Modal from "../views/Modal/Modal";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Modal />
      <main>{children}</main>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
