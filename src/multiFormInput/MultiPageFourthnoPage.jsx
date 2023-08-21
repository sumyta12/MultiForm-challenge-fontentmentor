import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataPassContext } from "./MultifromLeftside";

const MultiPageFourthnoPage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState(false);
  const { user, switchs, setUser } = useContext(DataPassContext);
  const checkers = !switchs ? "addOnMontly" : "addOnYearly";

  const [total, settotal] = useState(() => calculatorfunction());

  const navigation = useNavigate();

  function calculatorfunction() {
    const number = (price) =>
      price.split("").filter((num) => {
        return !isNaN(num);
      });

    const addnumber = user[checkers]
      ?.filter((addonuser) => {
        return addonuser.click === true;
      })
      .map((addonprice) => number(addonprice.price).join(""))
      .flat()
      .reduce((acc, pres) => {
        return acc + parseInt(pres);
      }, 0);

    const packageprice = user?.option
      ?.filter((addonprice) => {
        return addonprice.click === true;
      })
      .flatMap((item) => {
        return item?.pricing;
      })
      .filter((pricing) => pricing.userclick === true)
      .map((item) => {
        const tag = !switchs ? "montly" : "yearly";

        return number(item[tag]);
      })[0]
      .join("");

    return addnumber + parseInt(packageprice);
  }

  const optionRenderFinishingUpdate = user?.option
    ?.filter((singleoptions) => {
      return singleoptions.click === true;
    })
    .map((singleoptions) => {
      const optionly = !switchs ? "(Monthly)" : "(Yearly)";

      const priceseleted = singleoptions?.pricing
        ?.filter((pricing) => {
          return pricing.userclick === true;
        })
        .map((pricing, i) => {
          const { montly = "", yearly = "" } = pricing;
          const check = yearly ? yearly : montly;

          return (
            <p key={i} className="_price_1av3b_42">
              {check}
            </p>
          );
        });

      return (
        <div key={singleoptions.name} className="_planSummary_1av3b_19">
          <p className="_name_1av3b_25">
            {singleoptions.name + " " + optionly}
          </p>
          <button
            className="_changeBtn_1av3b_30"
            onClick={(event) => {
              event.preventDefault();
              navigation(`/2`, { state: { id: 2 } });
            }}>
            Change
          </button>
          {priceseleted}
        </div>
      );
    });
  // console.log(optionRenderFinishingUpdate);

  const RenderFinishingaddUpdata = user[checkers]
    ?.filter((addonuser) => {
      return addonuser.click === true;
    })
    .map(({ name, price }) => {
      return (
        <p key={name} className="_addon_1av3b_59">
          <span className="_name_1av3b_25">{name}</span>
          <span className="_price_1av3b_42">{price}</span>
        </p>
      );
    });

  function handlerConfirm() {
    if (user.name && user.email && user.phoneNumber) {
      setWelcomeMessage(true);
      setUser({ ...user, name: "", email: "", phoneNumber: "" });
    }
  }

  return (
    <div className="_content_1jw4f_9">
      {welcomeMessage === true ? (
        <>
          <div className="_thankYouCardWrapper_1jw4f_24">
            <div className="_ss _container_whkwo_1 _card_1atl2_1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                className="_icon_1atl2_6"
                aria-hidden="true">
                <g fill="none">
                  <circle cx="40" cy="40" r="40" fill="#F9818E"></circle>
                  <path
                    fill="#E96170"
                    d="M48.464 79.167c.768-.15 1.53-.321 2.288-.515a40.04 40.04 0 0 0 3.794-1.266 40.043 40.043 0 0 0 3.657-1.63 40.046 40.046 0 0 0 12.463-9.898A40.063 40.063 0 0 0 78.3 51.89c.338-1.117.627-2.249.867-3.391L55.374 24.698a21.6 21.6 0 0 0-15.332-6.365 21.629 21.629 0 0 0-15.344 6.365c-8.486 8.489-8.486 22.205 0 30.694l23.766 23.775Z"></path>
                  <path
                    fill="#FFF"
                    d="M40.003 18.333a21.58 21.58 0 0 1 15.31 6.351c8.471 8.471 8.471 22.158 0 30.63-8.47 8.47-22.156 8.47-30.627 0-8.47-8.472-8.47-22.159 0-30.63a21.594 21.594 0 0 1 15.317-6.35Zm9.865 15c-.316.028-.622.15-.872.344l-12.168 9.13-5.641-5.642c-1.224-1.275-3.63 1.132-2.356 2.356l6.663 6.663c.56.56 1.539.63 2.173.156l13.326-9.995c1.122-.816.43-2.993-.956-3.013a1.666 1.666 0 0 0-.17 0Z"></path>
                </g>
              </svg>
              <h1 className="_title_rjq5t_1 _title_1atl2_11">Thank you!</h1>
              <p className="text-body-lg _description_3ay6g_1 _description_1atl2_15">
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
              </p>
              <Link to="/">Go Back Home</Link>
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="_cardWrapper_1jw4f_17">
            <div className="_container_whkwo_1 ">
              <h1 className="_title_rjq5t_1 ">Finishing up</h1>
              <p className="text-body-lg _description_3ay6g_1 ">
                Double-check everything looks OK before confirming.
              </p>
              <div className="_cardContent_1av3b_1">
                <div className="_summary_1av3b_12">
                  {optionRenderFinishingUpdate}
                  <div className="_addonList_1av3b_59">
                    {RenderFinishingaddUpdata}
                  </div>
                </div>
              </div>
              <div className="_total_1av3b_84">
                <p className="_label_1av3b_91">
                  Total (per {!switchs ? "month" : "yearly"})
                </p>
                <p className="_price_1av3b_42">
                  ${total}/{!switchs ? "mo" : "yr"}
                </p>
              </div>
            </div>
          </div>
          <div className="_container_6phnt_1">
            <button
              className="_goBackButton_6phnt_14"
              onClick={(event) => {
                event.preventDefault();
                navigation(`/3`, { state: { id: 3 } });
              }}>
              Go Back
            </button>
            <button
              className="_confirmButton_6phnt_49"
              onClick={handlerConfirm}>
              Confirm
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiPageFourthnoPage;
