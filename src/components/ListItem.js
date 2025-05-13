import { Link } from "react-router-dom";

const ListItem = ({ note }) => {

  const getTitle = (note) => {
    const title = note.body.split("\n")[0];
    if (title.length > 45) {
      return title.slice(0, 45);
    }
    return title;
  };

  const getContent = (note) => {
    let title = getTitle(note);
    let content = note.body.replaceAll('\n', '').replaceAll(title, "");
    return content.slice(0, 30);
  }

  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p> <span>{new Date(note.updated).toLocaleDateString()} { getContent(note)}</span></p>
      </div>
    </Link>
  );
};

export default ListItem;
