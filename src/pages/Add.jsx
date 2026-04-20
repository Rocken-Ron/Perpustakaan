import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Add({ onAdd }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    onAdd(title, body);
    navigate('/');
    };
    return (
    <form onSubmit={submitHandler}>
        <h2>Tambah Catatan</h2>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul"
        />
      {/* contentEditable */}
        <div
        className="input-body"
        contentEditable
        data-placeholder="Tulis isi catatan..."
        onInput={(e) => setBody(e.currentTarget.innerHTML)}
        ></div>
        <button type="submit">Simpan</button>
    </form>
    );
}

export default Add;