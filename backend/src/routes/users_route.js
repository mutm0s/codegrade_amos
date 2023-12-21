const express=require("express")
const router=express.Router()
const UserDetailsCont=require('../controllers/users_cont')

router.post('/users',UserDetailsCont.UserDetailsCont)

router.delete('/users',UserDetailsCont.dltAlumniById)

router.get('/retrieveUsers',UserDetailsCont.fetchUsers)

router.get('/role',UserDetailsCont.alumniRole)

module.exports=router