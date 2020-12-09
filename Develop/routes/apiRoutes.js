var db = require("../db/db.json");
var path = require("path");
const fs = require("fs");
const { request } = require("http");
const { title } = require("process");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // Basic route that sends the user first to the AJAX Page


  app.get("/api/notes", function(req, res) {
   const newDb = fs.readFileSync("./db/db.json")
   //console.log(newDb)
   res.json(JSON.parse(newDb));
  });

  app.get("/api/notes/:id", function(req, res) {

    res.json(data[Number(req.params.id)]);

});

app.post("/api/notes", function(req, res) {

  let newNote = req.body;
  let uniqueId = (data.length).toString();
  //console.log(uniqueId);
  newNote.id = uniqueId;
  data.push(newNote);
  db.push(req.body);
  fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
      if (err) throw (err);        
  }); 

  res.json(data);    

  });

  app.delete("/api/notes/:id", function(req, res) {

    let noteId = req.params.id;
    let newId = 0;
    //console.log(`Deleting note with id ${noteId}`);
    data = data.filter(currentNote => {
       return currentNote.id != noteId;
    });
    for (currentNote of data) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
})};
