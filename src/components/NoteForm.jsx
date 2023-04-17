import { useContext, useRef, useState } from "react";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";

import { NoteContext } from "../App";

function NoteForm({ onSubmit, onAddTag, availableTags }) {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const { closeNewNoteFormHandler } = useContext(NoteContext);

  function submitHandler(e) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current.value,
      body: bodyRef.current.value,
      tags: selectedTags,
    });
    closeNewNoteFormHandler();
  }

  return (
    <>
      <Form onSubmit={submitHandler} className="note-form">
        <h1 className="mb-4">New Note</h1>
        <Stack gap={3}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label };
                    onAddTag(newTag);
                    setSelectedTags((prev) => [...prev, newTag]);
                  }}
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
            </Col>
          </Row>
          <Form.Group controlId="bodyText">
            <Form.Label>Body</Form.Label>
            <Form.Control required as="textarea" rows={8} ref={bodyRef} />
          </Form.Group>
          <Stack
            direction="horizontal"
            gap={3}
            className="justify-content-center"
          >
            <Button variant="success" size="lg" type="submit">
              Save
            </Button>
            <Button
              size="lg"
              type="button"
              variant="success"
              onClick={closeNewNoteFormHandler}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}

export default NoteForm;
