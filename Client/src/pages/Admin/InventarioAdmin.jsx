import React, { useState, useMemo, useRef, useEffect } from "react";
import Sidebar from "../../components/sidebar"
import {useLogoutToast} from "../../hooks/useLogoutToast"

const MOCK_BOOKS = [
    {
        id: 1,
        isbn: "9781532834509",
        title: "Utopía",
        author: "Andre Hiotis",
        category: "Filosofía",
        location: "Sala 2 - A3",
        stock: 3,
        status: "Disponible",
    },
    {
        id: 2,
        isbn: "97898975661912",
        title: "La metamorfosis",
        author: "Kafka",
        category: "Ficción de terror",
        location: "Sala 1 - B1",
        stock: 0,
        status: "Sin stock",
    },
    {
        id: 3,
        isbn: "9788426403278",
        title: "Tan poca vida",
        author: "Yanagihara",
        category: "Novela",
        location: "Sala 3 - C2",
        stock: 4,
        status: "Disponible",
    },
];

function InventarioAdmin (){
    const [books] = useState(MOCK_BOOKS);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const {toast, openToast} = useLogoutToast();


    const filteredBooks = useMemo(() => {
        if(!search.trim()) return books;
        
        const term =  search.toLowerCase();
        return books.filter((book) => 
            [
                book.isbn,
                book.title,
                book.author,
                book.category,
                book.location,
            ]
            .join(" ")
            .toLowerCase()
            .includes(term)
        );
    }, [books, search]);


    const  handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleAddBook = () => {
        alert("simulación: abrir modal para agregar libro");
    };

    const handleImport = () => {
        alert("Simulación: importar inventario (CSV / Excel)")
    };

    const handleExport = () => {
        alert("Simulación: exportar inventario (CSV / Excel)"); 
    };

    const handleBulkAction = (action) => {
        alert(`Simulación acción masiva: ${action}`);
    };

    const visibleIds = filteredBooks.map((b) => b.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
    const noneVisibleSelected = visibleIds.every((id) => !selectedIds.includes(id));
    const isIndeterminate = !noneVisibleSelected && !allVisibleSelected;
    const selectAllRef = useRef(null);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);

    const handleToggleRow = (id) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    };

    const handleToggleAll = (event) => { 
        const { checked } = event.target;
        if (checked) {
            setSelectedIds((prev) => {
                const set = new Set(prev);
                visibleIds.forEach((id) => set.add(id));
                return Array.from(set);
            });
        } else {
            setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
        }
    };

    return (
        <div className="inventory-admin-page">
            <div className="inventory-admin-layout">
                <Sidebar onLogout={openToast} />
                
                <main className="inventory-admin-main">
                    <section className="inventory-admin-panel">
                        <header className="inventory-admin-header">
                            <div className="inventory-admin-title-block">
                                <h1 className="inventory-admin-title">Inventario</h1>
                                <span className="inventory-admin-counter">{filteredBooks.length}</span>
                            </div>

                            <div className="inventory-admin-header-actions">
                                <button type="button" className="inv-btn inv-btn--primary" onClick={handleAddBook}>
                                    <i className="fa-solid fa-plus" aria-hidden="true" />
                                    <span>Agregar libro</span>
                                </button>

                                <button type="button" className="inv-btn inv-btn--primary" onClick={handleImport}>
                                    <i className="fa-solid fa-file-import" aria-hidden="true" />
                                    <span>Importar</span>
                                </button>

                                <button type="button" className="inv-btn inv-btn--primary" onClick={handleExport}>
                                    <i className="fa-solid fa-file-export" aria-hidden="true" />
                                    <span>Exportar</span>
                                </button>
                            </div>
                        </header>

                        <div className="inventory-admin-search-row">
                            <div className="inventory-admin-search">
                                <span className="search-icon">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <input type="text" placeholder="Título, autor, ISBN, código" value={search} onChange={handleSearchChange}/>
                                <button type="button" className="search-voice" aria-label="Busqueda por voz">
                                    <i className="fa-solid fa-microphone" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="inventory-admin-filters-row">
                            <button type="button" className="inv-chip">
                                <i className="fa-solid fa-layer-group" />
                                <span>Categoria</span>
                                <i className="fa-solid fa-chevron-down" />
                            </button>

                            <button type="button" className="inv-chip">
                                <i className="fa-solid fa-toggle-on" />
                                <span>Estado</span>
                                <i className="fa-solid fa-chevron-down" />
                            </button>

                            <button type="button" className="inv-chip">
                                <i className="fa-solid fa-location-dot" />
                                <span>Ubicación</span>
                                <i className="fa-solid fa-chevron-down" />
                            </button>

                            <button type="button" className="inv-chip">
                                <i className="fa-solid fa-boxes-stacked" />
                                <span>Stock</span>
                                <i className="fa-solid fa-chevron-down" />
                            </button>

                            <button type="button" className="inv-chip">
                                <i className="fa-solid fa-calendar" />
                                <span>Año</span>
                                <i className="fa-solid fa-chevron-down" />
                            </button>
                        </div>

                        <div className="inventory-admin-table-wrapper">
                            <table className="inventory-admin-table">
                                <thead>
                                    <tr>
                                        <th className="col-checkbox">
                                            <input type="checkbox" aria-label="Seleccionar todos" ref={selectAllRef} checked={allVisibleSelected} onChange={handleToggleAll} />
                                        </th>
                                        <th>Código / ISBN</th>
                                        <th>Título</th>
                                        <th>Autor</th>
                                        <th>Categoría</th>
                                        <th>Ubicación</th>
                                        <th className="col-stock">Stock</th>
                                        <th className="col-actions">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td className="col-checkbox">
                                                <input type="checkbox" aria-label={`Seleccionar ${book.title}`} checked={selectedIds.includes(book.id)} onChange={() => handleToggleRow(book.id)}/>
                                                
                                            </td>
                                            <td>{book.isbn}</td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.category}</td>
                                            <td>{book.location}</td>
                                            <td className="col-stock">
                                                <span className="stock-pill">
                                                    <span className="stock-pill__number">
                                                        {book.stock}
                                                    </span>
                                                    <span className="stock-pill__status">
                                                        {book.status}
                                                    </span> 
                                                </span>
                                            </td>
                                            <td className="col-actions">
                                                <button type="button" className="row-action" title="Editar" onClick={()=>alert(`Simulacion: editar ${book.title}`)}>
                                                    <i className="fa-solid fa-pen" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredBooks.length === 0 && (
                                        <tr>
                                            <td colSpan = {8} className="no-results">
                                                No se encontraron resultados para "{search}".
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* ===== FOOTER ===== */}
                        <footer className="inventory-admin-footer">
                            <div className="inventory-admin-bulk-actions">
                                <button type="button" className="inv-btn inv-btn--primary" onClick={() => handleBulkAction("Ajustar stock")}>
                                    <i className="fa-solid fa-sliders" />
                                    <span>Ajustar stock</span>
                                </button>
                            </div>
                        </footer>
                    </section>
                    {toast}
                </main>
            </div>
        </div>
    )


}

export default InventarioAdmin;