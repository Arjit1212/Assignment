import React, { useState, useEffect } from "react";
import './App.css';
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedUsers, setSortedUsers] = useState([]);
  const [pastSearches, setPastSearches] = useState([]);
  const [sortByClicked, setSortByClicked] = useState(false);

  // Fetch users from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setSortedUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Function to handle search
  const handleSearch = () => {
    // Filter users by name
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If sortByClicked is true, apply sorting before setting the sortedUsers
    setSortedUsers(sortByClicked ? sortUsersByName(filteredUsers) : filteredUsers);

    // Add search term to past searches if searchTerm is not empty
    if (searchTerm.trim() !== '') {
      setPastSearches(prevSearches => prevSearches.concat(searchTerm));
    }
  };

  // Function to sort users by name
  const sortByName = () => {
    setSortByClicked(true);
    setSortedUsers(sortUsersByName(users));
  };

  // Helper function to sort users by name
  const sortUsersByName = (usersToSort) => {
    return Array.from(usersToSort).sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
        <h1>USER INFO</h1>
          <div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={sortByName}>Sort by Name</button>
            <div>
              <h3 className="past">Past Searches:</h3>
              <p className="past">
                {pastSearches.map((search, index) => (
                  <span key={index}>{search}</span>
                ))}
              </p>
            </div>
            <p>
              {sortedUsers.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </p>
            
          </div>
        </div>
        <p className="second">Go Back to 1st Assesment</p>
        <Link to={"/"}><button>Click Here </button></Link>
      </div>
    </div>
  );
};

export default UserList;

