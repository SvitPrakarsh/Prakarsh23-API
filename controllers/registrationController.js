const Registration = require('../Models/RegistrationSchema')

const registrationController = (req) =>{
    const register = Registration.create({
        UID: req.user._id,
        promoter: req.user.promoter_id,
        participants: req.body.participants,
        alias: req.body.alias
    })
    return register
}

module.exports = registrationController