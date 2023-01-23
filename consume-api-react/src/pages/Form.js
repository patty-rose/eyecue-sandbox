import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(name)
    const userData = { name: `${name}`, email: `${email}`};
    try {
      await fetch("http://localhost:3001/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  }


  return(
    <form onSubmit={handleSubmit}>
      <label>
        name:
        <input type="text" name="name" onChange={e => setName(e.target.value)} />
      </label>
      <label>
        email:
        <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
export default Form;
