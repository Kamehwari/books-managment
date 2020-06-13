exports.config ={
    authors : {
        "id": "/authors",
        "type": "object",
        "properties":{
           "name":{"type":"string", "required":true},
           "awards":{"type":"number", "required":true},
           "year":{"type":"number", required : false}
        }
    },
}