const Filter = ({newSearch, }) => {
    return(
      <div>
        filter shown with
        <input 
          value={newSearch}
          onChange={handleSearchFieldChange}
        />
      </div>)
}

export default Filter