import {useRoutes} from "react-router-dom";
import "./App.css";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {MainLayout} from "./layouts/MainLayout";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {index: true, element: <Home />},
        {path: "about", element: <About />},
      ],
    },
  ]);
};

function App() {
  return <AppRoutes />;
}

export default App;
