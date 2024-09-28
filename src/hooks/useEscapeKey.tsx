import { useEffect } from "react";

const modalStack: (() => void)[] = [];

export function useEscapeKey(onClose: () => void) {
  useEffect(() => {
    modalStack.push(onClose); // Register this modal as the most recent one

    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === "Escape" &&
        modalStack[modalStack.length - 1] === onClose
      ) {
        onClose(); // Only close the top-most modal
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Remove modal from the stack on unmount
      const index = modalStack.indexOf(onClose);
      if (index > -1) {
        modalStack.splice(index, 1);
      }
    };
  }, [onClose]);
}
