import React, { useState, useCallback } from "react";
import NoteContext from "../noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get auth token from localStorage
  const getAuthToken = useCallback(() => {
    return localStorage.getItem('token');
  }, []);

  // Check if user is authenticated (memoized)
  const isAuthenticated = useCallback(() => {
    const token = getAuthToken();
    return token && token.length > 0;
  }, [getAuthToken]);

  // Centralized API Fetch function
  const apiFetch = useCallback(async (endpoint, method = 'GET', body = null) => {
    if (!isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": getAuthToken(),
      };

      const config = { method, headers };

      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${host}${endpoint}`, config);

      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
      }

      return response.json();
    } catch (error) {
      console.error(`API Error on ${method} ${endpoint}:`, error);
      throw error;
    }
  }, [host, isAuthenticated, getAuthToken]);

  // Get all Notes
  const getNotes = useCallback(async () => {
    const json = await apiFetch(`/api/notes/fetchallnotes`);
    setNotes(json);
  }, [apiFetch]);

  // Add Note
  const addNote = useCallback(async (title, description, tag) => {
    const newNote = await apiFetch(`/api/notes/addnote`, 'POST', { title, description, tag });
    setNotes(prevNotes => prevNotes.concat(newNote));
  }, [apiFetch]);

  // Delete Note
  const deleteNote = useCallback(async (id) => {
    await apiFetch(`/api/notes/deletenote/${id}`, 'DELETE');
    setNotes(prevNotes => prevNotes.filter((note) => note._id !== id));
  }, [apiFetch]);

  // Edit Note
  const editNote = useCallback(async (id, title, description, tag) => {
    await apiFetch(`/api/notes/updatenote/${id}`, 'PUT', { title, description, tag });
    setNotes(prevNotes => {
      const newNotes = JSON.parse(JSON.stringify(prevNotes));
      for (let i = 0; i < newNotes.length; i++) {
        if (newNotes[i]._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      return newNotes;
    });
  }, [apiFetch]);

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
