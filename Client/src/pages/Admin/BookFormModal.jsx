import * as Dialog from "@radix-ui/react-dialog";
import "../../styles/BookFormModal.css";

export default function BookFormModal({
    open,
    onOpenChange,
    formData,
    setFormData,
    onSubmit,
    isEditing,
}){
    return (
        <Dialog.Root open = {open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="modal-overlay"/>

                <Dialog.Content className="modal-content">
                    <Dialog.Title className="modal-title">
                        {isEditing ? "Editar libro" : "Agregar libro"}
                    </Dialog.Title>

                    <form className="modal-form" onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
                        <div className="modal-grid">

                        <input
                            placeholder="Título"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required
                        />

                        <input
                            placeholder="Autor"
                            value={formData.author}
                            onChange={(e) =>
                                setFormData({ ...formData, author: e.target.value })
                            }
                            required
                        />

                        <input
                            placeholder="descripción"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            required
                        />
                        
                        <input
                            placeholder="Editorial"
                            value={formData.editorial}
                            onChange={(e) =>
                                setFormData({ ...formData, editorial: e.target.value })
                            }
                            required
                        />


                        <input
                            placeholder="ISBN"
                            value={formData.isbn}
                            onChange={(e) =>
                                setFormData({ ...formData, isbn: e.target.value })
                            }
                            required
                        />

                        <input
                            placeholder="Categoría"
                            value={formData.genre}
                            onChange={(e) =>
                                setFormData({ ...formData, genre: e.target.value })
                            }
                        />

                        <input
                            placeholder="Ubicación"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({ ...formData, location: e.target.value })
                            }
                        />

                        <input
                            type="number"
                            min={0}
                            placeholder="Stock"
                            value={formData.available_quantity}
                            onChange={(e) =>
                                setFormData({ ...formData, available_quantity: Number(e.target.value) })
                            }
                        />

                        <input
                            type="number"
                            min={0}
                            placeholder="año de publicacion"
                            value={formData.publication_year}
                            onChange={(e) =>
                                setFormData({ ...formData, publication_year: Number(e.target.value) })
                            }
                        />         
                        
                        <input
                            placeholder="URL de la portada (/uploads/libros/ejemplo.jpg)"
                            value={formData.cover || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, cover: e.target.value })
                            }
                        />   
                                    
                        </div>

                        <div className="modal-actions">
                            <Dialog.Close asChild>
                                <button type="button" className="inv-btn inv-btn--ghost">
                                Cancelar
                                </button>
                            </Dialog.Close>

                            <button type="submit" className="inv-btn inv-btn--primary">
                                Guardar
                            </button>
                        </div>

                    </form>

                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}