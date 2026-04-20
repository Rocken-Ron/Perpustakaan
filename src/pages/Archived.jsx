import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import parser from 'html-react-parser';

function Archived({ notes }) {
    const archivedNotes = notes.filter((n) => n.archived);
    return (
    <div>
        <h2>Arsip</h2>
        {archivedNotes.length === 0 ? (
        <p>Arsip kosong</p>
        ) : (
        archivedNotes.map((note) => (
            <div key={note.id}>
            <Link to={`/notes/${note.id}`}>
                <h3>{note.title}</h3>
            </Link>
            <div>{parser(note.body)}</div>
            <small>{showFormattedDate(note.createdAt)}</small>
            </div>
        ))
        )}
    </div>
    );
}

export default Archived;