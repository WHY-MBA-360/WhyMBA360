'use client';

import { useState } from 'react';
import {
  MessageSquare,
  Send,
  Eye,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export default function CampaignEngine() {
  const [template, setTemplate] = useState(
    'Hi {{name}}, we noticed your interest in {{college}}. The application deadline is {{deadline}}. Need help?'
  );

  const preview = template
    .replace('{{name}}', 'Rahul')
    .replace('{{college}}', 'NMIMS Mumbai')
    .replace('{{deadline}}', '30 Jan');

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT: TEMPLATE BUILDER */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <MessageSquare className="text-indigo-600" />
              Campaign Message Builder
            </h2>

            <label className="text-xs font-semibold text-slate-500">
              Message Template
            </label>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full h-48 mt-2 p-4 border rounded-lg font-mono text-sm"
            />

            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 mb-2">
                Insert Dynamic Variables
              </p>
              <div className="flex flex-wrap gap-2">
                {['{{name}}', '{{college}}', '{{city}}', '{{deadline}}'].map(v => (
                  <button
                    key={v}
                    onClick={() => setTemplate(t => t + ' ' + v)}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded"
                  >
                    + {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
            <AlertCircle className="text-amber-600" />
            <p className="text-xs text-amber-800">
              WhatsApp templates must be pre-approved. Dynamic variables must match approved schema.
            </p>
          </div>
        </div>

        {/* RIGHT: PREVIEW + SEND */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-2xl text-white">
            <h3 className="text-sm uppercase text-indigo-400 mb-4 flex items-center gap-2">
              <Eye size={16} /> Live Preview
            </h3>

            <div className="bg-green-100 text-slate-900 p-4 rounded-xl max-w-md ml-auto">
              <p className="text-sm">{preview}</p>
              <span className="text-[10px] text-slate-500 block text-right mt-1">
                09:42 ✓✓
              </span>
            </div>

            <div className="mt-8 space-y-2 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Target Cohort</span>
                <span className="font-bold text-white">NM-WEST-412</span>
              </div>
              <div className="flex justify-between">
                <span>Total Recipients</span>
                <span className="font-bold text-white">412 Aspirants</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
              <Send size={18} />
              FIRE CAMPAIGN
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <ShieldCheck className="text-indigo-600" />
              <div>
                <p className="text-sm font-semibold">Auto-logged</p>
                <p className="text-xs text-slate-500">
                  Messages saved to outreach logs
                </p>
              </div>
            </div>
            <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-0.5"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
