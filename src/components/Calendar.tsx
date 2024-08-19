export function Calendar() {
  return (
    <div className="border border-red-500 rounded-md max-w-[1500px] m-auto">
      <Navigation />
      <Month />
      <AddEventModal />
      <EventDetailsModal />
      <ViewMoreModal />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="flex items-center gap-4 my-4 ml-4">
      <button className="px-4 py-1 border rounded-md hover:bg-gray-400">
        Today
      </button>
      <button>&lt;</button>
      <button>&gt;</button>
      <span className="font-semibold">August 2024</span>
    </nav>
  );
}

function Month() {
  return <main className="border rounded-md max-w-[1500px]">Days Grid</main>;
}

function AddEventModal() {
  return "";
}

function EventDetailsModal() {
  return "";
}

function ViewMoreModal() {
  return "";
}
