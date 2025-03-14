
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import AdPlacement from './ui/AdPlacement';
import { 
  BookText, 
  Plus, 
  Search, 
  Tag, 
  Clock, 
  Save, 
  Trash2, 
  Check,
  X,
  AlertCircle,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        // Convert string dates back to Date objects
        const parsedNotes = JSON.parse(savedNotes);
        return parsedNotes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
      } catch (e) {
        console.error('Error parsing notes from localStorage:', e);
        return [];
      }
    }
    return [];
  });
  
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedTags, setEditedTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');
  
  useEffect(() => {
    // Save notes to localStorage whenever they change
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  
  // When an active note is selected, update the editing state
  useEffect(() => {
    if (activeNote) {
      setEditedTitle(activeNote.title);
      setEditedContent(activeNote.content);
      setEditedTags([...activeNote.tags]);
    } else {
      setEditedTitle('');
      setEditedContent('');
      setEditedTags([]);
    }
  }, [activeNote]);
  
  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
    
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setIsEditing(true);
  };
  
  const saveNote = () => {
    if (!activeNote) return;
    
    if (!editedTitle.trim()) {
      toast.error('Note title cannot be empty');
      return;
    }
    
    const updatedNote = {
      ...activeNote,
      title: editedTitle,
      content: editedContent,
      tags: editedTags,
      updatedAt: new Date()
    };
    
    setNotes(notes.map(note => note.id === activeNote.id ? updatedNote : note));
    setActiveNote(updatedNote);
    setIsEditing(false);
    toast.success('Note saved successfully');
  };
  
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
      setIsEditing(false);
    }
    toast.success('Note deleted');
  };
  
  const addTag = () => {
    if (!newTagInput.trim()) return;
    
    if (!editedTags.includes(newTagInput)) {
      setEditedTags([...editedTags, newTagInput]);
    }
    setNewTagInput('');
  };
  
  const removeTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const filteredNotes = notes.filter(note => {
    const searchLower = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.content.toLowerCase().includes(searchLower) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });
  
  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `notes-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Notes exported successfully');
  };
  
  const importNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target?.result as string);
        // Validate and convert dates
        const validatedNotes = importedNotes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        
        setNotes(validatedNotes);
        toast.success('Notes imported successfully');
      } catch (error) {
        console.error('Error importing notes:', error);
        toast.error('Failed to import notes. Invalid file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="border border-border rounded-xl overflow-hidden h-[calc(100vh-300px)] flex flex-col">
              <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <BookText size={16} className="mr-2" /> 
                  Notes
                </h3>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={createNewNote}
                    className="p-1.5 hover:bg-accent rounded-md transition-colors"
                    title="Create new note"
                  >
                    <Plus size={16} />
                  </button>
                  
                  <div className="relative group">
                    <button
                      className="p-1.5 hover:bg-accent rounded-md transition-colors"
                      title="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    <div className="absolute right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-10 hidden group-hover:block">
                      <div className="py-1">
                        <button
                          onClick={exportNotes}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center"
                        >
                          <Download size={14} className="mr-2" />
                          Export Notes
                        </button>
                        
                        <label className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center cursor-pointer">
                          <Upload size={14} className="mr-2" />
                          Import Notes
                          <input
                            type="file"
                            accept=".json"
                            className="hidden"
                            onChange={importNotes}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <div className="relative mb-3">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full pl-9 p-2 bg-muted/30 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="overflow-y-auto flex-grow" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                  {filteredNotes.length > 0 ? (
                    <div className="space-y-2">
                      {filteredNotes.map(note => (
                        <div
                          key={note.id}
                          onClick={() => {
                            if (isEditing && activeNote) {
                              if (window.confirm('You have unsaved changes. Do you want to continue?')) {
                                setActiveNote(note);
                                setIsEditing(false);
                              }
                            } else {
                              setActiveNote(note);
                              setIsEditing(false);
                            }
                          }}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            activeNote?.id === note.id
                              ? 'bg-primary/10 border border-primary/30'
                              : 'hover:bg-accent border border-transparent'
                          }`}
                        >
                          <h4 className="font-medium truncate">{note.title}</h4>
                          
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                              {note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '')}
                            </p>
                          </div>
                          
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Clock size={12} className="mr-1" />
                            <span>{formatDate(note.updatedAt)}</span>
                          </div>
                          
                          {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {note.tags.slice(0, 2).map((tag, index) => (
                                <div key={index} className="bg-muted px-1.5 py-0.5 rounded text-[10px] flex items-center">
                                  <Tag size={8} className="mr-1" />
                                  {tag}
                                </div>
                              ))}
                              {note.tags.length > 2 && (
                                <div className="bg-muted px-1.5 py-0.5 rounded text-[10px]">
                                  +{note.tags.length - 2}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        {notes.length === 0 ? 'No notes yet. Create your first note!' : 'No notes match your search.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <AdPlacement format="square" className="mx-auto" />
            </div>
          </div>
          
          {/* Note editor */}
          <div className="md:col-span-2 lg:col-span-3">
            {activeNote ? (
              <div className="border border-border rounded-xl overflow-hidden h-[calc(100vh-300px)] flex flex-col">
                <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
                  {isEditing ? (
                    <input
                      type="text"
                      className="bg-transparent border-none p-0 font-medium text-base focus:outline-none focus:ring-0 w-full"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Note title"
                    />
                  ) : (
                    <h3 className="font-medium">{activeNote.title}</h3>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    {isEditing ? (
                      <>
                        <button
                          onClick={saveNote}
                          className="p-1.5 hover:bg-green-500/10 hover:text-green-500 rounded-md transition-colors"
                          title="Save note"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditedTitle(activeNote.title);
                            setEditedContent(activeNote.content);
                            setEditedTags([...activeNote.tags]);
                          }}
                          className="p-1.5 hover:bg-accent rounded-md transition-colors"
                          title="Cancel editing"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-1.5 hover:bg-accent rounded-md transition-colors"
                          title="Edit note"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this note?')) {
                              deleteNote(activeNote.id);
                            }
                          }}
                          className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
                          title="Delete note"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-4 flex-grow overflow-auto">
                  {isEditing ? (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {editedTags.map((tag, index) => (
                            <div key={index} className="bg-muted px-2 py-1 rounded-md text-sm flex items-center">
                              <Tag size={12} className="mr-1" />
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex">
                          <input
                            type="text"
                            className="flex-grow p-2 border border-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            placeholder="Add a tag"
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <button
                            onClick={addTag}
                            className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Content
                      </label>
                      <textarea
                        className="w-full h-[calc(100vh-500px)] p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        placeholder="Write your note here..."
                      />
                    </>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center">
                        <Clock size={14} className="text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">
                          Updated {formatDate(activeNote.updatedAt)}
                        </span>
                      </div>
                      
                      {activeNote.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {activeNote.tags.map((tag, index) => (
                            <div key={index} className="bg-muted px-2 py-1 rounded-md text-xs flex items-center">
                              <Tag size={12} className="mr-1" />
                              {tag}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="prose prose-sm max-w-none">
                        {activeNote.content ? (
                          <pre className="whitespace-pre-wrap font-sans">{activeNote.content}</pre>
                        ) : (
                          <p className="text-muted-foreground italic">This note is empty. Click edit to add content.</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-border rounded-xl overflow-hidden h-[calc(100vh-300px)] flex flex-col items-center justify-center p-6 text-center">
                <BookText size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Note Selected</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Select a note from the list or create a new one to get started.
                </p>
                <Button onClick={createNewNote}>
                  <Plus size={16} className="mr-2" />
                  Create New Note
                </Button>
              </div>
            )}
            
            <div className="mt-6">
              <AdPlacement format="leaderboard" className="mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
