import React, { useContext, useEffect, useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import styles from './Notes.module.css';

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, isAuthenticated } = context;

  const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoading(true);
      setError(null);
      getNotes()
        .catch(err => {
          console.error("Failed to fetch notes:", err);
          setError("Could not load your notes. Please try refreshing the page.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNote = (note) => {
    setCurrentNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
    setShowModal(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (currentNote.title.length < 3) {
        showAlert("Title must be at least 3 characters long.", "warning");
        return;
    }
    try {
      editNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
      setShowModal(false);
      showAlert("Note updated successfully!", "success");
    } catch (error) {
      showAlert("Failed to update note. Please try again.", "danger");
    }
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading your notes...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={`${styles.errorContainer} alert alert-danger`}>
          {error}
        </div>
      );
    }

    if (notes.length === 0) {
      return (
        <div className={styles.emptyNotesContainer}>
          <div className={styles.emptyNotesIcon}>
            <i className="fas fa-sticky-note"></i>
          </div>
          <h3>No Notes Yet</h3>
          <p>It looks a bit empty here. Click "Add Note" above to get started!</p>
        </div>
      );
    }

    return (
      <div className="row">
        {notes.map((note) => (
          <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
        ))}
      </div>
    );
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`fas fa-edit me-2 ${styles.modalIcon}`}></i>
            Edit Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClick}>
            <Form.Group className="mb-3" controlId="editTitle">
              <Form.Label>
                <i className={`fas fa-heading me-2 ${styles.modalIcon}`}></i>
                Title
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentNote.title}
                onChange={onChange}
                minLength={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editDescription">
              <Form.Label>
                <i className={`fas fa-align-left me-2 ${styles.modalIcon}`}></i>
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={currentNote.description}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editTag">
              <Form.Label>
                <i className={`fas fa-tag me-2 ${styles.modalIcon}`}></i>
                Tag
              </Form.Label>
              <Form.Control
                type="text"
                name="tag"
                value={currentNote.tag}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <i className="fas fa-times me-2"></i>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClick}>
            <i className="fas fa-save me-2"></i>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Notes Section */}
      <div className={styles.notesContainer}>
        <header className={styles.header}>
            <h2>Your Notes Collection</h2>
            <p>Here you can view, edit, and manage all of your personal notes.</p>
        </header>
        {renderContent()}
      </div>
    </>
  );
};

export default Notes;
