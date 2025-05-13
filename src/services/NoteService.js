
class NoteService {
    constructor(baseUrl = 'http://localhost:8001') {
        this.baseUrl = baseUrl;
    }
  
    async getNote(noteId) {
      const response = await fetch(`${this.baseUrl}/notes/${noteId}`);
      return await response.json();
    }
    
    async createNote(note) {
      const response = await fetch(`${this.baseUrl}/notes/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...note, updated: new Date() }),
      });
      return await response.json();
    }
  
    async updateNote(noteId, note) {
      const response = await fetch(`${this.baseUrl}/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...note, updated: new Date() }),
      });
      return await response.json();
    }
  
    async deleteNote(noteId) {
      await fetch(`${this.baseUrl}/notes/${noteId}`, {
        method: "DELETE",
      });
    }
  }

const noteServiceInstance = new NoteService();

export default noteServiceInstance;