import { createContext, useState, useEffect } from "react";
import { account } from "../appwrite/appConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [session, setSession] = useState(0);

  const getUserData = () => {
    //get user details
    const userData = account.get();

    userData.then(
      function (response) {
        setUserDetails(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const getUser = () => {
    const getUser = account.getSession("current");
    getUser.then(
      function (response) {
        setUserId(response.userId);
        setSession(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  //fetch userId from user session
  useEffect(() => {
    getUserData();
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ session, userDetails, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
