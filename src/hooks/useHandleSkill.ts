import { useRef } from "react";

const useHandleSkill = () => {
  const htmlRef = useRef<HTMLInputElement>(null);
  const cssRef = useRef<HTMLInputElement>(null);
  const jsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const selected: string[] = [];

    if (htmlRef.current.checked) selected.push("HTML");
    if (cssRef.current.checked) selected.push("CSS");
    if (jsRef.current.checked) selected.push("JS");

    if (selected.length > 0) {
      alert(`${selected.join(",")}が選択されました`);
    } else {
      alert("何も選択されていません");
    }

    htmlRef.current.checked = null;
    cssRef.current.checked = null;
    jsRef.current.checked = null;
  };

  return { htmlRef, cssRef, jsRef, handleSubmit };
};

export default useHandleSkill;
