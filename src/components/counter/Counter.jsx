import './Counter.css';

export default function Counter(){

  function incrementCounterFunction(){
    console.log('increment clicked')
  }
  return(
    <div className="Counter">
      <span className="counter">0</span>
      <button className="counterButton" onClick={incrementCounterFunction}>increment</button>

    </div>
  )
}