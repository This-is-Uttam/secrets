import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HrLine from "./HrLine";
import edit from "../assets/edit.svg";
import copy from "../assets/copy.svg";
import deleteIcon from "../assets/delete_icon.svg";
import visibilityEye from "../assets/visibility_eye.svg";
import visibilityOffEye from "../assets/visibility_off_eye.svg";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {

  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
    id: ""
  });
  const [passwordArray, setpasswordArray] = useState([]);
  const [showPassword, setshowPassword] = useState(false);

  // const url = process.env.MONGO_URI;
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setpasswordArray(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const saveData = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      getData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const editLocally = (id) => {
    let editItem = passwordArray.filter((item) => item.id == id);
    setform(editItem[0]);

    // deleting old password
    setpasswordArray(passwordArray.filter((item) => item.id != id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id != id))
    );
    notify("Please edit the password and save again!");
  };

  const editInDb = (id) => {
    let editItem = passwordArray.filter((item) => item._id == id);
    setform(editItem[0]);

    // // deleting old password
    deleteInDb(id);
    // setpasswordArray(passwordArray.filter((item) => item.id != id));
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(passwordArray.filter((item) => item.id != id))
    // );
    notify("Please edit the password and save again!");
  };

  const deleteLocally = (id) => {
    setpasswordArray(passwordArray.filter((item) => item.id != id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id != id))
    );
    notify("Password deleted successfully!");
  };

  const deleteInDb = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      getData();
    } catch (error) {
      console.error(error.message);
    }

    // setpasswordArray(passwordArray.filter((item) => item.id != id));
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(passwordArray.filter((item) => item.id != id))
    // );
    notify("Password deleted successfully!");
  };

  const saveLocally = () => {
    if (form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      notify("Password saved successfully!");
    } else {
      notify("The Passwords less than 3 characters are not allowed!");
    }

    setform({
      site: "",
      username: "",
      password: "",
      id: "",
    });
  };

  const saveInDb = () => {
    if (form.password.length > 3) {
      saveData(form);

      notify("Password saved successfully!");
    } else {
      notify("The Passwords less than 3 characters are not allowed!");
    }

    setform({
      site: "",
      username: "",
      password: "",
      id: "",
    });
  };

  const notify = (text) => toast(text);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notify("Copied Successfully!");
  };

  const handleChange = (event) => {
    setform({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col lg:max-w-[40vw] sm:max-w-[80vw] max-w-[80vw] m-auto gap-3 py-5 ">
        <input
          className="border rounded-lg px-3 py-2"
          type="text"
          placeholder="Enter Website Link"
          name="site"
          value={form.site}
          onChange={handleChange}
        />
        <input
          className="border rounded-lg px-3 py-2"
          type="text"
          placeholder="Enter Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <div className="flex items-center justify-between border rounded-lg ">
          <input
            className="px-3 py-2 w-full rounded-lg"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <span>
            <img
              onClick={() => {
                setshowPassword(!showPassword);
              }}
              className="cursor-pointer px-3"
              src={showPassword ? visibilityOffEye : visibilityEye}
            />
          </span>
        </div>
      </div>

      <div
        className="m-auto bg-[#c10007] hover:bg-red-800 w-[200px] p-2 my-2 border-2 rounded-4xl text-center font-semibold cursor-pointer"
        onClick={saveInDb}
      >
        Save Password
      </div>

      <HrLine />

      {/* Passwords */}

      <div className="text-2xl font-bold text-center my-5">Your Passwords</div>

      {passwordArray.length != 0 ? (
        // Table design starts here===================================
        //  m-auto text-center rounded-2xl overflow-hidden mb-7 - table
        /* Wrapper: allow horizontal scroll on small screens only */
        <div className="passTable overflow-x-auto w-[100vw] rounded-2xl lg:w-fit m-auto">
          <table className="lg:w-[70vw] lg:m-auto w-full lg:rounded-2xl text-center">
            <thead className="bg-red-700">
              <tr>
                <th className="py-2 px-4 whitespace-nowrap">S. No.</th>
                <th className="py-2 px-4 whitespace-nowrap">Website Link</th>
                <th className="py-2 px-4 whitespace-nowrap">Username</th>
                <th className="py-2 px-4 whitespace-nowrap">Password</th>
                <th className="py-2 px-4 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-[#c1000714]">
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 whitespace-nowrap">{index + 1}</td>

                  <td className="py-2 px-4  whitespace-nowrap" >
                    <div className="flex justify-center items-center gap-2 underline">
                      {/* make the link single-line and truncated if needed */}
                      <Link
                        className="!text-red-500 hover:!text-red-700 underline block truncate max-w-[250px] lg:max-w-[350px]"
                        to={item.site}
                        target="_blank"
                      >
                        {item.site}
                      </Link>

                      <img
                        className="cursor-pointer"
                        src={copy}
                        onClick={() => copyText(item.site)}
                        alt="copy"
                      />
                    </div>
                  </td>

                  <td className="py-2 px-4  whitespace-nowrap" >
                    <div className="flex justify-center items-center gap-2">
                      <span className="block truncate max-w-[150px] whitespace-nowrap">
                        {item.username}
                      </span>
                      <img
                        className="cursor-pointer"
                        src={copy}
                        onClick={() => copyText(item.username)}
                        alt="copy"
                      />
                    </div>
                  </td>

                  <td className="py-2 px-4  whitespace-nowrap" >
                    <div className="flex justify-center items-center gap-2">
                      <span className="block truncate max-w-[150px] whitespace-nowrap">
                        {"•".repeat(item.password.length)}
                      </span>
                      <img
                        className="cursor-pointer"
                        src={copy}
                        onClick={() => copyText(item.password)}
                        alt="copy"
                      />
                    </div>
                  </td>

                  <td className="py-2 px-4 whitespace-nowrap">
                    <div className="flex justify-center items-center gap-5">
                      <img
                        className="cursor-pointer"
                        src={edit}
                        onClick={() => editInDb(item._id)}
                        alt="edit"
                      />
                      <img
                        className="cursor-pointer"
                        src={deleteIcon}
                        onClick={() => deleteInDb(item._id)}
                        alt="delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Table design ends here...
        <div className="text-center my-[50px] text-gray-400">
          No Passwords Found
        </div>
      )}
    </>
  );
};

export default Manager;
