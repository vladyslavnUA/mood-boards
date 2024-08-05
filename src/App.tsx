import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createClient } from "@supabase/supabase-js";


const supabase = createClient("https://wxketljyiunzssitpzmu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4a2V0bGp5aXVuenNzaXRwem11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MjI1NzcsImV4cCI6MjAzODE5ODU3N30.OrW59gG4C5u42pw3UPSG6rrx7GnYUApKEqT4FBCQ5mQ");

type Tag = {
  name: string;
  color: string;
}

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date | null;
  // tags: Tag[];
}

async function getUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { username: 'example', password: 'example' }, // replace with actual data
    ])
  }

async function readUsers() {
  const { data, error } = await supabase
  .from('profiles')
  .select('*')
  // .eq('username', 'example') // replace with actual username
}



const App = () => {

  
  getUsers();
  // return (
  //   <ul>
  //     {countries.map((country) => (
  //       <li key={country.name}>{country.name}</li>
  //     ))}
  //   </ul>
  // );

  

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
      created_at: new Date(),
      updated_at: null,
      // tags: [
      //   { name: "Important", color: "Red" },
      //   { name: "Work", color: "Blue" }
      // ],
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
      created_at: new Date(),
      updated_at: null,
      // tags: [
      //   { name: "Important", color: "Red" },
      //   { name: "Work", color: "Blue" }
      // ],
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
      created_at: new Date(),
      updated_at: null,
      // tags: [
      //   { name: "Important", color: "Red" },
      //   { name: "Work", color: "Blue" }
      // ],
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
      created_at: new Date(),
      updated_at: null,
      // tags: [
      //   { name: "Important", color: "Red" },
      //   { name: "Work", color: "Blue" }
      // ],
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
      created_at: new Date(),
      updated_at: null,
      // tags: [
      //   { name: "Important", color: "Red" },
      //   { name: "Work", color: "Blue" }
      // ],
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
      created_at: new Date(),
      updated_at: null,
      // tags: [
      //   { name: "Important", color: "Red" },
      //   { name: "Work", color: "Blue" }
      // ],
    },
    ]);

    useEffect(() => {
      getNotes();
    }, []);
  
    async function getNotes() {
      const { data } = await supabase.from("notes").select();
      console.log('data: ', data);
      // setNotes(data);
    }

  

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleAddNote = (event: React.FormEvent) => {
      event.preventDefault();
      console.log(`title: ${title}, msg: ${content}`);
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    };

    const handleNoteClick = (note: Note) => {
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
    };

    const deleteNote = (event: React.MouseEvent, noteId: number) => {
      event.stopPropagation();
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    };

    const handleUpdateNote = (event: React.FormEvent) => {
      event.preventDefault();
      
      if (!selectedNote) {
        return;
      }
      const updatedNote: Note = {
        created_at: selectedNote.created_at,
        updated_at: new Date(),
        id: selectedNote.id,
        title: title,
        content: content,
        // tags: selectedNote.tags,
      }

      const updateNoteList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

      setNotes(updateNoteList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    }

    const handleCancel = () => {
      setTitle("");
      setContent("");
      setSelectedNote(null);
    }

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
      created_at: new Date(),
      updated_at: null,
    };


  return (
    <div className="app-container">
      <form onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))} className="note-form">
        <input type="text" placeholder="Title"
          value={title} onChange={(event) => setTitle(event.target.value)} required />
        <textarea name="" id="" rows={10} 
          value={content} onChange={(event) => setContent(event.target.value)}/>
        
        { selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Nevermind</button>
          </div>
        ) : (
          <button type="submit">Add note +</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <p>{note.created_at.toLocaleString()}</p>
              {note.updated_at &&
                <p>{note.updated_at.toLocaleString()}</p>
              }
              {/* <p>{note.updated_at.toLocaleString() ? '' : ''}</p> */}
              <button onClick={(event) => deleteNote(event, note.id)}>X</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
