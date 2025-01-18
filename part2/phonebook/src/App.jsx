import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message: null, isError: false})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const resetFields = () =>{
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const person = persons.find(person => person.name === newName)
    if(person){
      if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          const changedPerson = {...person, number: newNumber}
          personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNotificationMessage({message: `Updated ${changedPerson.name}'s number`, isError: false})
            setTimeout(() => {
              setNotificationMessage({...notificationMessage, message:null})
            },2000)
            resetFields()
          })
          .catch(() => {
            setNotificationMessage({ 
              message: `Information of ${changedPerson.name} has already been removen from the server`,
              isError: true
            })
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage({ message: `Added ${newPerson.name}`, isError: false })
        setTimeout(() => {
          setNotificationMessage({...notificationMessage, message:null})
        },2000)
        resetFields()
      })
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage.message} isError={notificationMessage.isError}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App