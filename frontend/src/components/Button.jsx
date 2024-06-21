import React from "react";

export default function Button(props) {
  return <div onClick={props.onClick}>
    <button className={`text-white ${props.classname}`}>
      {props.text}
    </button>
  </div>;
}
