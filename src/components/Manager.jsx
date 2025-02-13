import React, { useState, useRef, useEffect } from "react";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswordArray(storedPasswords);
  }, []);

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    passwordRef.current.type = isPasswordVisible ? "text" : "password";
    ref.current.src = isPasswordVisible ? "icons/eye-off.png" : "icons/eye.png";
  }, [isPasswordVisible]);

  const savePassword = () => {

    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newForm = { ...form, id: uuidv4() };
      const updatedPasswords = [...passwordArray, newForm];

      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setPasswordArray(updatedPasswords);
      setForm({ site: "", username: "", password: "" });
      toast.success("Password Saved Successfully 🥳");
    } else {
      toast.error("Error❗ : Password not Saved");
    }
  };

  const deletePassword = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this password?`);
    if (confirmDelete) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setPasswordArray(updatedPasswords);
      toast.success("Password Deleted Successfully 🥳");
    }
  };

  const editPassword = (id) => {
    const selectedPassword = passwordArray.find((item) => item.id === id);
    setForm(selectedPassword);
    deletePassword(id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text Copied to Clipboard 🥳!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
      <div className="min-h-[83vh] mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">Pass<span className="text-purple-500">Guard</span></h1>
        <p className="text-black-700 text-lg text-center font-semibold mb-8">Your Personal Security Lockbox</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} name="site" placeholder="Enter Website URL" type="text" className="rounded-full border border-purple-500 w-full p-4 py-1 focus:border-purple-300 focus:outline-none" />
          <input value={form.username} onChange={handleChange} name="username" placeholder="Enter Username" type="text" className="rounded-full border border-purple-500 w-full p-4 py-1 focus:border-purple-300 focus:outline-none" />
          <div className="relative">
            <input ref={passwordRef} type="password" value={form.password} onChange={handleChange} name="password" placeholder="Enter Password" className="rounded-full border border-purple-500 w-full p-4 py-1 focus:border-purple-300 focus:outline-none" />
            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
              <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="eye" />
            </span>
          </div>
          <button onClick={savePassword} className="flex font-semibold text-xl justify-center gap-2 items-center bg-purple-400 text-white rounded-full px-4 py-3 w-fit shadow-lg transform transition-transform duration-300 hover:bg-purple-500 hover:scale-105">
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h1 className="font-bold text-2xl py-5">Your Passwords:</h1>
          {passwordArray.length === 0 && <div className="text-center text-xl font-bold italic">No Passwords to Show!</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-lg overflow-hidden">
              <thead className="bg-purple-800 text-white border-2">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordArray.map((item, index) => (
                  <tr key={index} className="border border-purple-500">
                    <td className="border border-purple-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-2">
                        <a href={item.site} target="_blank" rel="noopener noreferrer">
                          {item.site}
                        </a>
                        <div
                          className="bg-purple-400 p-1 rounded-lg text-white shadow-lg transition-transform duration-300 hover:bg-purple-600 hover:scale-105 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <Copy />
                        </div>
                      </div>
                    </td>

                    <td className="border border-purple-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-2">
                        {item.username}
                        <div
                          className="bg-purple-400 p-1 rounded-lg text-white shadow-lg transition-transform duration-300 hover:bg-purple-600 hover:scale-105 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <Copy />
                        </div>
                      </div>
                    </td>

                    <td className="border border-purple-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-2 relative">
                        <span className="tracking-widest">{'*'.repeat(item.password.length)}</span> {/* Show asterisks equal to password length */}
                        <div
                          className="bg-purple-400 p-1 rounded-lg text-white shadow-lg transition-transform duration-300 hover:bg-purple-600 hover:scale-105 cursor-pointer"
                          onClick={() => copyText(item.password)} // Copies actual password
                          title="Copy Password"
                        >
                          <Copy />
                        </div>
                      </div>
                    </td>


                    <td className="border border-purple-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-5">
                        <span
                          className="cursor-pointer hover:scale-125 hover:text-purple-500 transition-transform duration-300 ease-in-out"
                          onClick={() => editPassword(item.id)}
                        >
                          <Pencil />
                        </span>
                        <span
                          className="cursor-pointer hover:scale-125 text-red-600 hover:text-red-500 transition-transform duration-300 ease-in-out"
                          onClick={() => deletePassword(item.id)}
                        >
                          <Trash2 />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
