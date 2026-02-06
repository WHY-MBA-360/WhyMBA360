'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type College = {
  college: string;
  aspirants: number;
};

type Region = {
  region: string;
  colleges: College[];
};

export default function OperatorDashboard() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/operator/regions')
      .then(res => res.json())
      .then(data => {
        setRegions(data.regions || []);
        setLoading(false);
      })
      .catch(() => {
        setRegions([]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Operator Dashboard – Regional Snapshot</h1>
      <p>Live demand across regions</p>

      <hr style={{ margin: '20px 0' }} />

      {loading && <p>Loading regional data…</p>}

      {!loading && regions.length === 0 && (
        <p style={{ color: 'red' }}>No regional data available</p>
      )}

      {!loading && regions.map(region => {
        const total = region.colleges.reduce(
          (sum, c) => sum + c.aspirants,
          0
        );

        return (
          <div
            key={region.region}
            style={{
              border: '1px solid #ccc',
              padding: 16,
              marginBottom: 12
            }}
          >
            <h3>{region.region} India</h3>
            <strong>Total Aspirants:</strong> {total.toLocaleString()}

            <ul>
              {region.colleges.map(c => (
                <li key={c.college}>
                  {c.college}: {c.aspirants.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <hr style={{ margin: '30px 0' }} />

      <h3>Operator Actions</h3>
      <ul style={{ lineHeight: '2em' }}>
        <li>→ <Link href="/operator/cohort">Build Cohort</Link></li>
        <li>→ <Link href="/operator/college/IIM-BANGALORE">College Drilldown</Link></li>
        <li>→ <Link href="/operator/outreach">Outreach Hub</Link></li>
        <li>→ <Link href="/operator/campaign">Campaign Engine</Link></li>
      </ul>
    </div>
  );
}
