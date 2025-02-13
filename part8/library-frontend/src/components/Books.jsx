import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const result = useQuery(ALL_BOOKS, { variables: { genre: filter } });
  const allResult = useQuery(ALL_BOOKS, { variables: { genre: null } });

  if (!props.show) {
    return null;
  }

  if (result.loading || allResult.loading) return <div>loading---</div>;

  const books = result.data.allBooks;
  const allBooks = allResult.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        {[...new Set(allBooks.flatMap((b) => b.genres))].map((genre) => {
          return (
            <button key={genre} onClick={() => setFilter(genre)}>
              {genre}
            </button>
          );
        })}
        <button onClick={() => setFilter(null)}>all</button>
      </section>
    </div>
  );
};

export default Books;
