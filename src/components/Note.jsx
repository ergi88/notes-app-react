import { useContext } from "react";
import { NoteContext } from "../App";
import { Badge, Button, Stack } from "react-bootstrap";

function Note({ notes, onDelete }) {
  const { selectedNoteId } = useContext(NoteContext);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (selectedNote) {
    return (
      <div>
        <h1>{selectedNote.title}</h1>
        {selectedNote.tags.length > 0 && (
          <Stack gap={1} direction="horizontal" className="flex-wrap">
            {selectedNote.tags.map((tag) => (
              <Badge bg="success" className="text-truncate" key={tag.id}>
                {tag.label}
              </Badge>
            ))}
          </Stack>
        )}
        <br />
        <p>{selectedNote.body}</p>
        <Button
          variant="danger"
          type="button"
          size="lg"
          style={{ position: "absolute", top: "1.3rem", right: "1rem" }}
          onClick={() => {
            onDelete(selectedNote.id);
          }}
        >
          DELETE
        </Button>
      </div>
    );
  } else {
    return <h2>No note selected</h2>;
  }
}

export default Note;
