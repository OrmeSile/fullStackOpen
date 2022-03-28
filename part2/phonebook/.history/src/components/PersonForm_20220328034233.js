const personForm = (props) => {
    return (
        <h2>add a new</h2>
        <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
          <div>
            number: <input 
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default personForm