
import './radio-switch.css'

const RadioSwitch = () => {
    return (
      <form className='form'>
      <label>
        <input type="radio" name="filter" value="short_term" checked/>
        <span>Last Month</span>
      </label>
      <label>
        <input type="radio" name="filter" value="medium_term"/>
        <span>Last 6 months</span>
      </label>
      <label>
        <input type="radio" name="filter" value="long_term"/>
        <span>All time</span>
      </label>
    </form>
    )
}

export default RadioSwitch