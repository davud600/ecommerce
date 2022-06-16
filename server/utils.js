import jwt from 'jsonwebtoken'

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization) {
    const token = authorization.slice(7, authorization.length) // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(400).send({message: 'Invalid token'})
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({message: 'No token'})
  }
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdming: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}
