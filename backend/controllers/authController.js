const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = process.env.JWT_SECRET
const createToken = (user) => jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' })

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already used' })
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashed, role: role === 'admin' ? 'admin' : 'customer' })
    await user.save()
    const token = createToken(user)
    res.cookie('token', token, { maxAge: 7*24*60*60*1000 })
    res.json({ name: user.name, role: user.role })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' })
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' })
    const token = createToken(user)
    res.cookie('token', token, { maxAge: 7*24*60*60*1000 })
    res.json({ name: user.name, role: user.role })
  } catch (e) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
}
