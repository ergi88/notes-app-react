import { Badge, Card, NavLink, Stack } from "react-bootstrap";

function NoteCard({ title, tags, onNoteClick }) {
  return (
    <>
      <Card
        as={NavLink}
        className="h-100 "
        style={{ width: "24.4rem" }}
        onClick={onNoteClick}
      >
        <Card.Body>
          <Stack
            gap={2}
            className="align-items-left justify-content-center h-100"
          >
            <h3 className="fs-5">{title}</h3>
          </Stack>
        </Card.Body>
        <Card.Footer>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-left flex-wrap"
            >
              {tags.map((tag) => (
                <Badge bg="success" className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Card.Footer>
      </Card>
    </>
  );
}

export default NoteCard;
