import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Contacts = ({ contactsToShow }) => {
  return (
    <ul>
      {contactsToShow.map((person) => <li key={person.id}>{person.name} {person.number} </li>)}
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const findBy = (value) => {
    return persons.find((person) => person.name === value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newContact = { name: newName, number: newNumber, id: persons.length + 1}
    if (findBy(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
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
      <Contacts contactsToShow={contactsToShow} />
    </div>
  )
}

export default App