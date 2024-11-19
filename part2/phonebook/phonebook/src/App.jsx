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

const NotificationError = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const NotificationSuccess = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
          .then(success => {
            setSuccessMessage(
              `You have successfully changed ${updatePerson.name}'s number`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 7000)
          })
          .catch(error => {
            setErrorMessage(
              `Information about ${updatePerson.name} has alredy been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 7000)
            setPersons(persons.filter(person => person.id !== updatePerson.id))
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
      .then(success => {
        setSuccessMessage(
          `You have successfully added ${newContact.name}'s number`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 7000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 7000)
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
      <NotificationError message={errorMessage} />
      <NotificationSuccess message={successMessage} />
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