function Error({ message }) {
  return (
    <div className="error">
      <p>
        Unable to Fetch Questions!!! <span>{message}</span>
      </p>
    </div>
  );
}

export default Error;
