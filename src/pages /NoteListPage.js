import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"
import AddButton from "../components/AddButton"

const NoteListPage = () => {
    let [notes, setNotes] = useState([])
    
    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        let response = await fetch('http://localhost:8001/notes')
        let data = await response.json()
        setNotes(data)
    }
  return (
      <div className="notes">
          <div className="notes-header">
              <h2 className="notes-title">&#9782; Notes</h2>
              <p className="notes-count">{ notes.length}</p>
          </div>
        <div className="note-list">
            {notes.map((note, index) => (
                <ListItem key={index} note={note} />
            ))}
          </div>
          <AddButton/>
      </div>
  )
}

export default NoteListPage