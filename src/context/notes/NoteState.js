import React, { useState, useEffect } from "react";
import NoteContext from "../noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = getAuthToken();
    return token && token.length > 0;
  };

  // Get all Notes
  const getNotes = async () => {
    if (!isAuthenticated()) {
      console.log("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
      });

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Call getNotes on component mount
  useEffect(() => {
    getNotes();
  }, []);

  // Add Note
  const addNote = async (title, description, tag) => {
    if (!isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      // Refresh notes after adding
      getNotes();
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    if (!isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // Refresh notes after deletion
      getNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    if (!isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      // Refresh notes after editing
      getNotes();
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  return (
    <NoteContext.Provider value={{ 
      notes, 
      addNote, 
      deleteNote, 
      editNote, 
      getNotes,
      isAuthenticated 
    }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
