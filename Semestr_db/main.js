const express = require("express");

const app = express();

const urlencodedParser = express.urlencoded({extended: false});

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";

const mongoClient = new MongoClient(url);

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/choise", urlencodedParser, function (request, response) {
    mongoClient.connect(function(err, client){

        const db = client.db("SportsOrganizationsСity");

        let b = request.body.collect;
        if (b === "Types_of_sports"){
            const collection = db.collection(`${b}`);
            if(err) return console.log(err);

            collection.find()
                .toArray(function(err, results){
                    let a = "<form action=\"/insertTypes_of_sports" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                        + "<label>\n" +
                        "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                        "    </label>"
                        + "</form>";
                    for(let i = 0; i < results.length; i++){
                        a = a + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title
                            + "<div style='display: flex; width: 600px'>"
                            + "<br>"
                            + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                            "        <select size=\"1\" name=\"opt\">\n" +
                            "            <option>title</option>\n" +
                            "        </select>\n" +
                            "    </label>"
                            + "<label>\n" +
                            "        <input name=\"val\" type=\"text\">\n" +
                            "    </label>"
                            + "</form>"
                            + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                            + "</br>"
                            + "</br>"
                            + "</div>";


                        app.post("/delete" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client) {

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Types_of_sports");

                                if (err) return console.log(err);

                                collection.deleteOne({_id: results[i]._id});

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertTypes_of_sports" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<br>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/update" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Types_of_sports");

                                let t = request.body.val;
                                let y = request.body.opt;

                                if(err) return console.log(err);

                                collection.updateOne({_id: results[i]._id}, {$set: {[y] : t }})

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertTypes_of_sports" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<br>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/insertTypes_of_sports", urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Types_of_sports");

                                let t = request.body.val1;

                                if(err) return console.log(err);

                                collection.insertOne(JSON.parse(t));

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertTypes_of_sports" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<br>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                    }
                    response.send(a);
                    client.close();
                });
        }
        else if (b === "Coaches"){
            const collection = db.collection(`${b}`);
            if(err) return console.log(err);

            collection.find()
                .toArray(function(err, results){
                    let a = "<form action=\"/insertCoaches" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                        + "<label>\n" +
                        "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                        "    </label>"
                        + "</form>";
                    for(let i = 0; i < results.length; i++){
                        a = a + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "work_experience: " + results[i].work_experience + ", " + "sport_type_id: " + results[i].sport_type
                            + "<div style='display: flex; width: 600px'>"
                            + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                            "        <select size=\"1\" name=\"opt\">\n" +
                            "            <option>first_name</option>\n" +
                            "            <option>last_name</option>\n" +
                            "            <option>patronymic</option>\n" +
                            "            <option>work_experience</option>\n" +
                            "        </select>\n" +
                            "    </label>"
                            + "<label>\n" +
                            "        <input name=\"val\" type=\"text\">\n" +
                            "    </label>"
                            + "</form>"
                            + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                            + "</br>"
                            + "</br>"
                            + "</div>";

                        app.post("/delete" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client) {

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Coaches");

                                if (err) return console.log(err);

                                collection.deleteOne({_id: results[i]._id});

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertCoaches" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "work_experience: " + results[i].work_experience + ", " + "sport_type_id: " + results[i].sport_type
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>first_name</option>\n" +
                                                "            <option>last_name</option>\n" +
                                                "            <option>patronymic</option>\n" +
                                                "            <option>work_experience</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/update" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Coaches");

                                let t = request.body.val;
                                let y = request.body.opt;

                                if(err) return console.log(err);

                                collection.updateOne({_id: results[i]._id}, {$set: {[y] : t }})

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertCoaches" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "work_experience: " + results[i].work_experience + ", " + "sport_type_id: " + results[i].sport_type
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>first_name</option>\n" +
                                                "            <option>last_name</option>\n" +
                                                "            <option>patronymic</option>\n" +
                                                "            <option>work_experience</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/insertCoaches", urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Coaches");

                                let t = request.body.val1;

                                if(err) return console.log(err);

                                collection.insertOne(JSON.parse(t));

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertCoaches" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "work_experience: " + results[i].work_experience + ", " + "sport_type_id: " + results[i].sport_type
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>first_name</option>\n" +
                                                "            <option>last_name</option>\n" +
                                                "            <option>patronymic</option>\n" +
                                                "            <option>work_experience</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                    }
                    response.send(a);
                    client.close();
                });
        }
        else if (b === "Awards"){
            const collection = db.collection(`${b}`);
            if(err) return console.log(err);

            collection.find()
                .toArray(function(err, results){
                    let a = "<form action=\"/insertAwards" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                        + "<label>\n" +
                        "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                        "    </label>"
                        + "</form>";
                    for(let i = 0; i < results.length; i++){
                        a = a + "<br>" + "№: " + results[i]._id + ", " + "place_in_competition: " + results[i].place_in_competition + ", " + "competition_id: " + results[i].competition + ", " + "athlet: " + results[i].athlet
                            + "<div style='display: flex; width: 600px'>"
                            + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                            "        <select size=\"1\" name=\"opt\">\n" +
                            "            <option>place_in_competition</option>\n" +
                            "        </select>\n" +
                            "    </label>"
                            + "<label>\n" +
                            "        <input name=\"val\" type=\"text\">\n" +
                            "    </label>"
                            + "</form>"
                            + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                            + "</br>"
                            + "</br>"
                            + "</div>";

                        app.post("/delete" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client) {

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Awards");

                                if (err) return console.log(err);

                                collection.deleteOne({_id: results[i]._id});

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertAwards" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "place_in_competition: " + results[i].place_in_competition + ", " + "competition_id: " + results[i].competition + ", " + "athlet: " + results[i].athlet
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>place_in_competition</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/update" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Awards");

                                let t = request.body.val;
                                let y = request.body.opt;

                                if(err) return console.log(err);

                                collection.updateOne({_id: results[i]._id}, {$set: {[y] : t }})

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertAwards" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "place_in_competition: " + results[i].place_in_competition + ", " + "competition_id: " + results[i].competition + ", " + "athlet: " + results[i].athlet
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>place_in_competition</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/insertAwards", urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Awards");

                                let t = request.body.val1;

                                if(err) return console.log(err);

                                collection.insertOne(JSON.parse(t));

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertAwards" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "place_in_competition: " + results[i].place_in_competition + ", " + "competition_id: " + results[i].competition + ", " + "athlet: " + results[i].athlet
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>place_in_competition</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                    }
                    response.send(a);
                    client.close();
                });
        }
        else if (b === "Sports_facilities"){
            const collection = db.collection(`${b}`);
            if(err) return console.log(err);

            collection.find()
                .toArray(function(err, results){
                    let a = "<form action=\"/insertSports_facilities" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                        + "<label>\n" +
                        "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                        "    </label>"
                        + "</form>";
                    for(let i = 0; i < results.length; i++){
                        let l = "[";
                        for(let j = 0; j < results[i].attributes.length; j++) {
                            l = l + "{title: " + results[i].attributes[j].title + ", " + "meaning: " + results[i].attributes[j].meaning + ", " + "measure_unit: " + results[i].attributes[j].measure_unit + "}";
                        }
                        l = l + "]";
                        a = a + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "address: " + results[i].address + ", " + "category: " + results[i].category + ", " + "cattributes: " + l
                            + "<div style='display: flex; width: 600px'>"
                            + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                            "        <select size=\"1\" name=\"opt\">\n" +
                            "            <option>title</option>\n" +
                            "            <option>address</option>\n" +
                            "            <option>category</option>\n" +
                            "        </select>\n" +
                            "    </label>"
                            + "<label>\n" +
                            "        <input name=\"val\" type=\"text\">\n" +
                            "    </label>"
                            + "</form>"
                            + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                            + "</br>"
                            + "</br>"
                            + "</div>";

                        app.post("/delete" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client) {

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Sports_facilities");

                                if (err) return console.log(err);

                                collection.deleteOne({_id: results[i]._id});

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertSports_facilities" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            let l = "[";
                                            for(let j = 0; j < results[i].attributes.length; j++) {
                                                l = l + "{title: " + results[i].attributes[j].title + ", " + "meaning: " + results[i].attributes[j].meaning + ", " + "measure_unit: " + results[i].attributes[j].measure_unit + "}";
                                            }
                                            l = l + "]";
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "address: " + results[i].address + ", " + "category: " + results[i].category + ", " + "cattributes: " + l
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "            <option>address</option>\n" +
                                                "            <option>category</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/update" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Sports_facilities");

                                let t = request.body.val;
                                let y = request.body.opt;

                                if(err) return console.log(err);

                                collection.updateOne({_id: results[i]._id}, {$set: {[y] : t }})

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertSports_facilities" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            let l = "[";
                                            for(let j = 0; j < results[i].attributes.length; j++) {
                                                l = l + "{title: " + results[i].attributes[j].title + ", " + "meaning: " + results[i].attributes[j].meaning + ", " + "measure_unit: " + results[i].attributes[j].measure_unit + "}";
                                            }
                                            l = l + "]";
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "address: " + results[i].address + ", " + "category: " + results[i].category + ", " + "cattributes: " + l
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "            <option>address</option>\n" +
                                                "            <option>category</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/insertSports_facilities", urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Sports_facilities");

                                let t = request.body.val1;

                                if(err) return console.log(err);

                                collection.insertOne(JSON.parse(t));

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertSports_facilities" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            let l = "[";
                                            for(let j = 0; j < results[i].attributes.length; j++) {
                                                l = l + "{title: " + results[i].attributes[j].title + ", " + "meaning: " + results[i].attributes[j].meaning + ", " + "measure_unit: " + results[i].attributes[j].measure_unit + "}";
                                            }
                                            l = l + "]";
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "address: " + results[i].address + ", " + "category: " + results[i].category + ", " + "cattributes: " + l
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "            <option>address</option>\n" +
                                                "            <option>category</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                    }
                    response.send(a);
                    client.close();
                });
        }
        else if (b === "Athletes"){
            const collection = db.collection(`${b}`);
            if(err) return console.log(err);

            collection.find()
                .toArray(function(err, results){
                    let a = "<form action=\"/insertAthletes" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                        + "<label>\n" +
                        "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                        "    </label>"
                        + "</form>";
                    for(let i = 0; i < results.length; i++){
                        a = a + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "date_of_birth: " + results[i].date_of_birth + ", " + "types_of_sports: " + results[i].types_of_sports + ", " + "sports_club: " + results[i].sports_club
                            + "<div style='display: flex; width: 600px'>"
                            + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                            "        <select size=\"1\" name=\"opt\">\n" +
                            "            <option>first_name</option>\n" +
                            "            <option>last_name</option>\n" +
                            "            <option>patronymic</option>\n" +
                            "            <option>date_of_birth</option>\n" +
                            "            <option>sports_club</option>\n" +
                            "        </select>\n" +
                            "    </label>"
                            + "<label>\n" +
                            "        <input name=\"val\" type=\"text\">\n" +
                            "    </label>"
                            + "</form>"
                            + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                            + "</br>"
                            + "</br>"
                            + "</div>";

                        app.post("/delete" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client) {

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Athletes");

                                if (err) return console.log(err);

                                collection.deleteOne({_id: results[i]._id});

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertAthletes" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "date_of_birth: " + results[i].date_of_birth + ", " + "types_of_sports: " + results[i].types_of_sports + ", " + "sports_club: " + results[i].sports_club
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>first_name</option>\n" +
                                                "            <option>last_name</option>\n" +
                                                "            <option>patronymic</option>\n" +
                                                "            <option>date_of_birth</option>\n" +
                                                "            <option>sports_club</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/update" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Athletes");

                                let t = request.body.val;
                                let y = request.body.opt;

                                if(err) return console.log(err);

                                collection.updateOne({_id: results[i]._id}, {$set: {[y] : t }})

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertAthletes" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "date_of_birth: " + results[i].date_of_birth + ", " + "types_of_sports: " + results[i].types_of_sports + ", " + "sports_club: " + results[i].sports_club
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>first_name</option>\n" +
                                                "            <option>last_name</option>\n" +
                                                "            <option>patronymic</option>\n" +
                                                "            <option>date_of_birth</option>\n" +
                                                "            <option>sports_club</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/insertAthletes", urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Athletes");

                                let t = request.body.val1;

                                if(err) return console.log(err);

                                collection.insertOne(JSON.parse(t));

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertAthletes" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "first_name: " + results[i].first_name + ", " + "last_name: " + results[i].last_name + ", " + "patronymic: " + results[i].patronymic + ", " + "date_of_birth: " + results[i].date_of_birth + ", " + "types_of_sports: " + results[i].types_of_sports + ", " + "sports_club: " + results[i].sports_club
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>first_name</option>\n" +
                                                "            <option>last_name</option>\n" +
                                                "            <option>patronymic</option>\n" +
                                                "            <option>date_of_birth</option>\n" +
                                                "            <option>sports_club</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                    }
                    response.send(a);
                    client.close();
                });
        }
        else if (b === "Competitions"){
            const collection = db.collection(`${b}`);
            if(err) return console.log(err);

            collection.find()
                .toArray(function(err, results){
                    let a = "<form action=\"/insertCompetitions" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                        + "<label>\n" +
                        "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                        "    </label>"
                        + "</form>";
                    for(let i = 0; i < results.length; i++){
                        a = a + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "date_of_the_event: " + results[i].date_of_the_event + ", " + "sports_facility_id: " + results[i].sports_facility + ", " + "sport_type_id: " + results[i].sport_type + ", " + "sports_organization: " + results[i].sports_organization + ", " + "athletes: " + results[i].athletes
                            + "<div style='display: flex; width: 600px'>"
                            + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                            "        <select size=\"1\" name=\"opt\">\n" +
                            "            <option>title</option>\n" +
                            "            <option>date_of_the_event</option>\n" +
                            "            <option>sports_organization</option>\n" +
                            "        </select>\n" +
                            "    </label>"
                            + "<label>\n" +
                            "        <input name=\"val\" type=\"text\">\n" +
                            "    </label>"
                            + "</form>"
                            + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                            + "</br>"
                            + "</br>"
                            + "</div>";

                        app.post("/delete" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client) {

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Competitions");

                                if (err) return console.log(err);

                                collection.deleteOne({_id: results[i]._id});

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertCompetitions" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "date_of_the_event: " + results[i].date_of_the_event + ", " + "sports_facility_id: " + results[i].sports_facility + ", " + "sport_type_id: " + results[i].sport_type + ", " + "sports_organization: " + results[i].sports_organization + ", " + "athletes: " + results[i].athletes
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "            <option>date_of_the_event</option>\n" +
                                                "            <option>sports_organization</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/update" + results[i]._id, urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Competitions");

                                let t = request.body.val;
                                let y = request.body.opt;

                                if(err) return console.log(err);

                                collection.updateOne({_id: results[i]._id}, {$set: {[y] : t }})

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertCompetitions" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "date_of_the_event: " + results[i].date_of_the_event + ", " + "sports_facility_id: " + results[i].sports_facility + ", " + "sport_type_id: " + results[i].sport_type + ", " + "sports_organization: " + results[i].sports_organization + ", " + "athletes: " + results[i].athletes
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "            <option>date_of_the_event</option>\n" +
                                                "            <option>sports_organization</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                        app.post("/insertCompetitions", urlencodedParser, function (request, response) {
                            mongoClient.connect(function(err, client){

                                const db = client.db("SportsOrganizationsСity");
                                const collection = db.collection("Competitions");

                                let t = request.body.val1;

                                if(err) return console.log(err);

                                collection.insertOne(JSON.parse(t));

                                collection.find()
                                    .toArray(function(err, results){
                                        let c = "<form action=\"/insertCompetitions" +"\" method=\"post\"> " + "<p>" + "  <input type=\"submit\" value=\"Добавить\" />" + "</p>"
                                            + "<label>\n" +
                                            "        <textarea name=\"val1\" style='width: 600px; height: 300px'></textarea>" +
                                            "    </label>"
                                            + "</form>";
                                        for(let i = 0; i < results.length; i++){
                                            c = c + "<br>" + "№: " + results[i]._id + ", " + "title: " + results[i].title + ", " + "date_of_the_event: " + results[i].date_of_the_event + ", " + "sports_facility_id: " + results[i].sports_facility + ", " + "sport_type_id: " + results[i].sport_type + ", " + "sports_organization: " + results[i].sports_organization + ", " + "athletes: " + results[i].athletes
                                                + "<div style='display: flex; width: 600px'>"
                                                + "<form action=\"/update" + results[i]._id +"\" method=\"post\" style='margin: auto; width: 100px'> " + "<p>" + "  <input type=\"submit\" value=\"Изменить\" />" + "</p>" + "<label>\n" +
                                                "        <select size=\"1\" name=\"opt\">\n" +
                                                "            <option>title</option>\n" +
                                                "            <option>date_of_the_event</option>\n" +
                                                "            <option>sports_organization</option>\n" +
                                                "        </select>\n" +
                                                "    </label>"
                                                + "<label>\n" +
                                                "        <input name=\"val\" type=\"text\">\n" +
                                                "    </label>"
                                                + "</form>"
                                                + "<form action=\"/delete" + results[i]._id +"\" method=\"post\" style='margin: auto'> " + "<p>" + "  <input type=\"submit\" value=\"Удалить\"/>" + "</p>" + "</form>"
                                                + "</br>"
                                                + "</br>"
                                                + "</div>";
                                        }
                                        response.send(c);
                                        client.close();
                                    });
                            });
                        });
                    }
                    response.send(a);
                    client.close();
                });
        }
        console.log(b);

    });
});

app.listen(3000);