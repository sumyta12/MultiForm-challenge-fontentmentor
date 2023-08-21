import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataPassContext } from "./MultifromLeftside";
import { Form } from "react-bootstrap";

const MultiSecondpage = () => {
  const { user, setUser, switchs, setSwitch } = useContext(DataPassContext);
  const { option } = user;

  const navigation = useNavigate();

  function SelectAnyPricing(selectedId, option) {
    const selectedidFind = user.option.map((idoption) => {
      if (idoption.id === selectedId) {
        const selectedidFind = idoption.pricing;
        const isMonthly = option === "monthly" ? 0 : 1;
        const seletedMap = selectedidFind?.map((item, id) => {
          if (isMonthly === id) {
            return {
              ...item,
              userclick: true,
            };
          } else {
            return {
              ...item,
              userclick: false,
            };
          }
        });
        return {
          ...idoption,
          pricing: seletedMap,
          click: true,
        };
      } else {
        return {
          ...idoption,
          pricing: idoption.pricing.map((item) => {
            return {
              ...item,
              userclick: false,
            };
          }),
          click: false,
        };
      }
    });

    setUser((prev) => {
      return {
        ...prev,
        option: selectedidFind,
      };
    });
  }
  

  const displayOptionRender =
    user &&
    option?.map((optionsee) => {
      const price = optionsee?.pricing?.map(({ yearly, montly }) => {
        return switchs ? yearly : montly;
      });

      return (
        <div
          key={optionsee?.id}
          className={`_planWrapper_tfbqj_7 individual--billing--css ${
            optionsee?.click ? " background-color-change" : ""
          }`}
          onClick={() =>
            SelectAnyPricing(optionsee?.id, switchs ? "yearly" : "monthly")
          }>
          <img src={optionsee?.image} className="_planIcon_tfbqj_40" />
          <p className="_planName_tfbqj_48">{optionsee?.name}</p>
          <p className="_planPrice_tfbqj_54">
            {price}
            <br />
            {switchs && optionsee?.Yearlyoffertext}
          </p>
        </div>
      );
    });


  return (
    <div className="_content_1jw4f_9">
      <div className="_cardWrapper_1jw4f_17">
        <div className="_container_whkwo_1 ">
          <h1 className="_title_rjq5t_1 ">Select your plan</h1>
          <p className="text-body-lg _description_3ay6g_1 ">
            You have the option of monthly or yearly billing.
          </p>
          <div className="_planList_tfbqj_1">{displayOptionRender}</div>

          <div className="_container_im6rp_1 _priceTypeSelector_tfbqj_68 mt-4 d-flex justify-content-evenly">
            <p>Montly</p>
            <Form>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label=""
                checked={switchs}
                onChange={(e) => {
                  const optionChecker = user?.option?.filter((item) => {
                    return item.click === true;
                  })[0].id;
                  const switchs = e.target.checked ? "yearly" : "monthly";
                  SelectAnyPricing(optionChecker, switchs);
                  setSwitch(e.target.checked);
                }}
              />
            </Form>
            <p>Yearly</p>
          </div>
        </div>
      </div>
      <div className="_container_6phnt_1">
        <button
          className="_goBackButton_6phnt_14"
          onClick={(event) => {
            event.preventDefault();
            navigation(`/`, { state: { id: 1 } });
          }}>
          Go Back
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            navigation(`/3`, { state: { id: 3 } });
          }}
          className="_nextStepButton_6phnt_29">
          Next Step
        </button>
      </div>
    </div>
  );
  
};

export default MultiSecondpage;
