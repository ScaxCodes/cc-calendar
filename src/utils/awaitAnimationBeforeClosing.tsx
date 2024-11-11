// To ensure we await the fade-out animation before we hide the modal
export function awaitAnimationBeforeClosing(
  modalRef: React.RefObject<HTMLDivElement>,
  setIsAnimatingIn: React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => void,
) {
  setIsAnimatingIn(false);

  function handleAnimationEnd() {
    onClose();
    modalRef.current?.removeEventListener("transitionend", handleAnimationEnd);
  }

  modalRef.current?.addEventListener("transitionend", handleAnimationEnd);
}
