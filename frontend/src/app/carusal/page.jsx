"use client";

import { CubeLoader, ExportButton, StatusCard } from "@/components/download-excel";
import { baseApiUrl } from "@/services/apiSlice";
import { useState, useEffect } from "react";

export default function Page() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const startExport = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${baseApiUrl}/games/export`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const response = await res.json();
      const data = response.data;

      if (data.jobId) {
        setJobId(data.jobId);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`${baseApiUrl}/games/export/status/${jobId}`, {
        credentials: "include",
      });

      const response = await res.json();
      const data = response.data;

      setStatus(data);

      if (data.state === "completed" || data.state === "failed") {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center gap-10 p-6">
      <CubeLoader state={status?.state} />

      <ExportButton loading={loading} onClick={startExport} />

      <StatusCard status={status} jobId={jobId} />
    </div>
  );
}


