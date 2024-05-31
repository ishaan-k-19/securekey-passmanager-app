import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/closedeye.png")) {
      ref.current.src = "icons/eyeopen.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/closedeye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    toast('Password Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
    setForm({ site: "", username: "", password: "" })
  };
  const deletePassword = (id) => {
    toast('Password Deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)));
    }
  };
  const editPassword = (id) => {
    setForm(passwordArray.filter(i => i.id === id)[0])
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast('Text copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
      <ToastContainer />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-white opacity-20 blur-[100px]"></div>
      </div>

      <div className=" flex flex-col md:px-32 ms:py-16 px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Secure
          <span className="text-green-500">Key/&gt;</span>
        </h1>

        <p className="text-gray-900 md:text-lg text-center pb-8 text-base">
          Your own Password Manager
        </p>

        <div className="flex flex-col md:p-4 p-2 text-black md:gap-8 gap-4 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            className="rounded-full border border-green-500 w-full px-4 py-2"
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full gap-4 md:gap-6 flex-col md:flex-row">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full md:w-2/3 px-4 py-2"
              name="username"
              type="text"
            />
            <div className="relative md:w-[40%] w-full">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className=" relative rounded-full border w-full border-green-500 px-4 py-2"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[10px] top-[8px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/closedeye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex bg-green-500 rounded-full justify-center px-6 py-3 w-fit hover:bg-green-600 items-center gap-2 my-4"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className=" font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className=" bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            <span>{item.site}</span>
                          </a>
                          <div
                            className="lordIconCopy size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "2px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <div
                            className="lordIconCopy size-7 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "2px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span>{"*".repeat(item.password.length)} </span>
                          <div
                            className="lordIconCopy size-7 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "2px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center relative">
                        <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
