import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {  useNavigate } from "react-router-dom";
const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });

  const refClose = useRef(null);
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();

    } else{
      navigate("/login")
    }
  }, [getNotes,navigate]);

  const updateNote = (note) => {
    setCurrentNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  };

  const handleClick = () => {
    try {
      editNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
      refClose.current.click();
      if (showAlert) {
        showAlert("Note updated successfully!", "success");
      }
    } catch (error) {
      if (showAlert) {
        showAlert("Failed to update note. Please try again.", "danger");
      }
    }
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* Edit Note Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{
            borderRadius: 'var(--radius-2xl)',
            border: 'none',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div className="modal-header" style={{
              borderBottom: '1px solid var(--gray-200)',
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--gray-50)',
              borderTopLeftRadius: 'var(--radius-2xl)',
              borderTopRightRadius: 'var(--radius-2xl)'
            }}>
              <h5 className="modal-title" id="exampleModalLabel" style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: '600',
                color: 'var(--gray-900)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-3)'
              }}>
                <i className="fas fa-edit" style={{ color: 'var(--primary-color)' }}></i>
                Edit Note
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
                style={{
                  backgroundColor: 'var(--gray-300)',
                  borderRadius: '50%',
                  padding: 'var(--spacing-2)'
                }}
              ></button>
            </div>
            <div className="modal-body" style={{ padding: 'var(--spacing-6)' }}>
              <form>
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <label htmlFor="title" className="form-label" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)',
                    fontWeight: '600',
                    color: 'var(--gray-700)'
                  }}>
                    <i className="fas fa-heading" style={{ color: 'var(--primary-color)' }}></i>
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={currentNote.title}
                    onChange={onChange}
                    style={{
                      padding: 'var(--spacing-4)',
                      fontSize: 'var(--font-size-base)',
                      border: '2px solid var(--gray-200)',
                      borderRadius: 'var(--radius-xl)',
                      transition: 'all var(--transition-fast)'
                    }}
                  />
                </div>
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <label htmlFor="description" className="form-label" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)',
                    fontWeight: '600',
                    color: 'var(--gray-700)'
                  }}>
                    <i className="fas fa-align-left" style={{ color: 'var(--primary-color)' }}></i>
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={currentNote.description}
                    onChange={onChange}
                    style={{
                      padding: 'var(--spacing-4)',
                      fontSize: 'var(--font-size-base)',
                      border: '2px solid var(--gray-200)',
                      borderRadius: 'var(--radius-xl)',
                      resize: 'vertical',
                      minHeight: '120px',
                      transition: 'all var(--transition-fast)'
                    }}
                  ></textarea>
                </div>
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <label htmlFor="tag" className="form-label" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)',
                    fontWeight: '600',
                    color: 'var(--gray-700)'
                  }}>
                    <i className="fas fa-tag" style={{ color: 'var(--primary-color)' }}></i>
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={currentNote.tag}
                    onChange={onChange}
                    style={{
                      padding: 'var(--spacing-4)',
                      fontSize: 'var(--font-size-base)',
                      border: '2px solid var(--gray-200)',
                      borderRadius: 'var(--radius-xl)',
                      transition: 'all var(--transition-fast)'
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{
              borderTop: '1px solid var(--gray-200)',
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--gray-50)',
              borderBottomLeftRadius: 'var(--radius-2xl)',
              borderBottomRightRadius: 'var(--radius-2xl)'
            }}>
              <button 
                ref={refClose} 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                style={{
                  padding: 'var(--spacing-3) var(--spacing-6)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '500'
                }}
              >
                <i className="fas fa-times me-2"></i>
                Cancel
              </button>
              <button 
                onClick={handleClick} 
                type="button" 
                className="btn btn-primary"
                style={{
                  padding: 'var(--spacing-3) var(--spacing-6)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '500'
                }}
              >
                <i className="fas fa-save me-2"></i>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="container" style={{ marginTop: 'var(--spacing-8)' }}>
        <header style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-8)',
            padding: 'var(--spacing-8) 0'
        }}>
            <h2 style={{
                color: 'var(--secondary-color)',
                fontWeight: '600',
                fontSize: 'var(--font-size-3xl)'
            }}>
                Your Notes Collection
            </h2>
            <p style={{
                color: 'var(--gray-600)',
                fontSize: 'var(--font-size-lg)',
                maxWidth: '600px',
                margin: 'var(--spacing-3) auto 0'
            }}>
                Here you can view, edit, and manage all of your personal notes.
            </p>
        </header>

        {notes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 'var(--spacing-16) var(--spacing-4)',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px dashed var(--gray-300)'
          }}>
            <div style={{ fontSize: 'var(--font-size-4xl)', color: 'var(--primary-light)', marginBottom: 'var(--spacing-4)' }}>
                <i className="fas fa-sticky-note"></i>
            </div>
            <h3 style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>No Notes Yet</h3>
            <p style={{ color: 'var(--gray-600)', maxWidth: '400px', margin: '0 auto' }}>It looks a bit empty here. Click "Add Note" above to get started!</p>
          </div>
        ) : (
          <div className="row">
            {notes.map((note) => (
              <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
