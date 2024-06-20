export default function LoadingMsg({ msg }) {
  return <div className="loading-msg">
    <div className="loading-spinner"></div>
    {msg ? msg : "Loading..."}
  </div>;
}
