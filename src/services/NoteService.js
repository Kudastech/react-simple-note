import { api } from "../utils/api";

class NoteService {

    async getNotes(){
      const response = await api(`/notes`);
      const data = await response.json();
      return data;
    }

    async getNote(noteId) {
      const response = await api(`/notes/${noteId}`);
      const data = await response.json();
      return data;
    }
    
    async createNote(note) {
      const response = await api(`/notes/`, "POST", note);
      return await response.json();
    }
  
    async updateNote(noteId, note) {
      const response = await api(`/notes/${noteId}`, "PUT", note);
      return await response.json();
    }
  
    async deleteNote(noteId) {
      await api(`/notes/${noteId}`, "DELETE");
    }
  }


export default new NoteService();