import Link from "next/link";

interface DataTableProps {
  cols: string[];
  rows: any[];
}

const DataTable: React.FC<DataTableProps> = ({ cols = [], rows = [] }) => {
  const handlerDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`../api/${id}`, {
          method: "DELETE",
          });
        if (!res.ok) {
          throw new Error("Couldn't delete");
        }

        const { message } = await res.json();
        alert(message);
      } catch (error) {
        alert("Error deleting");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {cols.map((th, i) => (
              <th
                key={i}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {th}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((tr, i) => (
            <tr
              key={i}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-2 text-sm">{tr?._id}</td>
              <td className="px-4 py-2 text-sm">{tr?.title}</td>
              <td className="px-4 py-2 text-sm">
                {tr?.description?.substring(0, 40).concat("...")}
              </td>
              <td className="px-4 py-2 text-sm">{tr?.price}</td>
              <td className="px-4 py-2 text-sm">
                <div className="flex gap-2">
                  <Link
                    href={`../view/${tr?._id}`}
                    className="rounded-md bg-blue-500 px-3 py-1 text-white text-xs hover:bg-blue-600"
                  >
                    View
                  </Link>
                  <Link
                    href={`../edit/${tr?._id}`}
                    className="rounded-md bg-yellow-500 px-3 py-1 text-white text-xs hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handlerDelete(tr?._id)}
                    className="rounded-md bg-red-500 px-3 py-1 text-white text-xs hover:bg-red-600"
                  >
                    Trash
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
