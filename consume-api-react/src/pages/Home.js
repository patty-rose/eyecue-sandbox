import React, { useState, useEffect }  from 'react';

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
      fetch("http://localhost:3001/users")
          .then((res) => {
            res.json()
            console.log(res)
          })
          .then(
              (data) => {
                  setIsLoaded(true);
                  setUsers(data);
                  console.log(users);
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          )
    }, [])
if (error) {
      return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
      return <div>Loading...</div>;
  } else {
      return (
          <ul>
              {users.map(user => (
              <li key={user.id}>
                  {user.name} 
              </li>
              ))}
          </ul>
      );
  }
}
export default Home;