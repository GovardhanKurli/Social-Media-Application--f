

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

function Search() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (username.trim()) {
      setLoading(true);
      fetchResultsDebounced(username);
    } else {
      setResults([]);
      setNoResults(false);
    }
  }, [username]);

  const fetchResultsDebounced = debounce(async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:5001/user/search?username=${searchTerm}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);

    }
  }, 300); // Adjust the debounce delay as needed

  return (
    <div className="search-container p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter User Name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="flex-grow p-3 text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition duration-200"
        >
          Search
        </button>
      </form>

      {loading && (
        <p className="text-center text-gray-500 font-medium">Searching...</p>
      )}

      <div className="search-results">
        {results.length > 0 ? (
          results.map(user => (
            <Link
              to={`/profile/${user._id}`}
              key={user._id}
              className="block p-4 bg-white border border-gray-200 rounded-lg mb-4 shadow hover:shadow-md hover:bg-gray-50 transition duration-200"
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={user.profilePicture || 'https://via.placeholder.com/50'}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                  <p className="text-sm text-gray-500">Click to view profile</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          !loading && noResults && (
            <p className="text-center text-gray-500">No users found</p>
          )
        )}
      </div>
    </div>
  );
}

export default Search;
