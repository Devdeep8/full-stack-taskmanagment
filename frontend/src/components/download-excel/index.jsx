export function CubeLoader({ state }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-24 h-24 relative rounded-2xl shadow-xl flex items-center justify-center 
        bg-linear-to-br from-sky-400 to-blue-600 text-white font-semibold
        transition-all duration-500
        ${state === "active" ? "animate-spin" : ""}
        `}
      >
        <span className="text-sm tracking-wide">{state || "Idle"}</span>
      </div>

      {state === "active" && (
        <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse w-full" />
        </div>
      )}
    </div>
  );
}

export function ExportButton({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        px-6 py-3 rounded-xl font-medium text-white
        bg-linear-to-r from-blue-600 to-indigo-600
        hover:from-blue-700 hover:to-indigo-700
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 shadow-lg
      "
    >
      {loading ? "Starting Export..." : "Export Games"}
    </button>
  );
}

export function StatusCard({ status, jobId }) {
  if (!status) return null;

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Export Status</h2>

      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">Job ID:</span> {jobId}
        </p>

        <p>
          <span className="font-medium text-gray-800">State:</span>{" "}
          <span
            className={`capitalize font-semibold ${
              status.state === "completed"
                ? "text-green-600"
                : status.state === "failed"
                  ? "text-red-600"
                  : "text-blue-600"
            }`}
          >
            {status.state}
          </span>
        </p>

        <p>
          <span className="font-medium text-gray-800">Progress:</span>{" "}
          {status.progress ?? 0}%
        </p>
      </div>

      {status.result?.fileUrl && (
        <a
          href={status.result.fileUrl}
          target="_blank"
          className="
            block text-center mt-4 py-2 rounded-lg
            bg-green-600 text-white font-medium
            hover:bg-green-700 transition-all duration-200
          "
        >
          Download Excel
        </a>
      )}

      {status.error && (
        <p className="text-red-600 text-sm font-medium">
          Error: {status.error}
        </p>
      )}
    </div>
  );
}