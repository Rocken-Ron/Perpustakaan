import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { getInitialData } from './utils/local-data';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Add from './pages/Add';
import Archived from './pages/Archived';
import NotFound from './pages/NotFound';

function App() {
  const [notes, setNotes] = useState(getInitialData());

  const addNote = (title, body) => {
    setNotes([
      {
        id: 'notes-' + +new Date(),
        title,
        body,
        archived: false,
        createdAt: new Date().toISOString(),
      },
      ...notes,
    ]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">Aplikasi Catatan</Link>
          </h1>

          <nav className="navigation">
            <ul>
              <li>
                <Link to="/archived">Arsip</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={<Home notes={notes} />}
            />
            <Route
              path="/notes/:id"
              element={
                <Detail
                  notes={notes}
                  onDelete={deleteNote}
                  onArchive={toggleArchive}
                />
              }
            />
            <Route path="/new" element={<Add onAdd={addNote} />} />
            <Route path="/archived" element={<Archived notes={notes} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;