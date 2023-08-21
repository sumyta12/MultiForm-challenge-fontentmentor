import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { DataPassContext } from "./MultifromLeftside";

const MultiThirdSide = () => {
  
  const { user, setUser, switchs } = useContext(DataPassContext);
  const navigation = useNavigate();

  const check = !switchs ? "addOnMontly" : "addOnYearly";

  function handlerCheckbox(checked, name) {
    setUser((prev) => {
      return {
        ...prev,
        [check]: prev[check]?.map((addons) => {
          if (addons.name === name) {
            return {
              ...addons,
              click: checked,
            };
          } else {
            return { ...addons };
          }
        }),
      };
    });
  }

  const addOnRender = user[check]?.map(({ name, info, price, click }, id) => {
    return (
      <div
        key={id}
        className={`card-one-design _addon_u47sp_12 ${
          click ? "_checked_u47sp_28" : ""
        }`}>
        <Form.Group
          className="mb-3 width-of-card-one"
          controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            checked={click}
            onChange={(event) => handlerCheckbox(event.target.checked, name)}
          />
        </Form.Group>
        <div className="width-of-card-two">
          <p className="_name_u47sp_56">{name}</p>
          <span className="_description_u47sp_62 ">{info}</span>
        </div>

        <div className="width-of-card-three">
          <p className="_price_u47sp_70">{price}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="_content_1jw4f_9">
      <div className="_cardWrapper_1jw4f_17">
        <div className="_container_whkwo_1 ">
          <h1 className="_title_rjq5t_1 ">Pick add-ons</h1>
          <p className="text-body-lg _description_3ay6g_1 ">
            Add-ons help enhance your gaming experience.
          </p>
          <div className="_cardContent_u47sp_1">
            {addOnRender}
            {
              // two start here
            }
          </div>
        </div>
      </div>
      <div className="_container_6phnt_1">
        <button
          className="_goBackButton_6phnt_14"
          onClick={(event) => {
            event.preventDefault();
            navigation(`/2`,{ state: { id: 2 } });
          }}>
          Go Back
        </button>
        <button
          className="_nextStepButton_6phnt_29"
          onClick={(event) => {
            event.preventDefault();
            navigation(`/4`,{ state: { id: 4 } });

          }}>
          Next Step
        </button>
      </div>
    </div>
  );

};

export default MultiThirdSide;
