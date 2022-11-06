import './radio-switch.css'

const RadioSwitch = (props) => {

    function onSelect(value) {
      props.setFilter(value)
    }

    return (
      <form className='form'>
      <label>
        <input type="radio" name="filter" value="short_term" onClick={() => onSelect('short_term')}/>
        <span>Last Month</span>
      </label>
      <label>
        <input type="radio" name="filter" value="medium_term" onClick={() => onSelect('medium_term')}/>
        <span>Last 6 months</span>
      </label>
      <label>
        <input type="radio" name="filter" value="long_term" onClick={() => onSelect('long_term')}/>
        <span>All time</span>
      </label>
    </form>
    )
}

export default RadioSwitch