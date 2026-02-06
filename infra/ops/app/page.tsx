"use client";

import React, { useEffect, useState } from "react";
import { LayoutDashboard, Users, MoreHorizontal, RefreshCw } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  stage: string;
};

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/leads`);
      const data = await res.json();

      // Backend returns: [{ id, name, email, phone… }]
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const createLead = async () => {
    setSyncing(true);
    const id = Math.floor(Math.random() * 99999);

    await fetch(`${API_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `Student ${id}`,
        email: `student${id}@gmail.com`,
        phone: `90000${id}`,
      }),
    });

    await fetchLeads();
    setSyncing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="h-[72px] bg-white border-b px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            W
          </div>
          <h1 className="font-bold">WHY MBA 360</h1>
        </div>

        <button
          onClick={createLead}
          disabled={syncing}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          {syncing ? <RefreshCw size={16} className="animate-spin" /> : "+ New Test Lead"}
        </button>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 hidden lg:block p-4 border-r bg-white">
          <button className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
            <Users size={18} /> Leads
          </button>
        </aside>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold">Lead Overview</h2>
              <p className="text-slate-500 text-sm mt-1">Live data from backend</p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-bold text-blue-600">
                {leads.length}
              </span>
              <p className="text-xs text-gray-400 uppercase font-bold">Total Leads</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b bg-gray-50 flex justify-between text-sm font-semibold">
              <span>Recent Activity</span>
              <MoreHorizontal className="text-gray-400" />
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Stage</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">
                      Loading leads...
                    </td>
                  </tr>
                )}

                {!loading &&
                  leads.map((l) => (
                    <tr key={l.id} className="hover:bg-blue-50">
                      <td className="px-6 py-4 font-medium">{l.name}</td>
                      <td className="px-6 py-4 text-gray-500">{l.email}</td>
                      <td className="px-6 py-4 text-gray-500">{l.phone}</td>
                      <td className="px-6 py-4">
                        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                          {l.stage || "New"}
                        </span>
                      </td>
                    </tr>
                  ))}

                {!loading && leads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-400">
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
