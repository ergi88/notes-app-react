import { Button, Card, Row, Stack } from "react-bootstrap";
import "./App.css";
import NewNote from "./components/NewNote";
import { useLocalStorage } from "./hook/useLocalStorage";
import { createContext, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";
import Note from "./components/Note";

export const NoteContext = createContext();

function App() {
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState("null");

  const handleNoteSelect = (id) => {
    setSelectedNoteId(id);
  };

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }) => {
    setNotes((prevNotes) => {
      return [
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map((tag) => tag.id),
        },
        ...prevNotes,
      ];
    });
  };

  const addTag = (tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const showFormHandler = () => {
    setShowNewNoteForm(true);
  };
  const closeNewNoteFormHandler = () => {
    setShowNewNoteForm(false);
  };

  const deleteHandler = (id) => {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  };

  return (
    <NoteContext.Provider value={{ selectedNoteId, closeNewNoteFormHandler }}>
      <div className="header-wrapper">
        <h1>NOTES</h1>
        <Button
          variant="success"
          onClick={showFormHandler}
          className="mb-2"
          style={{ width: 200, height: 50 }}
        >
          Create New Note
        </Button>
      </div>
      <div className="grid-container">
        <Card className="grid-cards main">
          <NoteList
            availableTags={tags}
            notes={notesWithTags}
            handleNoteSelect={handleNoteSelect}
          />
        </Card>
        <Card className="grid-cards content">
          {showNewNoteForm && (
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          )}
          {selectedNoteId && !showNewNoteForm && (
            <Note onDelete={deleteHandler} notes={notesWithTags} />
          )}
        </Card>
      </div>
    </NoteContext.Provider>
  );
}

export default App;
