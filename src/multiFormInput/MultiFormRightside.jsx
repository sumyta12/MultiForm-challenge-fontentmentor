import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataPassContext } from "./MultifromLeftside";

const MultiFormRightside = () => {
  const { user, setUser } = useContext(DataPassContext);

  const { name, email, phoneNumber, nameError, emailError, phoneError } = user;

  const navigation = useNavigate();

  function handlerClick(event) {
    event.preventDefault();
    if (name && email && phoneNumber) {
      navigation(`./2`, { state: { id: 2 } });
    } else if (name === "") {
      setUser({
        ...user,
        nameError: "This Field is required",
        emailError: "",
        phoneError: "",
      });
    } else if (email === "") {
      setUser({
        ...user,
        nameError: "",
        emailError: "This Field is required",
        phoneError: "",
      });
    } else if (phoneNumber === "") {
      setUser({
        ...user,
        nameError: "",
        emailError: "",
        phoneError: "This Field is required",
      });
    }
  }

  return (
    <div className="_content_1jw4f_9">
      <div className="_cardWrapper_1jw4f_17">
        <div className="_container_whkwo_1 ">
          <h1 className="_title_rjq5t_1 ">Personal info</h1>
          <p className="text-body-lg _description_3ay6g_1 ">
            Please provide your name, email address, and phone number.
          </p>
          <form id="form-:r0:" className="_cardContent_npwrd_1">
            <div>
              <div className="_labelContainer_1xtj3_1">
                <label htmlFor="formInput-:r1:" className="_label_1xtj3_1">
                  Name
                </label>
                <p className="_errorMessage_1xtj3_11" aria-live="polite">
                  {nameError}
                </p>
              </div>

              <input
                id="formInput-:r1:"
                type="text"
                className="_input_1xtj3_16 "
                placeholder="e.g. Stephen King"
                value={name}
                onChange={(e) => {
                  setUser({
                    ...user,
                    name: e.target.value,
                    nameError:
                      e.target.value.length > 0 ? "" : "This Field is required",
                  });
                }}
              />
            </div>
            <div>
              <div className="_labelContainer_1xtj3_1">
                <label htmlFor="formInput-:r2:" className="_label_1xtj3_1">
                  Email Address
                </label>
                <p className="_errorMessage_1xtj3_11" aria-live="polite">
                  {emailError}
                </p>
              </div>
              <input
                id="formInput-:r2:"
                type="email"
                className="_input_1xtj3_16 "
                placeholder="e.g. stephenking@lorem.com"
                value={email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                    emailError:
                      e.target.value.length > 0 ? "" : "This Field is required",
                  })
                }
              />
            </div>
            <div>
              <div className="_labelContainer_1xtj3_1">
                <label htmlFor="formInput-:r3:" className="_label_1xtj3_1">
                  Phone Number
                </label>
                <p className="_errorMessage_1xtj3_11" aria-live="polite">
                  {phoneError}
                </p>
              </div>
              <input
                id="formInput-:r3:"
                type="tel"
                className="_input_1xtj3_16 "
                placeholder="e.g. 1234567890"
                value={phoneNumber}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phoneNumber: e.target.value,
                    phoneError:
                      e.target.value.length > 0 ? "" : "This Field is required",
                  })
                }
              />
            </div>
          </form>
        </div>
      </div>
      <div className="_container_6phnt_1">
        <button
          className="_nextStepButton_6phnt_29"
          form="form-:r0:"
          type="submit"
          onClick={handlerClick}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default MultiFormRightside;
