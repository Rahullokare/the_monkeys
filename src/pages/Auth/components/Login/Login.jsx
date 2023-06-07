import LoginButton from "../../../../components/LoadingButton/LoadingButton";
import LoginSvg from "../../../../assets/Login.svg";
import { Controller } from "react-hook-form";
import { useLoginForm } from "./hooks";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "izitoast-react";
import { Alert } from "../../../../common/utils/alertConfig";

export const Login = () => {
  const { control, formState, handleSubmit } = useLoginForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successAlert = useToast(Alert("Login successful").success);
  const errorAlert = useToast(Alert("Something went wrong").error);

  const { isLoading } = useSelector((state) => state.auth);

  const onSubmit = useCallback(
    (data) => {
      dispatch(loginUser(data)).then((response) => {
        if (response && response.type === "auth/loginUser/fulfilled") {
          successAlert();
          navigate("/profile");
        }

        if (response && response.type === "auth/loginUser/rejected") {
          errorAlert();
        }
      });
    },
    [dispatch, errorAlert, successAlert, navigate]
  );

  return (
    <section
      className="container mx-auto flex items-center justify-center md:justify-end"
      data-testid="login"
    >
      <div className="hidden md:block w-1/2 p-24 pl-0">
        <img className="slide" src={LoginSvg} alt="illustration" />
      </div>
      <form
        className="slideDown py-28 md:py-0 text-2xl md:w-1/2 md:pl-28 bg-white flex flex-col space-y-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <label>Email:</label>
              <input
                className="border-solid border-2 border-lightBlack rounded-sm mt-2 w-full p-4"
                type="text"
                placeholder="Enter your email"
                value={value}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {formState?.errors?.email?.message}
              </span>
            </div>
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field: { value, onChange } }) => (
            <div>
              <label>Password:</label>
              <input
                className="border-solid border-2 border-lightBlack rounded-sm mt-2 w-full p-4"
                type="password"
                placeholder="Enter your password"
                value={value}
                onChange={onChange}
              />
              <span style={{ color: "red" }}>
                {formState?.errors?.password?.message}
              </span>
            </div>
          )}
        />
        <LoginButton
          text="Login"
          onSubmit={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
        />
      </form>
    </section>
  );
};