const express=require("express")
const router=express.Router()
const MyEventsCont=require('../controllers/myevents_cont')

router.post('/myevent',MyEventsCont.myEventCont)

router.get('/myevent',MyEventsCont.fetchMyEvents)

router.get('/confirmed',MyEventsCont.fetchConfirmedEvents)

module.exports=router