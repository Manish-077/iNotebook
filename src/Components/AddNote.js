import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext';

const AddNote = ({ showAlert }) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleclick = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addNote(note.title, note.description, note.tag);
            setNote({title: "", description: "", tag: "default"});
            if (showAlert) {
                showAlert("Note added successfully!", "success");
            }
        } catch (error) {
            console.error('Error adding note:', error);
            if (showAlert) {
                showAlert("Failed to add note. Please try again.", "danger");
            }
        } finally {
            setIsSubmitting(false);
        }
    }
    
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    
    return (
        <div className="fade-in card" style={{
            maxWidth: '700px',
            margin: 'var(--spacing-12) auto',
            padding: 'var(--spacing-8)',
            border: 'none',
            boxShadow: 'var(--shadow-lg)'
        }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
                <h2 style={{
                    color: 'var(--secondary-color)',
                    fontWeight: '600',
                    fontSize: 'var(--font-size-2xl)'
                }}>
                    Create a New Note
                </h2>
            </div>
            
            <form onSubmit={handleclick}>
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label htmlFor="title" className="form-label" style={{ fontWeight: '500' }}>Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name='title' 
                        value={note.title}
                        onChange={onchange}
                        placeholder="Enter note title..."
                        style={{
                            padding: 'var(--spacing-4)',
                            fontSize: 'var(--font-size-base)',
                            border: '2px solid var(--gray-200)',
                            borderRadius: 'var(--radius-xl)',
                            transition: 'all var(--transition-fast)'
                        }}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label htmlFor="description" className="form-label" style={{ fontWeight: '500' }}>Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name='description' 
                        value={note.description}
                        onChange={onchange}
                        placeholder="Write your note content here..."
                        rows="4"
                        style={{
                            padding: 'var(--spacing-4)',
                            fontSize: 'var(--font-size-base)',
                            border: '2px solid var(--gray-200)',
                            borderRadius: 'var(--radius-xl)',
                            resize: 'vertical',
                            minHeight: '120px',
                            transition: 'all var(--transition-fast)'
                        }}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    <label htmlFor="tag" className="form-label" style={{ fontWeight: '500' }}>Tag</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="tag" 
                        name='tag' 
                        value={note.tag}
                        onChange={onchange}
                        placeholder="Enter a tag (optional)"
                        style={{
                            padding: 'var(--spacing-4)',
                            fontSize: 'var(--font-size-base)',
                            border: '2px solid var(--gray-200)',
                            borderRadius: 'var(--radius-xl)',
                            transition: 'all var(--transition-fast)'
                        }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="btn w-100"
                    disabled={isSubmitting}
                    style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--white)',
                        padding: 'var(--spacing-3)',
                        fontSize: 'var(--font-size-base)',
                        fontWeight: '500',
                        borderRadius: 'var(--radius-lg)'
                    }}
                >
                    {isSubmitting ? 'Adding...' : 'Add Note'}
                </button>
            </form>
        </div>
    )
}

export default AddNote;