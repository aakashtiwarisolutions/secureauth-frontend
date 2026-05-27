import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard, logout } from '../api/api';
import { useAuth } from '../context/AuthContext';

const categoryColors = {
  Passwords: '#4f46e5',
  '2FA': '#0891b2',
  Tokens: '#059669',
  Secrets: '#d97706',
  Transport: '#dc2626',
  Monitoring: '#7c3aed',
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    try { await logout(); } catch (_) {}
    logoutUser();
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-brand">🔐 SecureAuth</div>
        <div className="nav-right">
          <span className="nav-user">👤 {user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">Sign Out</button>
        </div>
      </nav>

      <div className="dashboard-body">
        <div className="welcome-banner">
          <h2>Welcome back, {user?.name}! 👋</h2>
          <p>You are authenticated with a valid JWT token. Your session is active.</p>
        </div>

        {/* JWT Token Info */}
        <div className="section-title">🔑 Your Session</div>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-label">User ID</div>
            <div className="info-value mono">{user?.id?.slice(0, 18)}...</div>
          </div>
          <div className="info-card">
            <div className="info-label">Email</div>
            <div className="info-value">{user?.email}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Account Created</div>
            <div className="info-value">{new Date(user?.createdAt).toLocaleDateString()}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Auth Method</div>
            <div className="info-value">JWT Bearer Token</div>
          </div>
        </div>

        {/* Login History */}
        {user?.loginHistory?.length > 0 && (
          <>
            <div className="section-title">📋 Recent Login Activity</div>
            <div className="login-history">
              {user.loginHistory.slice().reverse().map((entry, i) => (
                <div key={i} className="history-row">
                  <span className="history-dot"></span>
                  <span>{new Date(entry.timestamp).toLocaleString()}</span>
                  <span className="history-ip">IP: {entry.ip || 'unknown'}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Security Tips */}
        <div className="section-title">🛡 Security Best Practices</div>
        <div className="tips-grid">
          {data?.securityTips?.map((tip) => (
            <div key={tip.id} className="tip-card">
              <span
                className="tip-badge"
                style={{ background: categoryColors[tip.category] + '18', color: categoryColors[tip.category] }}
              >
                {tip.category}
              </span>
              <p>{tip.tip}</p>
            </div>
          ))}
        </div>

        {/* Token display */}
        <div className="section-title">🧾 Live JWT Token</div>
        <div className="token-box">
          <p className="token-label">Your current token (stored in localStorage):</p>
          <div className="token-value mono">{localStorage.getItem('token')}</div>
          <p className="token-note">⚠ In production, use httpOnly cookies instead of localStorage for better XSS protection.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
