export default function SelectReceiver({ users, setReceiverID }) {
  return (
    <select
      onChange={(e) => setReceiverID(e.target.value)}
      className="border rounded p-2 mb-4 text-neutral-900 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
    >
      <option value="">Select a user</option>
      {users.map((u) => (
        <option key={u.userID} value={u.userID}>
          {u.username}
        </option>
      ))}
    </select>
  );
}
