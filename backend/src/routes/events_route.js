const express=require("express")
const router=express.Router()
const OurEventsCont=require('../controllers/events_cont')

router.post('/events',OurEventsCont.createOurEvent)

router.delete('/events',OurEventsCont.dltEventById)

router.get('/events',OurEventsCont.fetchEventsByEmail)

router.get('/all',OurEventsCont.fetchAllEvents)

router.get('/numEvents',OurEventsCont.fetchAboutEvents)

module.exports=router

