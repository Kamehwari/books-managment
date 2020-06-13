const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";


const createauthor = async(authorJSON)=>{
    try {
       let db = await MongoClient.connect(url)
        console.log("Database created!");
        const Database = db.db("authors");
        await Database.collection('authors').insertOne(authorJSON)
        db.close();
        return {"status":true, "message":"Successfull Creation"}
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}
const getauthorstask1 = async(no_of_awards)=>{
    try {
        let db = await MongoClient.connect(url)
        console.log("Database created!", typeof no_of_awards);
        const Database = db.db("authors");
        let authors = await Database.collection('authors').find({awards: { $gte: no_of_awards }}).toArray()
        console.log(authors)
        return {"status":true, "message":"Fetched Successfully", "data":authors};
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}

const getauthorstask2 = async(year)=>{
    try {
        let db = await MongoClient.connect(url)
        const Database = db.db("authors");
        let authors = await Database.collection('authors').find({year: { $gte: year }}).toArray()
        console.log(authors)
        return {"status":true, "message":"Fetched Successfully", "data":authors};
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}
const getauthorstask3 = async()=>{
    try {
        let db = await MongoClient.connect(url)
        const Database = db.db("authors");
        let authors = await Database.collection('authors').aggregate([
            {
                "$group":{
                    "_id":"$name", 
                    totalBooksSold :    { $sum:"$sold"},
                    totalProfit: { $sum :{$multiply: ["$sold", "$cost"]} }
                }
            }
        ]).toArray()
        console.log(authors)
        return {"status":true, "message":"Fetched Successfully", "data":authors};
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}
const getauthorstask4 = async(dob, totalPrice)=>{
    try {
        let db = await MongoClient.connect(url)
        const Database = db.db("authors");
        let authors = await Database.collection('authors').aggregate([{                 
                "$match":{                     
                    "dob": {"$gte":dob}              
                }            
            } , {
                "$group":{
                    "_id":"$name",
                    "total":{"$sum":"$price"}
                }
            }        
        ]).toArray()
        console.log(authors)
        return {"status":true, "message":"Fetched Successfully", "data":authors};
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}
module.exports ={
    createauthor,
    getauthorstask1,
    getauthorstask2,
    getauthorstask4,
    getauthorstask3
}