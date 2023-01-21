const jwt = require('jsonwebtoken')
const User = require('../Models/UserSchema')
const Promotor = require('../Models/Promoter')
const Ambassador = require('../Models/CampusAmbassadorSchema')

var checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const id = await userID;
      // Get User from Token
      req.user = await User.findById(userID).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

module.exports = checkUserAuth

// PromotorAuth

var checkPromotorAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { PromotorId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const id = await PromotorId;
      // Get Promotor from Token
      req.promotor = await Promotor.findById(PromotorId).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

module.exports = checkPromotorAuth


// AmbassadorAuth

var checkAmbassadorAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { AmbassadorId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const id = await AmbassadorId;
      // Get Promotor from Token
      req.ambassador = await Ambassador.findById(AmbassadorId).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

module.exports = checkAmbassadorAuth
