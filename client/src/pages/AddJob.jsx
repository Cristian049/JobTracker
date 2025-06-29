function AddJob() {
  return (
    <form>
      <input type="text" name="company" />
      <input type="text" name="position" />
      <select name="position">
        <option value="applied">applied</option>
        <option value="rejected">rejected</option>
        <option value="interview">interview</option>
        <option value="offer">offer</option>
      </select>
    </form>
  );
}

export default AddJob;
