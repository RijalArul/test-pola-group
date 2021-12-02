import axios from 'axios'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'

function App () {
  const [users, setUsers] = useState([])
  const [addUser, setAddUser] = useState({})
  const [user, setUser] = useState({})

  const API_KEY = `89952a727d3410c631174eabfa05b6e684aa4cc790b1a15e56bbcc8905c5febe`
  useEffect(() => {
    async function fetchUsers () {
      try {
        const resp = await axios.get(`https://gorest.co.in/public/v1/users`, {
          headers: {
            Authorization: API_KEY
          }
        })

        const { data } = resp.data
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUsers()
  }, [])

  async function handleAddForm (e) {
    e.preventDefault()
    try {
      const resp = await fetch(`https://gorest.co.in/public/v1/users`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addUser)
      })

      const { data } = await resp.json()
      const newUsers = [...users, data]
      setUsers(newUsers)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange (e) {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value
    })
  }
  function addForm () {
    return (
      <>
        <form onSubmit={handleAddForm}>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Email address
            </label>
            <input
              type='email'
              name='email'
              onChange={e => handleChange(e)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              name
            </label>
            <input
              type='text'
              name='name'
              onChange={e => handleChange(e)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Gender
            </label>
            <input
              type='text'
              name='gender'
              onChange={e => handleChange(e)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Status
            </label>
            <input
              type='text'
              name='status'
              onChange={e => handleChange(e)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <button type='submit' class='btn btn-primary'>
            Submit
          </button>
        </form>
      </>
    )
  }

  async function fetchUser (id) {
    try {
      const resp = await axios.get(
        `https://gorest.co.in/public/v1/users/${id}`,
        {
          headers: {
            Authorization: API_KEY
          }
        }
      )

      const { data } = resp.data
      setUser(data)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChangeEdit (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  function editUser (e) {
    return (
      <>
        <form onSubmit={handleAddForm}>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Email address
            </label>
            <input
              type='email'
              name='email'
              onChange={e => handleChangeEdit(e)}
              value={user.email}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              name
            </label>
            <input
              type='text'
              name='name'
              onChange={e => handleChange(e)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Gender
            </label>
            <input
              type='text'
              name='gender'
              onChange={e => handleChange(e)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Status
            </label>
            <input
              type='text'
              name='status'
              onChange={e => handleChange(e)}
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
            />
          </div>
          <button type='submit' class='btn btn-primary'>
            Submit
          </button>
        </form>
      </>
    )
  }

  async function deleteUser (id) {
    console.log(id)
    try {
      await fetch(`https://gorest.co.in/public/v1/users/${id}`, {
        headers: {
          Authorization: API_KEY
        },
        method: 'DELETE'
      })

      const newUsers = users.filter(user => user.id !== id)
      setUsers(newUsers)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h3>Add Form</h3>
      {addForm()};{editUser()}
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>EMail</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => {
              return (
                <tr>
                  <th>{i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button
                      type='button'
                      class='btn btn-danger'
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      class='btn btn-primary'
                      onClick={() => fetchUser(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default App
