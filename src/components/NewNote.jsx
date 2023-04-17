import NoteForm from "./NoteForm";

function NewNote({ onSubmit, onAddTag, availableTags }) {
  return (
    <>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default NewNote;
