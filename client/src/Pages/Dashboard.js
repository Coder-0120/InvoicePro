import React from 'react';

const Dashboard = () => {
  // TODO: Fetch dashboard stats from backend
  // Example: 
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     const res = await axios.get("http://localhost:5000/api/dashboard/stats");
  //     setStats(res.data);
  //   };
  //   fetchStats();
  // }, []);

  const stats = [
    { label: 'Total Invoices', value: '0', icon: '📄', color: '#059669' },
    { label: 'Paid', value: '0', icon: '✅', color: '#0891b2' },
    { label: 'Pending', value: '0', icon: '⏳', color: '#f59e0b' },
    { label: 'Overdue', value: '0', icon: '⚠️', color: '#ef4444' },
  ];

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Dashboard</h1>
      <p style={styles.pageSubtitle}>Welcome back! Here's your invoice overview</p>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statIcon, background: `${stat.color}15`}}>
              <span style={{fontSize: '24px'}}>{stat.icon}</span>
            </div>
            <div>
              <p style={styles.statLabel}>{stat.label}</p>
              <h2 style={{...styles.statValue, color: stat.color}}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.recentSection}>
        <h2 style={styles.sectionTitle}>Recent Invoices</h2>
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No invoices yet. Create your first invoice!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: '8px',
  },
  pageSubtitle: {
    fontSize: '16px',
    color: '#6B7280',
    marginBottom: '32px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 4px 0',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
  },
  recentSection: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: '16px',
  },
  emptyState: {
    padding: '64px 24px',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '16px',
    color: '#6B7280',
  },
};

export default Dashboard;