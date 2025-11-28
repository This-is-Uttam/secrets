import React from "react";
import logo from "../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Profile from "../Profile";

const Navbar = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  return (
    <>
      <div className="bg-[#af120c] w-screen h-[50px]   px-4 flex justify-between">
        <div className="flex gap-1 py-2">
          <img width={30} src={logo} alt="logo" />
          <div className="text-2xl font-bold">Secrets</div>
        </div>

        {console.log(`isAuthenticated:  ${isAuthenticated}`)}
        {isAuthenticated ? (
          <div className="logged-in-section flex items-center gap-4">
            {/* <LogoutButton /> */}

            <div
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="text font-semibold border-2 border-red-600 outline-1 outline-white  rounded-4xl px-5 py-1 text-red-700 bg-white cursor-pointer hover:bg-red-100"
            >
              Logout
            </div>

            <div className="profile-card">
              <Profile />
            </div>
          </div>
        ) : (
          <div className="flex items-center ">
            <div
              onClick={() => loginWithRedirect()}
              className="text font-semibold border-2 border-red-600 outline-1 outline-white  rounded-4xl px-5 py-1 text-red-700 bg-white cursor-pointer hover:bg-red-100"
            >
              Sign Up
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
