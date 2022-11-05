import './loading.css'

const Loading = (props) => {

return (
  <>
      <div className='loading-container'>
        <div className='dot' style={{color: props.color}} />
        <span className='loading-label'>Loading...</span>
      </div>
  </>
)
}

export default Loading