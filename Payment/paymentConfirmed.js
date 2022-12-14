const mongoose = require('mongoose')
const Participant = require('../Models/ParticipantSchema')
const CartAndOrder = require('../Models/CartAndOrderSchema')
const Registration = require('../Models/RegistrationSchema')

function updateParticipants(registration){
    const event = registration.EID
    registration.participants.forEach((tempParticipant)=>{
        const participant = Participant.findOne({phone: tempParticipant.phone})
        if(participant){
            participant.events.push(event)
        } else {
            const participant = new Participant({
                name: tempParticipant.name,
                phone: tempParticipant.phone,                
            })
            participant.events.push(event)
            participant.save()
        }
    })
}

const paymentConfirmed = (order_id) =>{
    // Grab Registration Detail
    const cart = CartAndOrder.findOne(order_id).cart
    const registrations = cart.registrations


    // Add details to participants collection
    registrations.forEach(RID=>{
        updateParticipants(Registration.findById(RID))
    })

    // clear cart
    cart.methods.clearCart((err, data) =>{
        if(err){
            console.log(err)
        } else {
            console.log(data)
        }
    })

    // send email to participants
    

    // update sales table


}

module.exports = paymentConfirmed