import { api } from "../utils/api";

class NoteService {

    async getNotes(){
      const response = await api(`/notes`);
      return response;
    }

    async getNote(noteId) {
      const response = await api(`/notes/${noteId}`);
      return response;
    }
    
    async createNote(note) {
      const response = await api(`/notes/`, "POST", note);
      return response;
    }
  
    async updateNote(noteId, note) {
      const response = await api(`/notes/${noteId}`, "PUT", note);
      return response;
    }
  
    async deleteNote(noteId) {
      await api(`/notes/${noteId}`, "DELETE");
    }
  }


export default new NoteService();