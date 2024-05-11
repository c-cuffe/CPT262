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
    res.sendFile(path.join(__dirname + "/public/insertemployee.html"));
});

app.get("/getemptypes", function (req, res) {
    var sqlsel = "select * from employeetypes";
    var sql = mysql.format(sqlsel);
    
    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.send(JSON.stringify(data));
    });
});

app.get("/getemp", function (req, res) {
    var eid = req.query.employeeid;
    var ename = req.query.employeename;
    var eemail = req.query.employeeemail;
    var ephone = req.query.employeephone;
    var esalary = req.query.employeesalary;
    var emailer = req.query.employeemailer;
    var etype = req.query.employeetype;

    if (emailer == 1 || emailer == 0) {
        var maileraddon = " and dbemployeemailer = ?";
        var maileraddonvar = emailer;
    } else {
        var maileraddon = " and dbemployeemailer Like ?";
        var maileraddonvar = "%%";
    }

    if (etype > 0) {
        var typeaddon = " and dbemployeetype = ?";
        var typeaddonvar = etype;
    } else {
        var typeaddon = " and dbemployeetype Like ?";
        var typeaddonvar = "%%";
    }

    var sqlsel = "SELECT employeetable.*, employeetypes.dbemptypename "
    + " FROM employeetable inner join employeetypes "
    + " on employeetypes.dbemptypeid = employeetable.dbemployeetype "
    + " WHERE dbemployeeid Like ? and dbemployeename Like ? "
    + " and dbemployeeemail Like ? and dbemployeephone Like ? and "
    + " dbemployeesalary Like ?"
    + maileraddon + typeaddon ;

    var inserts = ["%" + eid + "%", "%" + ename + "%", "%" + eemail + "%", "%" 
    + ephone + "%", "%" + esalary + "%", maileraddonvar, typeaddonvar];
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

app.get("/getcustrewards", function (req, res) {
    var sqlsel = "select * from customerrewards";
    var sql = mysql.format(sqlsel);
    
    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.send(JSON.stringify(data));
    });
});

app.get("/getcust", function (req, res) {
    var cname = req.query.customername;
    var caddress = req.query.customeraddress;
    var czip = req.query.customerzip;
    var ccredit = req.query.customercredit;
    var cemail = req.query.customeremail;
    var cmember = req.query.customermember;
    var crewards = req.query.customerrewards;

    if (cmember == 1 || cmember == 0) {
        var memberaddon = " and dbcustomermember = ?";
        var memberaddonvar = cmember;
    } else {
        var memberaddon = " and dbcustomermember Like ?";
        var memberaddonvar = "%%";
    }

    if (crewards > 0) {
        var rewardsaddon = " and dbcustomerrewards = ?";
        var rewardsaddonvar = crewards;
    } else {
        var rewardsaddon = " and dbcustomerrewards Like ?";
        var rewardsaddonvar = "%%";
    }

    var sqlsel = "SELECT customertable.*, customerrewards.dbcustrewardsname "
    + " FROM customertable inner join customerrewards "
    + " on customerrewards.dbcustrewardsid = customertable.dbcustomerrewards "
    + " WHERE dbcustomername Like ? "
    + " and dbcustomeraddress Like ? and dbcustomerzip Like ? and "
    + " dbcustomercredit Like ? and dbcustomeremail Like ?"
    + memberaddon + rewardsaddon ;

    var inserts = ["%" + cname + "%", "%" + caddress + "%", "%" + czip + "%", "%" 
    + ccredit + "%", "%" + cemail + "%", memberaddonvar, rewardsaddonvar];
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

app.post("/customer", function (req, res, ) {
    var cname = req.body.customername;
    var caddress = req.body.customeraddress;
    var czip = req.body.customerzip;
    var ccredit = req.body.customercredit;
    var cemail = req.body.customeremail;
    var cmember = req.body.customermember;
    var crewards = req.body.customerewards;
    console.log(cname);

    var sqlins = "INSERT INTO customertable (dbcustomername, dbcustomeraddress, dbcustomerzip, dbcustomercredit, dbcustomeremail, dbcustomermember, dbcustomerrewards) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var inserts = [cname, caddress, czip, ccredit, cemail, cmember, crewards];
    var sql = mysql.format(sqlins, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("insertcustomer.html");
        res.end();
    });
});

app.post("/employee", function (req, res, ) {
    var eid = req.body.employeeid;
    var ename = req.body.employeename;
    var eemail = req.body.employeeemail;
    var ephone = req.body.employeephone;
    var esalary = req.body.employeesalary;
    var emailer = req.body.employeemailer;
    var etype = req.body.employeetype;
    console.log(ename);

    var sqlins = "INSERT INTO employeetable (dbemployeeid, dbemployeename, dbemployeeemail, dbemployeephone, dbemployeesalary, dbemployeemailer, dbemployeetype) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var inserts = [eid, ename, eemail, ephone, esalary, emailer, etype];
    var sql = mysql.format(sqlins, inserts);

    con.execute(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("insertemployee.html");
        res.end();
    });
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
