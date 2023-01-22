const Event = require('../Models/EventSchema')

const EventRecomendation = (data) =>{
    const year = data.year || ['all']
    const department = data.deptartment || ['all']
    const interest = data.interest || ['all']
    const group = data.group || ['all']
    const trending = null

    const yearEvent = Event.find({year : {$all: year}})
    const departmentEvent  = Event.find({department: {$all: department}})
    const interestEvent  = Event.find({interest: {$all: interest}})
    const groupEvent  = Event.find({group: {$all: group}})
    const trendingEvent = []

    const filters = [trendingEvent, interestEvent, groupEvent, departmentEvent, yearEvent]
    const filtersPoint = [20,18,16,14,13]
    const rawFilteredEvents = [] 
    filters.map(filter => rawFilteredEvents.push(...filter))

    // BROOTEFORCE
    const candidateEvents = new set(
        rawFilteredEvents.map(({EID})=>EID))
        .map(EID=>rawFilteredEvents
            .find(item => item.EID ===EID)))
    
    valuedEvent = candidateEvents.map(event => {
        for(let i=0; i<5; i++){
            if(event.include(filters[i])){
                let value = event.value || 0
                event.value = value + filtersPoint[i]
            }
        }
    })

    valuedEvent.sort((a, b)=>a.value-b.value)
    
    return valuedEvent.slice(0, 6)
    
    // some function
    
}