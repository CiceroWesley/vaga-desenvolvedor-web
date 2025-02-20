import { useCallback, useEffect, useState } from "react"
import Form from "./components/Form"
import { Container } from "./styled"
import { User } from "./services/users/types"
import users from "./services/users"



function App() {
  const [usersD, setUsersD] = useState<User[]>([])

  const getUsers = useCallback(async () => {
    try {
      const { data } = await users.listUsers()
      if (data) {
        setUsersD(data)
      }
    } catch (error) {
      alert('Ocorreu um erro aos buscar os usuários')
    }
  }, [])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <>
      <Container>
        <h1>Formulário de Contato</h1>
        <Form getUsers={getUsers} />
        <ul>
          {usersD && usersD.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export default App
