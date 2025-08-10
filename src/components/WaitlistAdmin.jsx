import React, { useState, useEffect } from 'react';

const WaitlistAdmin = () => {
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('stats'); // 'stats' or 'users'

  useEffect(() => {
    fetchStats();
    if (view === 'users') {
      fetchUsers();
    }
  }, [view]);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://studysynclp-1.onrender.com/api/waitlist/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://studysynclp-1.onrender.com/api/waitlist/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && view === 'stats') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              📚 StudySync Waitlist Admin
            </h1>
            <p className="text-blue-100 mt-2">Manage and monitor your waitlist signups</p>
          </div>

          {/* Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setView('stats')}
                className={`px-6 py-4 font-medium ${
                  view === 'stats'
                    ? 'text-primary border-b-2 border-primary bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📊 Statistics
              </button>
              <button
                onClick={() => setView('users')}
                className={`px-6 py-4 font-medium ${
                  view === 'users'
                    ? 'text-primary border-b-2 border-primary bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👥 All Users
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {view === 'stats' ? (
              <div>
                {/* Statistics Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Signups</p>
                        <p className="text-3xl font-bold">{stats.total}</p>
                      </div>
                      <div className="text-4xl">👥</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Confirmed</p>
                        <p className="text-3xl font-bold">{stats.confirmed}</p>
                      </div>
                      <div className="text-4xl">✅</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100">Pending</p>
                        <p className="text-3xl font-bold">{stats.pending}</p>
                      </div>
                      <div className="text-4xl">⏳</div>
                    </div>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Confirmation Rate</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${stats.total > 0 ? (stats.confirmed / stats.total) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    <span className="font-bold text-lg">
                      {stats.total > 0 ? Math.round((stats.confirmed / stats.total) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">⏳</div>
                    <p>Loading users...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">Name</th>
                          <th className="px-4 py-3 text-left font-semibold">Email</th>
                          <th className="px-4 py-3 text-left font-semibold">School</th>
                          <th className="px-4 py-3 text-left font-semibold">Status</th>
                          <th className="px-4 py-3 text-left font-semibold">Signup Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{user.name}</td>
                            <td className="px-4 py-3 text-gray-600">{user.email}</td>
                            <td className="px-4 py-3 text-gray-600">{user.school || '-'}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.confirmed 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {user.confirmed ? '✅ Confirmed' : '⏳ Pending'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600 text-sm">
                              {formatDate(user.signup_date)}
                            </td>
                          </tr>
                        ))}
                        {users.length === 0 && (
                          <tr>
                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                              No users found. Start promoting your waitlist!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistAdmin;
