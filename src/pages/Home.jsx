import { Link, useSearchParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import parser from "html-react-parser";

function Home({ notes }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("q") || "";
    const activeNotes = notes.filter(
    (note) =>
        !note.archived &&
        note.title.toLowerCase().includes(keyword.toLowerCase()),
    );

    return (
    <>
        <h2>Catatan Aktif</h2>
        <div className="search-bar">
        <input
            placeholder="Cari berdasarkan judul ..."
            value={keyword}
            onChange={(e) => setSearchParams({ q: e.target.value })}
        />
        </div>
        {activeNotes.length === 0 ? (
        <div className="notes-list-empty">
            <p>Tidak ada catatan</p>
        </div>
        ) : (
        <div className="notes-list">
            {activeNotes.map((note) => (
            <div className="note-item" key={note.id}>
                <Link to={`/notes/${note.id}`}>
                <h3 className="note-item__title">{note.title}</h3>
                </Link>
                <p className="note-item__createdAt">
                {showFormattedDate(note.createdAt)}
                </p>
                <div className="note-item__body">{parser(note.body)}</div>
            </div>
            ))}
        </div>
        )}
      {/* tombol tambah */}
        <div className="homepage__action">
        <Link to="/new">
            <button className="action">+</button>
        </Link>
        </div>
    </>
    );
}

export default Home;
