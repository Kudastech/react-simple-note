import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useEffect, useState } from "react";
import NoteService from "../services/NoteService";

const NotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  let [note, setNote] = useState(null);
  useEffect(() => { 
    noteId !== 'new' ? getNotes() : setNote({ body: "" }); 
  }, [noteId]);

  const getNotes = async () => {
    const data = await NoteService.getNote(noteId);
    setNote(data);
  };

  const handleSubmit = async () => {
    if (noteId === 'new') {
      if (note.body) {
        await NoteService.createNote(note);
      }
    } else {
      if (! note.body) {
        await NoteService.deleteNote(noteId);
        return;
      } else {
        await NoteService.updateNote(noteId, note);
      }
    }
    navigate("/");
  };

  const deleteNote = async () => {
    await NoteService.deleteNote(noteId);
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
