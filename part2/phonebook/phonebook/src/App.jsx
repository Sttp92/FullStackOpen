import { useState, useEffect } from 'react'
import personService from './services/persons'

const FilterContact = ({ handleFilterChange }) => {
  return (
    <div>
      Filter by name: <input placeholder={'Insert name'} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleSubmit, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit} >
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Contacts = ({ contactsToShow, handleDelete }) => {
  return (
    <ul>
      {contactsToShow.map((person) => <li key={person.id}>{person.name} {person.number}  <button onClick={() => handleDelete(person.id)}>Delete</button></li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const findBy = (value) => {
    return persons.find((person) => person.name === value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newContact = { name: newName, number: newNumber}
    if (findBy(newName)) {
      if (confirm(`${newName} is alredy added to the phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const updatePerson = { ...person, number: newNumber }
        personService
          .update(person.id, updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))

          })
      }
    } else {
      personService
      .create(newContact)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
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
    if (findBy(event.target.value)) {
      setShowAll(false)
    } else { setShowAll(true)}
    setFilterValue(event.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.filter(person => person.id === id)
    if (confirm(`Delete ${personToDelete[0].name}?`)) {
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  const contactsToShow = showAll
    ? persons
    : persons.filter(person => person.name === filterValue)

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterContact handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts contactsToShow={contactsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App