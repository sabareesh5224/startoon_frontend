import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './adminDashboard.css';

// Register the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('table'); // State to manage the view

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://st-hbkn.onrender.com/admin-dashboard');
        const { users, chartLabels, chartData } = response.data;

        setUsers(users);
        setChartData({
          labels: chartLabels,
          datasets: [{
            label: 'User Count',
            data: chartData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }],
        });

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const totalUsers = users.length; // Total user count

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Display total users */}
      <div className="total-users-box">
        <h2>Total Users</h2>
        <p>{totalUsers}</p>
      </div>

      {/* Navbar */}
      <nav>
        <button onClick={() => setView('table')}>Table</button>
        <button onClick={() => setView('graph')}>Graph</button>
      </nav>

      {/* Conditional rendering */}
      {view === 'table' ? (
        <div>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            className='search'
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Render user table */}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{new Date(user.lastLoginDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="chart-container">
          {/* Render Bar Chart */}
          {chartData.labels && chartData.labels.length > 0 ? (
            <Bar data={chartData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return `Count: ${tooltipItem.raw}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Months',
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'User Count',
                  }
                }
              }
            }} />
          ) : (
            <p>No data available for chart.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
