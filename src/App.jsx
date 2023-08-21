import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MultifromLeftside from "./multiFormInput/MultifromLeftside";
import MultiFormRightside from "./multiFormInput/MultiFormRightside";
import MultiSecondpage from "./multiFormInput/MultiSecondpage";
import MultiThirdSide from "./multiFormInput/MultiThirdSide";
import MultiPageFourthnoPage from "./multiFormInput/MultiPageFourthnoPage";

const routerdata = createBrowserRouter([
  {
    path: "/",
    element: <MultifromLeftside />,
    children: [
      {
        path: "/",
        element: <MultiFormRightside />,
      },
      {
        path: "/2",
        element: <MultiSecondpage />,
      },
      {
        path: "/3",
        element: <MultiThirdSide />,
      },
      {
        path: "/4",
        element: <MultiPageFourthnoPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routerdata} />;
}

export default App;
