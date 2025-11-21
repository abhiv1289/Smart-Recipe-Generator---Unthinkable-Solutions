import React from "react";
import "../css/card.css"; // your Uiverse CSS here

export default function Card() {
  return (
    <div className="card">
      {/* Image / Icon Container */}
      <div className="img">
        <div className="save">
          <svg
            className="svg"
            width="683"
            height="683"
            viewBox="0 0 683 683"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_993_25)">
              <mask
                id="mask0_993_25"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="683"
                height="683"
              >
                <path
                  d="M0 -0.00012207H682.667V682.667H0V-0.00012207Z"
                  fill="white"
                ></path>
              </mask>
              <g mask="url(#mask0_993_25)">
                <path
                  d="M148.535 19.9999C137.179 19.9999 126.256 24.5092 118.223 32.5532C110.188 40.5866 105.689 51.4799 105.689 62.8439V633.382C105.689 649.556 118.757 662.667 134.931 662.667H135.039C143.715 662.667 151.961 659.218 158.067 653.09C186.451 624.728 270.212 540.966 304.809 506.434C314.449 496.741 327.623 491.289 341.335 491.289C355.045 491.289 368.22 496.741 377.859 506.434C412.563 541.074 496.752 625.242 524.816 653.348C530.813 659.314 538.845 662.667 547.308 662.667C563.697 662.667 576.979 649.395 576.979 633.019V62.8439C576.979 51.4799 572.48 40.5866 564.447 32.5532C556.412 24.5092 545.489 19.9999 534.133 19.9999H148.535Z"
                  stroke="#CED8DE"
                  strokeWidth="40"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_993_25">
                <rect width="682.667" height="682.667" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Text Section */}
      <div className="text">
        <p className="h3">Meeting your Colleagues</p>
        <p className="p">6 Video - 40 min</p>

        <div className="icon-box">
          <svg
            version="1.1"
            className="svg"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512.001 512.001"
            xmlSpace="preserve"
          >
            {/* SVG content unchanged */}… (your entire second SVG here,
            unchanged) …
          </svg>

          <p className="span">Business Trip</p>
        </div>
      </div>
    </div>
  );
}
