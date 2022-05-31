import React from "react";

const Name = ({ name, setData, el }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setData(el);
        console.log(el);
      }}
    >
      {name}
    </div>
  );
};

export default Name;
