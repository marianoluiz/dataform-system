import { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";
import * as StudentApi from "../../api/StudentApi"; // api
import ChartComponent, {
  chartOptions,
  ageLineOptions,
  citizenshipBarOptions,
  civilStatusBarOptions,
} from "../../components/ChartComponent.jsx";

const AdminDashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0); // Use state for totalStudents
  const [sexStats, setSexStats] = useState({ male: 0, female: 0 });
  const [citizenshipStats, setCitizenshipStats] = useState({ filipino: 0, dual_citizen: 0});
  const [civilStatusStats, setCivilStatusStats] = useState({ single: 0, married: 0, divorced: 0, others: 0});
  const [ageStats, setAgeStats] = useState({});



  // get student data with component mounts
  useEffect(() => {
    const getStudentData = async () => {
      try {
        const data = await StudentApi.getStudentData();
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    
    getStudentData();
  }, []);

  // Calculate statistics
  useEffect(() => {
    const calculateStats = () => {

      studentData.forEach((student) => {
        // student is one index of an array

        // Gender stats
        if (student.sex_id === 1) {
          sexStats.male += 1;
        } else if (student.sex_id === 2) {
          sexStats.female += 1;
        }

        // Citizenship stats
        if (student.cit_id === 1) {
          citizenshipStats.filipino += 1;
        } else if (student.cit_id === 2) {
          citizenshipStats.dual_citizen += 1;
        }

        // Civil status stats
        if (student.cstat_id === 1) {
          civilStatusStats.single += 1;
        } else if (student.cstat_id === 2) {
          civilStatusStats.married += 1;
        } else if (student.cstat_id === 3) {
          civilStatusStats.divorced += 1;
        } else if (student.cstat_id === 4) {
          civilStatusStats.others += 1;
        }

        // Age stats
        // calculate frst
        const age = calculateAge(student.dob);
        if (ageStats[age])
          ageStats[age] += 1;
        else
          ageStats[age] = 1;
        
      });

      setSexStats(sexStats);
      setCitizenshipStats(citizenshipStats);
      setCivilStatusStats(civilStatusStats);
      setAgeStats(ageStats);
      setTotalStudents(studentData.length);
    };

    calculateStats();
  }, [studentData]);

  // Helper function to calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the birth month hasn't occurred yet this year, or it's the birth month but the birth day hasn't occurred yet, subtract 1 from the age
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    )
      age--;

    return age;
  };

  // Gender - Pie Chart
  const genderPieData = {
    labels: ["Male", "Female"], // Labels for each slice
    datasets: [
      {
        label: "Gender Distribution",
        data: [sexStats.male, sexStats.female], // Values for each slice
        backgroundColor: ["#40BBD0", "#D040C9"], // Male: blue, Female: red
        hoverOffset: 4,
      },
    ],
  };

  // Horizontal Bar Graph Data for Civil Status
  const civilStatusBarData = {
    labels: Object.keys(civilStatusStats), // Civil status types (e.g., 'Single', 'Married')
    datasets: [
      {
        label: "Civil Status",
        data: Object.values(civilStatusStats),
        backgroundColor: [
          "rgb(75, 192, 192)", // Teal border for the first item
          "rgb(255, 99, 132)", // Red border for the second item
          "rgb(54, 162, 235)", // Blue border for the third item
          "rgb(153, 102, 255)", // Purple border for the fourth item
          "rgb(255, 159, 64)", // Orange border for the fifth item
        ],
        borderWidth: 1,
      },
    ],
  };

  // Citizenship - Bar Graph
  const citizenshipBarData = {
    labels: Object.keys(citizenshipStats),
    datasets: [
      {
        label: "Citizenship Types",
        data: Object.values(citizenshipStats), // Corresponding counts for each type
        backgroundColor: [
          "rgb(255, 159, 64)", // Orange border for the fifth item
          "rgb(54, 162, 235)", // Blue border for the third item
          "rgb(75, 192, 192)", // Teal border for the first item
          "rgb(255, 99, 132)", // Red border for the second item
          "rgb(153, 102, 255)", // Purple border for the fourth item
        ],
        borderWidth: 0,
      },
    ],
  };

  // Age - Line Graph
  const ageLineData = {
    labels: Object.keys(ageStats), // X-axis labels (age groups)
    datasets: [
      {
        label: "Age Data Graph", // Dataset label
        data: Object.values(ageStats), // Y-axis data corresponding to the labels
        fill: false, // Do not fill the area under the line
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1, // Smoothness of the line (lower value = less curve)
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="admin__dashboard container">
        <div className="row">
          {/* 1st col */}
          <div className="col-sm-9 dashboard__col">
            {/* 1st col, 1st row */}
            <div className="row">
              <div className="dashboard__col dashboard__total-stud col-sm-6 p-4">
                <div className="card card__total-stud">
                  <div className="card-body">
                    <p className="card-text">Total number of students</p>
                    <h1 className="card-title num__student">{totalStudents}</h1>
                  </div>
                </div>
              </div>
              <div className="dashboard__col col-sm-6">
                <h1 className="dashboard__title">Dashboard</h1>
              </div>
            </div>
            {/* 1st col, 2nd row */}
            <div className="row">
              {/* Bar graph horizontal, Civil Status */}
              <div className="dashboard__col dashboard__civil col-sm-6 mt-3">
                <div className="card">
                  <div className="card-body civil__graph-wrapper">
                    <ChartComponent
                      className="civil__graph"
                      type="bar"
                      data={civilStatusBarData}
                      options={civilStatusBarOptions}
                    />
                  </div>
                </div>

                {/*                                 <ul>
                                    {Object.entries(civilStatusStats).map(
                                        ([status, count]) => (
                                            <li key={status}>
                                                {status}: {count}
                                            </li>
                                        ),
                                    )}
                                </ul> */}
              </div>
              {/* Bar graph vertical, Citizenship Type */}
              <div className="dashboard__col dashboard__citizen col-sm-6 mt-3">
                <div className="card">
                  <div className="card-body citizenship__graph-wrapper">
                    <ChartComponent
                      className="citizenship__graph"
                      type="bar"
                      data={citizenshipBarData}
                      options={citizenshipBarOptions}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 1st col, 3rd row */}
            <div className="row">
              <div className="dasboard__col dashboard__age col-sm-12  mt-3">
                <div className="card">
                  <div className="card-body age__graph-wrapper">
                    <ChartComponent
                      className="age__graph"
                      type="line"
                      data={ageLineData}
                      options={ageLineOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd col */}
          <div className="dashboard__col dashboard__gender col-sm-3 py-4">
            <div className="card card__gender">
              <p className="card-title pt-3 text-center">Gender Pie Chart</p>
              <div className="card-body ">
                <div className="gender__graph-wrapper">
                  <ChartComponent
                    className="gender__graph"
                    type="pie"
                    data={genderPieData}
                    options={chartOptions}
                  />
                </div>

                <ul className="list-unstyled text-center mt-5">
                  <li className="mb-3">
                    <h6 className="text-muted">Number of Male</h6>
                    <p
                      className="fs-4 mb-0 fw-bold"
                      style={{ color: "#40BBD0" }}
                    >
                      {sexStats.male}
                    </p>
                  </li>
                  <li className="mb-3">
                    <h6 className="text-muted">Number of Female</h6>
                    <p
                      className="fs-4 mb-0 fw-bold"
                      style={{ color: "#D040C9" }}
                    >
                      {sexStats.female}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
