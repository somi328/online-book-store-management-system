import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function BookStore() {

    const [books, setBooks] = useState([]);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [searchTitle, setSearchTitle] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        const loggedIn = localStorage.getItem("isLoggedIn");

        if (!loggedIn) {
            window.location.href = "/login";
        }

        fetchBooks();

    }, []);

    const fetchBooks = () => {

        axios.get("http://localhost:8080/books")
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const addBook = () => {

        const book = {
            title,
            author,
            price,
            quantity,
            category
        };

        axios.post("http://localhost:8080/books", book)
            .then(() => {

                fetchBooks();

                setTitle("");
                setAuthor("");
                setPrice("");
                setQuantity("");
                setCategory("");

            })
            .catch((error) => {
                console.log(error);
            });

    };

    const editBook = (book) => {

        setEditingId(book.id);

        setTitle(book.title);
        setAuthor(book.author);
        setPrice(book.price);
        setQuantity(book.quantity);
        setCategory(book.category);

    };

    const updateBook = () => {

        const book = {
            title,
            author,
            price,
            quantity,
            category
        };

        axios.put(`http://localhost:8080/books/${editingId}`, book)
            .then(() => {

                fetchBooks();

                setEditingId(null);

                setTitle("");
                setAuthor("");
                setPrice("");
                setQuantity("");
                setCategory("");

            })
            .catch((error) => {
                console.log(error);
            });

    };

    const deleteBook = (id) => {

        axios.delete(`http://localhost:8080/books/${id}`)
            .then(() => {
                fetchBooks();
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const searchBooks = () => {

        axios.get(
            `http://localhost:8080/books/search?title=${searchTitle}`
        )
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const logout = () => {

        localStorage.removeItem("isLoggedIn");

        window.location.href = "/login";

    };

    return (

        <div className="container">

            <h1>Online Book Store Management System</h1>

            <button onClick={logout}>
                Logout
            </button>

            <hr />

            <div className="form-container">

                <h2>
                    {editingId ? "Update Book" : "Add Book"}
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <br /><br />

                {
                    editingId ? (
                        <button onClick={updateBook}>
                            Update Book
                        </button>
                    ) : (
                        <button onClick={addBook}>
                            Add Book
                        </button>
                    )
                }

            </div>

            <hr />

            <h2>Search Book</h2>

            <input
                type="text"
                placeholder="Enter Book Title"
                value={searchTitle}
                onChange={(e) =>
                    setSearchTitle(e.target.value)
                }
            />

            <button onClick={searchBooks}>
                Search
            </button>

            <button onClick={fetchBooks}>
                Show All
            </button>

            <hr />

            <h2>Book List</h2>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        books.map((book) => (

                            <tr key={book.id}>

                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td>{book.quantity}</td>
                                <td>{book.category}</td>

                                <td>

                                    <button
                                        onClick={() => editBook(book)}
                                    >
                                        Edit
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            deleteBook(book.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );
}

export default BookStore;