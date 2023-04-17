import { useContext, useMemo, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import NoteCard from "./NoteCard";
import { NoteContext } from "../App";

function NoteList({ availableTags, notes, handleNoteSelect }) {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const { closeNewNoteFormHandler } = useContext(NoteContext);

  function handleNoteClick(noteId) {
    handleNoteSelect(noteId);
    closeNewNoteFormHandler();
    if (window.innerWidth <= 768) {
      // Check viewport width for mobile devices
      const list = document.getElementById("note-list");
      list.lastElementChild.scrollIntoView({ behavior: "smooth" });
    }
  }

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <h3>Note List</h3>
      <Form>
        <Form.Group className="mb-2" controlId="title">
          <Form.Control
            type="text"
            placeholder="Search Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="tags">
          <ReactSelect
            placeholder="Search Tags..."
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
          />
        </Form.Group>
      </Form>
      <Row className="mt-2" id="note-list">
        {filteredNotes.map((note) => (
          <Col key={note.id} className="mb-3">
            <NoteCard
              id={note.id}
              title={note.title}
              tags={note.tags}
              onNoteClick={() => handleNoteClick(note.id)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default NoteList;
