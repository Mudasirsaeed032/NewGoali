const AdminPaymentsTable = ({ payments }) => {
  return (
    <div className="bg-gray shadow rounded mt-6">
      <h2 className="text-lg font-bold px-4 pt-4">Team Payments</h2>
      {payments.length === 0 ? (
        <p className="text-sm text-gray-500 px-4 pb-4">No payments found.</p>
      ) : (
        <table className="w-full text-sm border mt-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Method</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">${p.amount}</td>
                <td className="p-2 capitalize">{p.method}</td>
                <td className="p-2">{p.fundraiser_id ? 'Fundraiser' : p.event_id ? 'Event' : '—'}</td>
                <td className="p-2">{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminPaymentsTable
