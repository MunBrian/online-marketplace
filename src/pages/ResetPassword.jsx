import { useState } from "react";
import { account } from "../appwrite/appConfig";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const secret = queryParams.get("secret");

  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });

  const handleResetPassword = (e) => {
    e.preventDefault();

    //check if passwords match
    if (passwords.password1 !== passwords.password2) {
      toast.error("Passwords do not match!!!");
      setPasswords({
        password1: "",
        password2: "",
      });
      return;
    }

    //check if password length is > 8
    if (passwords.password1.length < 8) {
      toast.error("Password must contain 8 characters or more!!!");
      setPasswords({
        password1: "",
        password2: "",
      });
      return;
    }

    const { password1, password2 } = passwords;

    const promise = account.updateRecovery(
      userId,
      secret,
      password1,
      password2
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        setTimeout(() => {
          //navigate to signin page
          navigate("/signin");
        }, 5000);
        toast.success("Password reset was successful.", {
          autoClose: 4000,
        });
      },
      function (error) {
        toast.error("Error while resetting password.");
        console.log(error); // Failure
      }
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <p className="text-md text-gray-900 font-thin dark:text-white">
            Your new password must be different from previous used passwords.
          </p>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleResetPassword}
          >
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={passwords.password1}
                onChange={(e) =>
                  setPasswords({ ...passwords, password1: e.target.value })
                }
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={passwords.password2}
                onChange={(e) =>
                  setPasswords({ ...passwords, password2: e.target.value })
                }
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
