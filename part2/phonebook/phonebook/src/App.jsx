import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '978763342', id: 1 },
    { name: 'John Cena', number: '040-123456', id: 2 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 3 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 4 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)

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