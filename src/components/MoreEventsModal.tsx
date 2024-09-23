import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";

export function MoreEventsModal({ onClose }: { onClose: () => void }) {
  const { selectedDate } = useUI();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-modal-date-header text-2xl">
            {convertDateForModal(selectedDate)}
          </span>
          <button onClick={onClose} className="text-3xl">
            &#215;
          </button>
        </div>
      </div>
    </div>
  );
}
