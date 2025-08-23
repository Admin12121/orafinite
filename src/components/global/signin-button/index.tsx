import React from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  return (
    <div
      className="btn-wrapper"
      onClick={() => {
        router.push("/register", { scroll: false });
      }}
    >
      <button className="btn">
        <div className="btn-icon">
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
        </div>

        <div className="btn-text">Register</div>
      </button>
    </div>
  );
};

export default SignIn;
