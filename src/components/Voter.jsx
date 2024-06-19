export default function Voter({ votes, }) {
  function handleVote(event) {
    alert(`This button doesn't do anything yet!
      Button: ${event.target.name}`);
  }
  
  return <div className="votes">
    <button onClick={handleVote} name="down">🔽</button>
    {votes}
    <button onClick={handleVote} name="up">🔼</button>
  </div>;
}
