import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "10px",
          }}
        >
          <div className="max-w-full md:max-w-3xl w-full flex flex-col gap-4 bg-black opacity-65 p-1 md:p-5">
            <h1 className="text-lg md:text-5xl font-bold ">
              Define yourself in a unique way
              <br />
              and showcase your individuality
            </h1>
            <p className="md:text-[1.2rem] text-base">
              Unlock your true potential here in <span className="font-bold text-xl text-fuchsia-500">Futuerlabs/Enterprise plc</span> and let your creativity shine. Whether
              its through your style, your skills, or your story—start your
              journey now.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 px-6 py-3 text-lg font-medium rounded-md mt-6 text-white">
            <Link to={"/signUp"}>Get Started</Link> <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
