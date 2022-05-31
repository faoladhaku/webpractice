import React, { forwardRef } from "react";

const Rocket = forwardRef(({ name, id }, ref) => {
  return (
    <div ref={ref}>
      <p>{name}</p>
    </div>
  );
});

export default Rocket;
