import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useEffect, useState } from "react";

const NotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  let [note, setNote] = useState(null);
  useEffect(() => { noteId !== 'new' ? getNotes() : setNote({ body: "" }); }, [noteId]);

  const getNotes = async () => {
    let response = await fetch(`http://localhost:8001/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    await fetch(`http://localhost:8001/notes/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const updateNote = async () => {
    await fetch(`http://localhost:8001/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:8001/notes/${noteId}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  const handleSubmit = async () => {
    if (noteId === 'new') {
      if (note.body) {
        await createNote();
      }
    } else {
      if (! note.body) {
        await deleteNote();
        return;
      } else {
        await updateNote();
      }
    }
    navigate("/");
  };
  
  if (! note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={ handleSubmit } />
          </Link>
        </h3>
        { noteId !== "new" ? (<button onClick={deleteNote}>Delete</button>
        ) : (<button onClick={handleSubmit}>Done</button>
            
        )}
      </div>
      <textarea onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
