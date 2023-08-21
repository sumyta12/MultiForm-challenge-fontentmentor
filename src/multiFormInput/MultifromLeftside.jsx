import { createContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const DataPassContext = createContext();

const MultifromLeftside = () => {
  const [switchs, setSwitch] = useState(false);
  const [user, setUser] = useState({
    name: "",
    nameError: "",
    email: "",
    emailError: "",
    phoneNumber: "",
    phoneError: "",
    option: [
      {
        id: 1,
        image: "./../../public/images/assets/images/icon-arcade.svg",
        name: "Arcade",
        pricing: [
          { montly: "$9/mo", userclick: true },
          { yearly: "$90/yr", userclick: false },
        ],
        Yearlyoffertext: "2 Month Free",
        click: true,
      },
      {
        id: 2,
        image: "./../../public/images/assets/images/icon-advanced.svg",
        name: "Advanced",
        pricing: [
          { montly: "$12/mo", userclick: false },
          { yearly: "$120/yr", userclick: false },
        ],
        Yearlyoffertext: "2 Month Free",
        click: false,
      },
      {
        id: 3,
        image: "./../../public/images/assets/images/icon-pro.svg",
        name: "Pro",
        pricing: [
          { montly: "$15/mo", userclick: false },
          { yearly: "$150/yr", userclick: false },
        ],
        Yearlyoffertext: "2 Month Free",
        click: false,
      },
    ],
    addOnMontly: [
      {
        name: "Online service",
        info: "Access to multiplayer games",
        price: "+$1/mo",
        click: false,
      },
      {
        name: "Larger storage",
        info: "Extra 1TB of cloud save",
        price: "+$2/mo",
        click: false,
      },
      {
        name: "Customizable profile",
        info: "Custom theme on your profile",
        price: "+$2/mo",
        click: false,
      },
    ],
    addOnYearly: [
      {
        name: "Online service",
        info: "Access to multiplayer games",
        price: "+$10/yr",
        click: false,
      },
      {
        name: "Larger storage",
        info: "Extra 1TB of cloud save",
        price: "+$20/yr",
        click: false,
      },
      {
        name: "Customizable profile",
        info: "Custom theme on your profile",
        price: "+$20/yr",
        click: false,
      },
    ],
  });

  //console.log("top", user);

  function ClickformInput() {
    console.log("click");
  }

  const location = useLocation();
  const getcurrentid = location.state?.id || 1;

  return (
    <DataPassContext.Provider
      value={{ user, setUser, ClickformInput, switchs, setSwitch }}>
      <div className="_main_1jw4f_1">
        <ul className="_container_19h5t_1">
          <li className="_step_19h5t_12">
            <div
              className={`text-body-md _stepNumber_19h5t_19 ${
                getcurrentid === 1 ? "_active_19h5t_31" : ""
              }`}>
              1
            </div>
            <p className="text-body-sm _stepId_19h5t_37">STEP 1</p>
            <p className="text-body-md _stepName_19h5t_43">Your info</p>
          </li>
          <li className="_step_19h5t_12">
            <div
              className={`text-body-md _stepNumber_19h5t_19 ${
                getcurrentid === 2 ? "_active_19h5t_31" : ""
              }`}>
              2
            </div>
            <p className="text-body-sm _stepId_19h5t_37">STEP 2</p>
            <p className="text-body-md _stepName_19h5t_43">Select plan</p>
          </li>
          <li className="_step_19h5t_12">
            <div
              className={`text-body-md _stepNumber_19h5t_19 ${
                getcurrentid === 3 ? "_active_19h5t_31" : ""
              }`}>
              3
            </div>
            <p className="text-body-sm _stepId_19h5t_37">STEP 3</p>
            <p className="text-body-md _stepName_19h5t_43">Add-ons</p>
          </li>
          <li className="_step_19h5t_12">
            <div
              className={`text-body-md _stepNumber_19h5t_19 ${
                getcurrentid === 4 ? "_active_19h5t_31" : ""
              }`}>
              4
            </div>
            <p className="text-body-sm _stepId_19h5t_37">STEP 4</p>
            <p className="text-body-md _stepName_19h5t_43">Summary</p>
          </li>
        </ul>

        <Outlet />
      </div>
    </DataPassContext.Provider>
  );
};

export default MultifromLeftside;
