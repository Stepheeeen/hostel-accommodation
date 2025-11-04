import { useStore } from "./store"

export const loginUser = (email: string, password: string) => {
  const { users, setCurrentUser } = useStore.getState()
  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    setCurrentUser(user)
    return { success: true, user }
  }
  return { success: false, error: "Invalid email or password" }
}

export const signupUser = (name: string, email: string, password: string, role: "student" | "owner") => {
  const { users, setCurrentUser } = useStore.getState()

  if (users.find((u) => u.email === email)) {
    return { success: false, error: "Email already exists" }
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role,
  }

  useStore.setState({ users: [...users, newUser] })
  setCurrentUser(newUser)
  return { success: true, user: newUser }
}

export const logoutUser = () => {
  useStore.setState({ currentUser: null })
}
