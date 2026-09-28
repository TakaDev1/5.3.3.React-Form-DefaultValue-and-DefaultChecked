import React from "react";
import useHandleSkill from "../hooks/useHandleSkill";

const SkillAlert = () => {
  const { htmlRef, cssRef, jsRef, handleSubmit } = useHandleSkill();
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="html">
        <input id="html" type="checkbox" ref={htmlRef} />
        HTML
      </label>
      <label htmlFor="css">
        <input type="checkbox" ref={cssRef} />
        CSS
      </label>
      <label htmlFor="js">
        <input type="checkbox" ref={jsRef} />
        JS
      </label>
      <button type="submit">送信</button>
    </form>
  );
};

export default SkillAlert;
