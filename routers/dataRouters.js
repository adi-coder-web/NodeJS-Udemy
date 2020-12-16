const express=require('express')
const dataController=require('../controllers/dataController')
const authController=require('../controllers/authController')
const Router=express.Router()

Router.post('/signup',authController.signup)

Router.route('/user-stats',dataController.userStats)
Router.route('/monthly-plan/:year',dataController.getMonthlyPlan)

Router.route('/').get(dataController.getAllData).post(dataController.postData)
Router.route('/:id').get(dataController.getData).patch(dataController.updateData).delete(dataController.deleteData)

module.exports=Router;

