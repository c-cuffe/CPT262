'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "istwebclass.org",
    user: "ccuffe_admin",
    password: "Admin123!@#",
    database: "ccuffe_cpt262"
});

con.connect(function (err) {
    if (err) throw (err);
    console.log("Connected!");
});

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/public/insertfaculty.html"));
});


app.get("/getcourses", function (req, res) {
    var cfaculty = req.query.coursefaculty;
    var csemester = req.query.coursesemester;
    var cyear = req.query.courseyear;
    var ccampus = req.query.coursecampus;
    var cprefix = req.query.courseprefix;

    var sqlsel = ""

    var inserts = [];
    var sql = mysql.format(sqlsel, inserts);

    console.log(sql)
    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.send(JSON.stringify(data));
    });
});

app.post("/course", function (req, res, ) {
    var cfaculty = req.body.coursefaculty;
    var csemester = req.body.coursesemester;
    var ccampus = req.body.coursecampus;
    var cyear = req.body.courseyear;
    var cprefix = req.body.courseprefix;
    var cnumber = req.body.coursenumber;

    var sqlins = "INSERT INTO coursetable (dbcoursefaculty, dbcoursesemester, dbcoursecampus, dbcourseyear, dbcourseprefix, dbcoursenumber) VALUES (?, ?, ?, ?, ?, ?)";
    var inserts = [cfaculty, csemester, ccampus, cyear, cprefix, cnumber];
    var sql = mysql.format(sqlins, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("insertcourse.html");
        res.end();
    });
});

app.post("/faculty", function (req, res, ) {
    var fname = req.body.facultyname;
    var femail = req.body.facultyemail;

    var sqlins = "INSERT INTO facultytable (dbfacultyname, dbfacultyemail VALUES (?, ?)";
    var inserts = [fname, femail];
    var sql = mysql.format(sqlins, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("insertfaculty.html");
        res.end();
    });
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
