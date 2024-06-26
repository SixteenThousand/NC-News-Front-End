export default function ErrorMsg({ msg }) {
  return <div className="error-msg">
    {msg ? msg : "An error has occurred. Please try again."}
  </div>;
}
