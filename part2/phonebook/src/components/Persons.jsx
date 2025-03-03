const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      {
        persons.map(person => {
          return (
            <p key={person.id}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
            </p>
          )
        })
      }
    </>
  )
}

export default Persons