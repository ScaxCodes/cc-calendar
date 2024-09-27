// To ensure we await the fade-out animation before we hide the modal
export function awaitAnimationBeforeClosing(
  setIsAnimatingIn: React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => void,
) {
  setIsAnimatingIn(false);
  setTimeout(() => {
    onClose();
  }, 300);
}
