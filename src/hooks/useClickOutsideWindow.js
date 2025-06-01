import { useEffect, useRef } from "react";

function useClickOutsideWindow(handlr, eventCapture = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          e.stopPropagation();
          handlr();
        }
      }
      document.addEventListener("click", handleClickOutside, eventCapture);
      return () => {
        document.removeEventListener("click", handleClickOutside, eventCapture);
      };
    },
    [handlr, ref, eventCapture]
  );
  return ref;
}

export { useClickOutsideWindow };
