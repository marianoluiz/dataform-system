import { NavLink } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


const Home = () => {

  return (
    <>
      <MainLayout>
          <div className="home d-flex align-items-center">
          <div className="home__bg"></div>
          <div className="home__left">
            <h1 className="home__main-text">
              Welcome to Pamantasan ng Lungsod ng Maynila
            </h1>
            <NavLink to="/form" className="btn home__button">
              Register Now
            </NavLink>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
