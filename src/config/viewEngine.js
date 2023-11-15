import express from "express";
let configViewEngigne = (app) => {
    // arrow function
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs"); //jsp, blabe
    app.set("views", "./src/views")
}

module.exports = configViewEngigne;