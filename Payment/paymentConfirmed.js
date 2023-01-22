const mongoose = require('mongoose')
const Participant = require('../Models/ParticipantSchema')
const CartAndOrder = require('../Models/CartAndOrderSchema')
const Registration = require('../Models/RegistrationSchema')
const sendRecipt = require('../Email/sendRecipt')

function updateParticipants(registration){
    const event = registration.EID
    registration.team.forEach((member)=>{
        const participant = Participant.findOne({phone: member.phone})
        if(participant){
            participant.events.push(event)
        } else {
            const participant = new Participant({
                name: member.name,
                phone: member.phone,                
            })
            participant.events.push(event)
            participant.save()
        }
        sendRecipt(participant, event, registration.RID)
    })


    // sales table mongodb update, parameters: registration model object (diya)
    
    // sales table firebase update, parameters: sales model object (dev)
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