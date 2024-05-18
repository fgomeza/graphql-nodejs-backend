import jwt from 'jsonwebtoken'

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    }
    return null
  } catch (err) {
    return null
  }
}

const context = async ({ req, res }) => {
  const token = req.headers.authorization || ''
  const user = getUser(token)

  if (user) {
    return { user }
  }

  return {}
}

export default context