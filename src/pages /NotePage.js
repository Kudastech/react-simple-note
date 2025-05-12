import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useEffect, useState } from "react";

const NotePage = () => {
  const { noteId } = useParams();
  let [note, setNote] = useState(null);
  useEffect(() => {
    getNotes();
  }, [noteId]);

  let getNotes = async () => {
    let response = await fetch(`http://localhost:8001/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };
  // let note = notes.find((note) => note.id === Number(noteId));

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
