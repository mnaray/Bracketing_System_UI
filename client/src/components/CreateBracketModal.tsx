import React, { useState } from "react";

interface CreateBracketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBracket: (numParticipants: number) => void;
}

const CreateBracketModal: React.FC<CreateBracketModalProps> = ({
  isOpen,
  onClose,
  onCreateBracket,
}) => {
  const [numParticipants, setNumParticipants] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedNumParticipants = parseInt(numParticipants);
    if (!isNaN(parsedNumParticipants)) {
      onCreateBracket(parsedNumParticipants);
      onClose();
    } else {
      alert(
        "Bitte geben Sie eine gültige Zahl für die Anzahl der Teilnehmer ein."
      );
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create Bracket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="numParticipants"
              className="block text-sm font-medium text-gray-700"
            >
              Anzahl Teilnehmer
            </label>
            <input
              type="number"
              id="numParticipants"
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2 border-black"
              value={numParticipants}
              onChange={(e) => setNumParticipants(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBracketModal;
