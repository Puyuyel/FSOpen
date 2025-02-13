import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = ({ user, show }) => {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: user.favoriteGenre.toLowerCase() },
  });

  if (!show) return null;

  if (result.loading) return <div>loading..</div>;

  const books = result.data.allBooks;

  return (
    <>
      <h1>recommendations</h1>
      <p>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
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
    </>
  );
};

export default Recommend;
