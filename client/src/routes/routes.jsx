// import DashboardPage from "../pages/dashboard/index.jsx";
// import ProtectedRoute from "./ProtectedRoute.jsx";
import LandingPage from '../pages/landingpage/index.jsx';
// import ProfilePage from "../pages/profilepage/index.jsx";
const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  
  // {
  //   element : <ProtectedRoute/>,
  //   children : [
  //     {
  //       path: "/dashboard",
  //       element: <DashboardPage/>
  //     },
  //     {
  //       path: "/profile",
  //       element: <ProfilePage/>
  //     },
  //   ]
  // },
  
];

export default routes;
