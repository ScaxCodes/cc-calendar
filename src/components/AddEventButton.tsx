export function AddEventButton({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-0 m-1 flex h-5 w-5 items-center justify-center rounded-full opacity-0 hover:bg-today-button-bg-hover focus:opacity-100 group-hover:opacity-100"
    >
      +
    </button>
  );
}
