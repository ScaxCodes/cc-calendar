export function AddEventButton({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-today-button-bg-hover absolute right-0 top-0 m-1 hidden h-5 w-5 items-center justify-center rounded-full group-hover:flex"
    >
      +
    </button>
  );
}
