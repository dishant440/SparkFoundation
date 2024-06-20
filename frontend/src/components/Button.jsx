import React from "react";

export default function Button(props) {
  return <div>
    <button className={`text-white ${props.classname}`}>
      {props.text}
    </button>
  </div>;
}
