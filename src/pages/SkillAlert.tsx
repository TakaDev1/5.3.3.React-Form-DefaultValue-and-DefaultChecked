import React from "react";
import useHandleSkill from "../hooks/useHandleSkill";

const SkillAlert = () => {
  const { htmlRef, cssRef, jsRef, handleSubmit } = useHandleSkill();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="html" className="flex gap-2 mx-auto">
        <input id="html" type="checkbox" ref={htmlRef} />
        HTML
      </label>

      <label htmlFor="css" className="flex gap-2 mx-auto">
        <input id="css" type="checkbox" ref={cssRef} />
        CSS
      </label>

      <label htmlFor="js" className="flex gap-2 mx-auto">
        <input id="js" type="checkbox" ref={jsRef} />
        JS
      </label>

      <button type="submit" className="bg-gray-500 text-white w-1/4 mx-auto py-1 rounded-full ">
        送信
      </button>
    </form>
  );
};

export default SkillAlert;
