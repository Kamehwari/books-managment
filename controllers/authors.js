
const express   =       require('express');
const router    =       express.Router();
const userConfig = require('../schema/inputSchema').config
const {schemaValidator, sendResponse} = require("../helpers/utils");
const authorDataMgr = require('../dataManagers/authorsDataMgr')

router.post('/authors', async(req, res)=>{
    try {
        let authorJSON = req.body;
        let errorList = await schemaValidator(authorJSON, userConfig["authors"]);
        if(errorList.length){
            return sendResponse(res, 406, "Missing Mandatory Information", 'author', errorList);
        }
        let result = await authorDataMgr.createauthor(authorJSON);
        if(result.status){
            return sendResponse(res, 200, result.message, "author", result.data)
        }else{
            return sendResponse(res, 400, result.message, "author")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "author")
    }
})

router.get('/authors/task1', async(req, res)=>{
    try {
        let no_of_awards = (req.headers.no_of_awards) ? parseInt(req.headers.no_of_awards)  : 0
        let result = await authorDataMgr.getauthorstask1(no_of_awards);
        if(result.status){
            return sendResponse(res, 200, result.message, "author", result.data)
        }else{
            return sendResponse(res, 400, result.message, "author")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "author")
    }
})


router.get('/authors/task2', async(req, res)=>{
    try {
        let year = (req.headers.year) ? parseInt(req.headers.year)  : 0
        let result = await authorDataMgr.getauthorstask2(year);
        if(result.status){
            return sendResponse(res, 200, result.message, "author", result.data)
        }else{
            return sendResponse(res, 400, result.message, "author")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "author")
    }
})
router.get('/authors/task2', async(req, res)=>{
    try {
        let year = (req.headers.year) ? parseInt(req.headers.year)  : 0
        let result = await authorDataMgr.getauthorstask2(year);
        if(result.status){
            return sendResponse(res, 200, result.message, "author", result.data)
        }else{
            return sendResponse(res, 400, result.message, "author")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "author")
    }
})

router.get('/authors/task3', async(req, res)=>{
    try {
        let result = await authorDataMgr.getauthorstask3();
        if(result.status){
            return sendResponse(res, 200, result.message, "author", result.data)
        }else{
            return sendResponse(res, 400, result.message, "author")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "author")
    }
})
router.get('/authors/task4', async(req, res)=>{
    try {
        let dob = req.headers.dob;
        let totalPrice = req.headers.totalPrice;
        let result = await authorDataMgr.getauthorstask4(dob, totalPrice);
        if(result.status){
            return sendResponse(res, 200, result.message, "author", result.data)
        }else{
            return sendResponse(res, 400, result.message, "author")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "author")
    }
})

module.exports = router;