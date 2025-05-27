import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"
import AddButton from "../components/AddButton"
import NoteService from "../services/NoteService"

const NoteListPage = () => {
    const [notes, setNotes] = useState([]);
    const [processing, setProcessing] = useState(true);
    
    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        try {
            const data = await NoteService.getNotes();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setProcessing(false);
        }
    }

    if (processing) {
        return <div>Loading...</div>;
    }

  return (
      <div className="notes">
          <div className="notes-header">
              <h2 className="notes-title">&#9782; Notes</h2>
              <p className="notes-count">{ notes.length}</p>
          </div>
            <div className="note-list">
                {notes.length ? (
                    notes.map((note, index) => (
                        <ListItem key={index} note={note} />
                    ))
                ) : (
                    <h2>Your Note is Empty</h2>
                )}
            </div>
          <AddButton/>
      </div>
  )
}

export default NoteListPage