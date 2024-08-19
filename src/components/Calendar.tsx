export function Calendar() {
  return (
    <>
      <Navigation />
      <Month />
      <AddEventModal />
      <EventDetailsModal />
      <ViewMoreModal />
    </>
  );
}

function Navigation() {
  return <button>Today</button>;
}

function Month() {
  return <h1>August</h1>;
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
