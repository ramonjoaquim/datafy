
import './radio-switch.css'

const RadioSwitch = () => {
    return (
      <form className='form'>
      <label>
        <input type="radio" name="filter" value="month" checked/>
        <span>Last Month</span>
      </label>
      <label>
        <input type="radio" name="filter" value="six_month"/>
        <span>Last 6 months</span>
      </label>
      <label>
        <input type="radio" name="filter" value="all-time"/>
        <span>All time</span>
      </label>
    </form>
    )
}

export default RadioSwitch