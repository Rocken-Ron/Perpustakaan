import { useParams, useNavigate } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import parser from 'html-react-parser';

function Detail({ notes, onDelete, onArchive }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const note = notes.find((n) => n.id === id);
    if (!note) return <p>Catatan tidak ditemukan</p>;
    return (
    <div>
        <h2>{note.title}</h2>
        <div>{parser(note.body)}</div>
        <small>{showFormattedDate(note.createdAt)}</small>
        <br />
        <button onClick={() => {
        onDelete(id);
        navigate('/');
        }}>
        Hapus
        </button>
        <button onClick={() => onArchive(id)}>
        {note.archived ? 'Batal Arsip' : 'Arsipkan'}
        </button>
    </div>
    );
}

export default Detail;