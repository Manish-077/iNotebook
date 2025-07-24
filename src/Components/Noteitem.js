import React, { useContext } from 'react';
import noteContext from '../context/noteContext';

const Noteitem = (props) => {
   const context = useContext(noteContext);
    const { deleteNote } = context;
  
  const { note, updateNote, showAlert } = props;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        deleteNote(note._id);
        if (showAlert) {
          showAlert("Note deleted successfully!", "success");
        }
      } catch (error) {
        if (showAlert) {
          showAlert("Failed to delete note. Please try again.", "danger");
        }
      }
    }
  };

  const getTagColor = (tag) => {
    const colors = {
      'default': 'var(--gray-500)',
      'important': 'var(--danger-color)',
      'work': 'var(--primary-color)',
      'personal': 'var(--success-color)',
      'ideas': 'var(--warning-color)',
      'todo': 'var(--accent-color)'
    };
    return colors[tag.toLowerCase()] || 'var(--gray-500)';
  };

  return (
    <div className="col-md-6 col-lg-4 my-3 fade-in">
      <div className="card h-100" style={{
        backgroundColor: 'var(--white)',
        border: '1px solid var(--gray-200)',
        transition: 'all var(--transition-fast)'
      }}>
        <div className="card-body" style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header with title and actions */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title" style={{
              fontWeight: '600',
              color: 'var(--secondary-color)',
              margin: 0,
            }}>
              {note.title}
            </h5>
            <div className="d-flex gap-2">
              <button
                onClick={() => updateNote(note)}
                className="btn btn-sm"
                style={{ backgroundColor: 'transparent', color: 'var(--gray-600)' }}
                title="Edit note"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-sm"
                style={{ backgroundColor: 'transparent', color: 'var(--danger-color)' }}
                title="Delete note"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="card-text" style={{
            color: 'var(--gray-700)',
            flex: 1,
          }}>
            {note.description}
          </p>

          {/* Footer with Tag and Date */}
          <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top">
            {note.tag && (
              <span style={{
                padding: 'var(--spacing-1) var(--spacing-3)',
                backgroundColor: `${getTagColor(note.tag)}20`,
                color: getTagColor(note.tag),
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: '500',
              }}>
                {note.tag}
              </span>
            )}
            <small className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>
              {new Date(note.date).toLocaleDateString()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
