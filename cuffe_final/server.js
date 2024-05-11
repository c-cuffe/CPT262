"use strict";
var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");

const jwtKey = "my-secret-key";
const jwtExpirySeconds = 3000;

const con = mysql.createConnection({
  host: "istwebclass.org",
  user: "ccuffe_admin",
  password: "Admin123!@#",
  database: "ccuffe_capstone",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.set("port", process.env.PORT || 3000);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/insertreservations.html"));
});

app.post("/login/", function (req, res) {
  var semail_cc = req.body.useremail_cc;
  var spw_cc = req.body.userpw_cc;
  var sqlsel = "select * from usertable where dbuseremail = ?";

  var inserts = [semail_cc];

  var sql = mysql.format(sqlsel, inserts);

  console.log("SQL: " + sql);
  console.log(spw_cc);
  con.query(sql, function (err, data) {
    if (data.length > 0) {
      console.log("Username correct!");
      var userkey = data[0].dbuserkey
      console.log(data[0].dbuserpassword);
      bcrypt.compare(
        spw_cc,
        data[0].dbuserpassword,
        function (err, passwordCorrect) {
          if (err) {
            throw err;
          } else if (!passwordCorrect) {
            console.log("Password incorrect");
          } else {
            console.log("Password Correct");
            const token = jwt.sign({ userkey }, jwtKey, {
              algorithm: "HS256",
              expiresIn: jwtExpirySeconds,
            });
            res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
            console.log("Logged in:" + userkey) 
            res.send({ redirect: "/backend/home.html" });
          }
        }
      );
    } else {
      console.log("Incorrect username or password");
    }
  });
});

app.get('/usergetloggedin/', function (req, res) {

  var viewpage = 0;
  var datahold = [];
  const validtoken = req.cookies.token
  console.log('token new:', validtoken);
  var payload;
  
  if(!validtoken) {
      viewpage = 0;
      console.log("NVT");
  } else {
      try {
          payload = jwt.verify(validtoken, jwtKey);
          console.log('payload new:', payload.userkey);
          viewpage = payload.userkey;

          var sqlsel = 'select * from usertable where dbuserkey = ?';
          var inserts = [viewpage];

          var sql = mysql.format(sqlsel, inserts);
          console.log(sql)
          con.query(sql, function (err, data) {
              if (err) {
                  console.error(err);
                  process.exit(1);
              }
              console.log("Show 1" + JSON.stringify(data));
              datahold = data;
              res.send(JSON.stringify(data));
          });
        } catch (e) {
          if (e instanceof jwt.JsonWebTokenError) {
              viewpage = 0;
              console.log("NVT2");
          }
          viewpage = 0;
          console.log("NVT3");
        }
  }
  
});

app.post("/playerlogin/", function (req, res) {
  var pemail_cc = req.body.playeremail_cc;
  var ppw_cc = req.body.playerpw_cc;
  var sqlsel = "select * from playerstable where dbplayeremail = ?";

  var inserts = [pemail_cc];

  var sql = mysql.format(sqlsel, inserts);

  console.log("SQL: " + sql);
  console.log(ppw_cc);
  con.query(sql, function (err, data) {
    if (data.length > 0) {
      console.log("Username correct!");
      var playerkey = data[0].dbplayerkey;
      console.log(data[0].dbplayerkey);
      console.log(data[0].dbplayerpassword);
      bcrypt.compare(
        ppw_cc,
        data[0].dbplayerpassword,
        function (err, passwordCorrect) {
          if (err) {
            throw err;
          } else if (!passwordCorrect) {
            console.log("Password incorrect");
          } else {
            console.log("Password Correct");
            const token = jwt.sign({ playerkey }, jwtKey, {
              algorithm: "HS256",
              expiresIn: jwtExpirySeconds,
            });
            res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
            res.send({ redirect: "/insertreservation.html" });
          }
        }
      );
    } else {
      console.log("Incorrect username or password");
    }
  });
});

app.get("/getusercategories", function (req, res) {
  var sqlsel = "select * from usercategorytable";
  var sql = mysql.format(sqlsel);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});

app.get("/searchuser", function (req, res) {
  var id = req.query.userid_cc;
  var lname = req.query.userlname_cc;
  var fname = req.query.userfname_cc;
  var email = req.query.useremail_cc;
  var phone = req.query.userphone_cc;
  var address1 = req.query.useraddress1_cc;
  var address2 = req.query.useraddress2_cc;
  var city = req.query.usercity_cc;
  var state = req.query.userstate_cc;
  var zip = req.query.userzip_cc;
  var category = req.query.usercategory_cc;

  var sqlsel =
    "select * from usertable inner join usercategorytable on dbusercategory = dbusercategoryid " +
    "WHERE dbuserid LIKE ? " +
    "and dbuserlname LIKE ? " +
    "and dbuserfname LIKE ? " +
    "and dbuseremail LIKE ? " +
    "and dbuserphone LIKE ? " +
    "and dbuseraddress1 LIKE ? " +
    "and dbuseraddress2 LIKE ? " +
    "and dbusercity LIKE ? " +
    "and dbuserstate LIKE ? " +
    "and dbuserzip LIKE ? " +
    "and dbusercategory LIKE ? ";
  var inserts = [
    "%" + id + "%",
    "%" + lname + "%",
    "%" + fname + "%",
    "%" + email + "%",
    "%" + phone + "%",
    "%" + address1 + "%",
    "%" + address2 + "%",
    "%" + city + "%",
    "%" + state + "%",
    "%" + zip + "%",
    "%" + category + "%",
  ];

  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/searchuserup", function (req, res) {
  var id = req.query.userid_cc;
  var lname = req.query.userlname_cc;
  var fname = req.query.userfname_cc;
  var email = req.query.useremail_cc;
  var phone = req.query.userphone_cc;
  var category = req.query.usercategory_cc;

  var sqlsel =
    "select * from usertable inner join usercategorytable on dbusercategory = dbusercategoryid " +
    "WHERE dbuserid LIKE ? " +
    "and dbuserlname LIKE ? " +
    "and dbuserfname LIKE ? " +
    "and dbuseremail LIKE ? " +
    "and dbuserphone LIKE ? " +
    "and dbusercategory LIKE ? ";
  var inserts = [
    "%" + id + "%",
    "%" + lname + "%",
    "%" + fname + "%",
    "%" + email + "%",
    "%" + phone + "%",
    "%" + category + "%",
  ];

  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});

app.get("/getplayer", function (req, res) {
  var id = req.query.playerid_cc;
  var lname = req.query.playerlname_cc;
  var fname = req.query.playerfname_cc;
  var email = req.query.playeremail_cc;
  var phone = req.query.playerphone_cc;
  var address1 = req.query.playeraddress1_cc;
  var address2 = req.query.playeraddress2_cc;
  var city = req.query.playercity_cc;
  var state = req.query.playerstate_cc;
  var zip = req.query.playerzip_cc;
  var rewards = req.query.playerrewards_cc;

  var sqlsel =
    "select * from playerstable inner join rewardstable on dbplayerrewards = dbrewardskey " +
    "WHERE dbplayerid LIKE ? " +
    "and dbplayerlname LIKE ? " +
    "and dbplayerfname LIKE ? " +
    "and dbplayeremail LIKE ? " +
    "and dbplayerphone LIKE ? " +
    "and dbplayeraddress1 LIKE ? " +
    "and dbplayeraddress2 LIKE ? " +
    "and dbplayercity LIKE ? " +
    "and dbplayerstate LIKE ? " +
    "and dbplayerzip LIKE ? " +
    "and dbplayerrewards LIKE ? ";
  var inserts = [
    "%" + id + "%",
    "%" + lname + "%",
    "%" + fname + "%",
    "%" + email + "%",
    "%" + phone + "%",
    "%" + address1 + "%",
    "%" + address2 + "%",
    "%" + city + "%",
    "%" + state + "%",
    "%" + zip + "%",
    "%" + rewards + "%",
  ];

  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/searchplayerup", function (req, res) {
  var id = req.query.playerid_cc;
  var lname = req.query.playerlname_cc;
  var fname = req.query.playerfname_cc;
  var email = req.query.playeremail_cc;
  var phone = req.query.playerphone_cc;
  var rewards = req.query.playerrewards_cc;

  var sqlsel =
    "select * from playerstable inner join rewardstable on dbplayerrewards = dbrewardskey " +
    "WHERE dbplayerid LIKE ? " +
    "and dbplayerlname LIKE ? " +
    "and dbplayerfname LIKE ? " +
    "and dbplayeremail LIKE ? " +
    "and dbplayerphone LIKE ? " +
    "and dbplayerrewards LIKE ? ";
  var inserts = [
    "%" + id + "%",
    "%" + lname + "%",
    "%" + fname + "%",
    "%" + email + "%",
    "%" + phone + "%",
    "%" + rewards + "%",
  ];

  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});

app.get("/gettimes", function (req, res) {
  var sqlsel = "select * from reservationstimestable";
  var sql = mysql.format(sqlsel);
  console.log(sql);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});

app.post("/user", function (req, res) {
  var uid = req.body.userid_cc;
  var ulname = req.body.userlname_cc;
  var ufname = req.body.userfname_cc;
  var uemail = req.body.useremail_cc;
  var uphone = req.body.userphone_cc;
  var uaddress1 = req.body.useraddress1_cc;
  var uaddress2 = req.body.useraddress2_cc;
  var ustate = req.body.userstate_cc;
  var ucity = req.body.usercity_cc;
  var uzip = req.body.userzip_cc;
  var ustate = req.body.userstate_cc;
  var upw = req.body.userpassword_cc;
  var ucategory = req.body.usercategory_cc;
  console.log("pw" + upw);

  var saltRounds = 10;
  var theHashedPW = "";

  bcrypt.hash(upw, saltRounds, function (err, hashedPassword) {
    if (err) {
      console.log("BAD");
      return;
    } else {
      theHashedPW = hashedPassword;
      console.log("Password 1: " + theHashedPW);
      var sqlins =
        "INSERT INTO usertable (dbuserid, dbuserlname, dbuserfname, dbuseremail," +
        " dbuserphone, dbuseraddress1, dbuseraddress2, dbuserstate, dbusercity, dbuserzip," +
        " dbuserpassword, dbusercategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var inserts = [
        uid,
        ulname,
        ufname,
        uemail,
        uphone,
        uaddress1,
        uaddress2,
        ustate,
        ucity,
        uzip,
        theHashedPW,
        ucategory,
      ];
      var sql = mysql.format(sqlins, inserts);

      con.execute(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("/backend/insertuser.html");
        res.end("Staff Successfully Inserted.");
      });
    }
  });
});

app.post("/player", function (req, res) {
  var pid = req.body.playerid_cc;
  var plname = req.body.playerlname_cc;
  var pfname = req.body.playerfname_cc;
  var pemail = req.body.playeremail_cc;
  var pphone = req.body.playerphone_cc;
  var paddress1 = req.body.playeraddress1_cc;
  var paddress2 = req.body.playeraddress2_cc;
  var pstate = req.body.playerstate_cc;
  var pcity = req.body.playercity_cc;
  var pzip = req.body.playerzip_cc;
  var pstate = req.body.playerstate_cc;
  var ppw = req.body.playerpassword_cc;
  var prewards = req.body.playerrewards_cc;

  console.log("pw" + ppw);

  var saltRounds = 10;
  var theHashedPW = "";

  bcrypt.hash(ppw, saltRounds, function (err, hashedPassword) {
    if (err) {
      console.log("BAD");
      return;
    } else {
      theHashedPW = hashedPassword;
      console.log("Password 1: " + theHashedPW);
      var sqlins =
        "INSERT INTO playerstable (dbplayerid, dbplayerlname, dbplayerfname, dbplayeremail," +
        " dbplayerphone, dbplayeraddress1, dbplayeraddress2, dbplayerstate, dbplayercity, dbplayerzip," +
        " dbplayerrewards, dbplayerpassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var inserts = [
        pid,
        plname,
        pfname,
        pemail,
        pphone,
        paddress1,
        paddress2,
        pstate,
        pcity,
        pzip,
        prewards,
        theHashedPW,
      ];
      var sql = mysql.format(sqlins, inserts);

      con.execute(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.end("Player Successfully Inserted.");
      });
    }
  });
});

app.post("/purchase", function (req, res) {
  var pplayer = req.body.purchaseplayer_cc;
  var puser = req.body.purchaseuser_cc;
  var pdate = req.body.purchasedate_cc;
  var ptime = req.body.purchasetime_cc;
  var sqlins =
    "INSERT INTO purchasestable (dbpurchaseplayer, dbpurchaseuser, dbpurchasedate, dbpurchasetime, dbpurchasestatus) VALUES (?, ?, ?, ?, '1')";
  var inserts = [pplayer, puser, pdate, ptime];
  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.end();
  });
});

app.post("/product", function (req, res) {
  var name = req.body.productname_cc;
  var brand = req.body.productbrand_cc;
  var model = req.body.productmodel_cc;
  var description = req.body.productdescription_cc;
  var color = req.body.productcolor_cc;
  var category = req.body.productcategory_cc;
  var price = req.body.productprice_cc;
  var stock = req.body.productstock_cc;
  var sqlins =
    "INSERT INTO productstable (dbproductname, dbproductbrand, dbproductmodel, dbproductdescription, dbproductcolor, dbproductcategory, dbproductprice, dbproductstock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  var inserts = [
    name,
    brand,
    model,
    description,
    color,
    category,
    price,
    stock,
  ];
  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect("/backend/insertproduct.html");
    res.end();
  });
});

app.post("/reservation", function (req, res) {
  var date = req.body.reservationdate_cc;
  var time = req.body.reservationtime_cc;
  var user = req.body.reservationuser_cc;
  var player = req.body.reservationplayer_cc;
  var group = req.body.reservationgroup_cc;
  var sqlins =
    "INSERT INTO reservationstable (dbreservationplayer, dbreservationuser, dbreservationdate, dbreservationtime, dbreservationgroup) VALUES (?, ?, ?, ?, ?)";
  var inserts = [player, user, date, time, group];
  var sql = mysql.format(sqlins, inserts);

  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.end();
  });
});
app.get("/getplayers", function (req, res) {
  var sqlsel = "select * from playerstable";
  var sql = mysql.format(sqlsel);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/getuser", function (req, res) {
  var sqlsel = "select * from usertable";
  var sql = mysql.format(sqlsel);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});

app.get("/searchreservations", function (req, res) {
  var date = req.query.reservationdate_cc;
  var time = req.query.reservationtime_cc;
  var user = req.query.reservationuser_cc;
  var player = req.query.reservationplayer_cc;
  var group = req.query.reservationgroup_cc;
  var sqlsel =
    "select * from reservationstable inner join usertable on dbreservationuser = dbuserkey " +
    "inner join playerstable on dbreservationplayer = dbplayerkey " +
    "inner join reservationstimestable on dbreservationtime = dbreservationstimeskey " +
    "WHERE dbreservationdate LIKE ? and dbreservationtime LIKE ? " +
    "and dbreservationuser LIKE ? and dbreservationplayer LIKE ? " +
    "and dbreservationgroup LIKE ? ";
  var inserts = [
    "%" + date + "%",
    "%" + time + "%",
    "%" + user + "%",
    "%" + player + "%",
    "%" + group + "%",
  ];
  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);
  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/searchpurchases", function (req, res) {
  var date = req.query.purchasedate_cc;
  var time = req.query.purchasetime_cc;
  var user = req.query.purchaseuser_cc;
  var player = req.query.purchaseplayer_cc;
  var status = req.query.purchasestatus_cc;
  var sqlsel =
    "select * from purchasestable inner join statusestable on dbpurchasestatus = dbstatuskey " +
    "inner join playerstable on dbpurchaseplayer = dbplayerkey " +
    "inner join usertable on dbpurchaseuser = dbuserkey " +
    "WHERE dbpurchasedate LIKE ? and dbpurchasetime LIKE ? " +
    "and dbpurchaseuser LIKE ? and dbpurchaseplayer LIKE ? " +
    "and dbpurchasestatus LIKE ? ";
  var inserts = [
    "%" + date + "%",
    "%" + time + "%",
    "%" + user + "%",
    "%" + player + "%",
    "%" + status + "%",
  ];
  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);
  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/getstatuses", function (req, res) {
  var sqlsel = "select * from statusestable";
  var sql = mysql.format(sqlsel);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/getplayerrewards", function (req, res) {
  var sqlsel = "select * from rewardstable";
  var sql = mysql.format(sqlsel);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/getbrands", function (req, res) {
  var sqlsel = "select * from brandstable";
  var sql = mysql.format(sqlsel);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/getproduct", function (req, res) {
  var name = req.query.productname_cc;
  var brand = req.query.productbrand_cc;
  var model = req.query.productmodel_cc;
  var description = req.query.productdescription_cc;
  var color = req.query.productcolor_cc;
  var category = req.query.productcategory_cc;
  var price = req.query.productprice_cc;

  var sqlsel =
    "select * from productstable inner join brandstable on dbproductbrand = dbbrandkey inner join productcategorytable on dbproductcategory = dbproductcategorykey " +
    "WHERE dbproductname LIKE ? " +
    "and dbproductbrand LIKE ? " +
    "and dbproductmodel LIKE ? " +
    "and dbproductdescription LIKE ? " +
    "and dbproductcolor LIKE ? " +
    "and dbproductcategory LIKE ? " +
    "and dbproductprice LIKE ? ";
  var inserts = [
    "%" + name + "%",
    "%" + brand + "%",
    "%" + model + "%",
    "%" + description + "%",
    "%" + color + "%",
    "%" + category + "%",
    "%" + price + "%",
  ];

  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);
  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/getproductcategories", function (req, res) {
  var sqlsel = "select * from productcategorytable";
  var sql = mysql.format(sqlsel);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.send(JSON.stringify(data));
  });
});
app.get("/getsingleprod/", function (req, res) {
  var prodkey = req.query.upprodkey_cc;
  var sqlsel = "select * from productstable where dbproductkey = ?";
  var inserts = [prodkey];

  var sql = mysql.format(sqlsel, inserts);
  console.log(sql);
  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});
app.post("/updatesingleproduct", function (req, res) {
  var prodname = req.body.upproductname_cc;
  var prodbrand = req.body.upproductbrand_cc;
  var prodmodel = req.body.upproductmodel_cc;
  var proddescription = req.body.upproductdescription_cc;
  var prodstock = req.body.upproductstock_cc;
  var prodprice = req.body.upproductprice_cc;
  var prodcolor = req.body.upproductcolor_cc;
  var prodcategory = req.body.upproductcategory_cc;
  var prodkey = req.body.upproductkey_cc;

  var sqlins =
    "UPDATE productstable SET dbproductname = ?, dbproductbrand = ?, dbproductmodel = ?, dbproductdescription = ?, " +
    "dbproductcolor = ?, dbproductcategory = ?, dbproductprice = ?, dbproductstock = ? where dbproductkey = ?";
  var inserts = [
    prodname,
    prodbrand,
    prodmodel,
    proddescription,
    prodcolor,
    prodcategory,
    prodprice,
    prodstock,
    prodkey,
  ];

  var sql = mysql.format(sqlins, inserts);
  console.log(sql);
  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");

    res.end();
  });
});
app.get("/getsingleuser/", function (req, res) {
  var ukey = req.query.upukey_cc;
  var sqlsel = "select * from usertable where dbuserkey = ?";
  var inserts = [ukey];

  var sql = mysql.format(sqlsel, inserts);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});
app.post("/updatesingleuser", function (req, res) {
  var uid = req.body.upuserid_cc;
  var ufname = req.body.upuserfname_cc;
  var ulname = req.body.upuserlname_cc;
  var uemail = req.body.upuseremail_cc;
  var uphone = req.body.upuserphone_cc;
  var ucategory = req.body.upusercategory_cc;
  var ukey = req.body.upuserkey_cc;

  var sqlins =
    "UPDATE usertable SET dbuserid = ?, dbuserlname = ?, dbuserfname = ?, dbuseremail = ?, dbuserphone = ?, dbusercategory = ? where dbuserkey = ?";
  var inserts = [uid, ulname, ufname, uemail, uphone, ucategory, ukey];

  var sql = mysql.format(sqlins, inserts);
  console.log(sql);
  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");

    res.end();
  });
});
app.get("/getsingleplayer/", function (req, res) {
  var pkey = req.query.uppkey_cc;
  var sqlsel = "select * from playerstable where dbplayerkey = ?";
  var inserts = [pkey];

  var sql = mysql.format(sqlsel, inserts);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});
app.post("/updatesingleplayer", function (req, res) {
  var pid = req.body.upplayerid_cc;
  var pfname = req.body.upplayerfname_cc;
  var plname = req.body.upplayerlname_cc;
  var pemail = req.body.upplayeremail_cc;
  var pphone = req.body.upplayerphone_cc;
  var prewards = req.body.upplayerrewards_cc;
  var pkey = req.body.upplayerkey_cc;

  var sqlins =
    "UPDATE playerstable SET dbplayerid = ?, dbplayerlname = ?, dbplayerfname = ?, dbplayeremail = ?, dbplayerphone = ?, dbplayerrewards = ? where dbplayerkey = ?";
  var inserts = [pid, plname, pfname, pemail, pphone, prewards, pkey];

  var sql = mysql.format(sqlins, inserts);
  console.log(sql);
  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");

    res.end();
  });
});
app.get("/getsinglepurchase/", function (req, res) {
  var purchkey = req.query.uppurchkey_cc;
  var sqlsel = "select * from purchasestable where dbpurchasekey = ?";
  var inserts = [purchkey];

  var sql = mysql.format(sqlsel, inserts);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});
app.post("/updatesinglepurchase", function (req, res) {
  var purchkey = req.body.uppurchasekey_cc;
  var purchdate = req.body.uppurchasedate_cc;
  var purchtime = req.body.uppurchasetime_cc;
  var purchuser = req.body.uppurchaseplayer_cc;
  var purchplayer = req.body.uppurchaseuser_cc;
  var purchstatus = req.body.uppurchasestatus_cc;

  var sqlins =
    "UPDATE purchasestable SET dbpurchasedate = ?, dbpurchasetime = ?, dbpurchaseplayer = ?, dbpurchaseuser = ?, dbpurchasestatus = ? where dbpurchasekey = ?";
  var inserts = [
    purchdate,
    purchtime,
    purchuser,
    purchplayer,
    purchstatus,
    purchkey,
  ];

  var sql = mysql.format(sqlins, inserts);
  console.log(sql);
  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");

    res.end();
  });
});
app.get("/getsinglereservation/", function (req, res) {
  var reskey = req.query.upreskey_cc;
  var sqlsel = "select * from reservationstable where dbreservationkey = ?";
  var inserts = [reskey];

  var sql = mysql.format(sqlsel, inserts);

  con.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.send(JSON.stringify(data));
  });
});
app.post("/updatesinglereservation", function (req, res) {
  var reskey = req.body.upreservationkey_cc;
  var resdate = req.body.upreservationdate_cc;
  var restime = req.body.upreservationtime_cc;
  var resuser = req.body.upreservationuser_cc;
  var resplayer = req.body.upreservationplayer_cc;
  var resgroup = req.body.upreservationgroup_cc;

  var sqlins =
    "UPDATE reservationstable SET dbreservationdate = ?, dbreservationtime = ?, dbreservationplayer = ?, dbreservationuser = ?, dbreservationgroup = ? where dbreservationkey = ?";
  var inserts = [
    resdate,
    restime,
    resplayer,
    resuser,
    resgroup,
    reskey,
  ];

  var sql = mysql.format(sqlins, inserts);
  console.log(sql);
  con.execute(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");

    res.end();
  });
});
app.listen(app.get("port"), function () {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});
