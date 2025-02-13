import { useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const YearForm = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState("");

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    const bornYear = parseInt(born, 10);

    updateAuthor({
      variables: {
        name: selectedOption.value,
        setBornTo: bornYear,
      },
    });

    setBorn("");
  };

  return (
    <div>
      <h2>Set bithYear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">updateAuthor</button>
      </form>
    </div>
  );
};

export default YearForm;
