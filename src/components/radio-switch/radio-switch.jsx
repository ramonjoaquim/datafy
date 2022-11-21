import './radio-switch.css'

const RadioSwitch = (props) => {
    const onSelect = value => {
      props.setFilter(value)
    }

    return (
    <form className='form'>
      <div class="container">
        <div id="radios">
          <label for="This month" class="material-icons" onClick={() => onSelect('short_term')}>
            <input type="radio" name="mode" id="short_term" value="short_term" checked={props.value === 'short_term'}/>
            <span>This month</span>
          </label>                
          <label for="Last 6 months" class="material-icons" onClick={() => onSelect('medium_term')}>
            <input type="radio" name="mode" id="medium_term" value="medium_term" checked={props.value === 'medium_term'}/>
            <span>Last 6 months</span>
          </label>
          <label for="All time" class="material-icons" onClick={() => onSelect('long_term')}>
            <input type="radio" name="mode" id="long_term" value="long_term" checked={props.value === 'long_term'}/>
            <span> All time</span>
          </label>
        </div>
      </div>
    </form>
    )
}

export default RadioSwitch