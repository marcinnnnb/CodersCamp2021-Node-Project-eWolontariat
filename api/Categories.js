const { db } = require("./Models/categoriesModel");


exports.dataCategories= function(){

        db.collection('categories').insertMany(
    
            [{name:"Excel", color:"green", icon:"comp"},
            {name:"Tłumaczenia", color:"pink", icon:"comp"},
            {name:"Wyprowadzanie psów", color:"green", icon:"paw"},
            {name:"Strony www", color:"green", icon:"paw"},
            {name:"Korepetycje", color:"green", icon:"paw"},
            {name:"Opieka nad dziećmi", color:"green", icon:"paw"},
            {name:"Fotografia", color:"green", icon:"paw"},    
            ], (err) => {
                if(err) {
                    console.log("ERROR: Baza kategorii jest już zainicjalizowana")
                }
            });
    

}