var ReservationBox = React.createClass({
  getInitialState: function () {
    return { data: [], viewthepage: 0 };
  },
  loadAllowLogin: function() {
    $.ajax({
      url: "/usergetloggedin",
      dataType: 'json',
            cache: false,
            success: function (datalog) {
                this.setState({ data: datalog });
                this.setState({ viewthepage: this.state.data[0].dbusercategory });
                console.log("Logged in:" + this.state.viewthepage);
                if (this.state.viewthepage == 1 || this.state.viewthepage == 2) {
                  alert("Success.")
                }
                else {
                  alert("No access.")
                  window.location.replace("home.html")
                  
                }
              }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
    })
  },
  loadReservationsFromServer: function () {
    $.ajax({
      url: "/searchreservations",
      data: {
        reservationuser_cc: usersel.value,
        reservationplayer_cc: playersel.value,
        reservationdate_cc: reservationdate_cc.value,
        reservationtime_cc: timesel.value,
        reservationgroup_cc: groupsel.value,
      },

      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  updateSingleResFromServer: function (reservation) {
    $.ajax({
      url: "/updatesinglereservation",
      dataType: "json",
      data: reservation,
      type: "POST",
      cache: false,
      success: function (upsingledata) {
        console.log("1 record updated.")
        this.setState({ upsingledata: upsingledata });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
    window.location.reload(true);
  },
  componentDidMount: function () {
    this.loadAllowLogin();
    this.loadReservationsFromServer();
  },

  render: function () {
    return (
      <div>
        <h1>Reservations</h1>
        <Reservationform2
          onReservationSubmit={this.loadReservationsFromServer}
        />
        <div id="theresults">
          <div id="theleft">
            <br />
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>User</th>
                  <th>Player</th>
                  <th>Group</th>
                </tr>
              </thead>
              <ReservationList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <ReservationUpdateform
              onUpdateSubmit={this.updateSingleResFromServer}
            />
          </div>
        </div>
      </div>
    );
  },
});

var Reservationform2 = React.createClass({
  getInitialState: function () {
    return {
      reservationuser_cc: "",
      reservationplayer_cc: "",
      reservationdate_cc: "",
      reservationtime_cc: "",
      reservationgroup_cc: "",
      userdata: [],
      playerdata: [],
      timedata: [],
      reservationdata: [],
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  loadUser: function () {
    $.ajax({
      url: "/getuser",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ userdata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  loadPlayers: function () {
    $.ajax({
      url: "/getplayers",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ playerdata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  loadTimes: function () {
    $.ajax({
      url: "/gettimes",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ timedata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  componentDidMount: function () {
    this.loadPlayers();
    this.loadUser();
    this.loadTimes();
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var reservationuser_cc = usersel.value;
    var reservationplayer_cc = playersel.value;
    var reservationdate_cc = this.state.reservationdate_cc;
    var reservationtime_cc = timesel.value;
    var reservationgroup_cc = groupsel.value;

    this.props.onReservationSubmit({
      reservationuser_cc: reservationuser_cc,
      reservationplayer_cc: reservationplayer_cc,
      reservationdate_cc: reservationdate_cc,
      reservationtime_cc: reservationtime_cc,
      reservationgroup_cc: reservationgroup_cc,
    });
  },
  handleChange: function (event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Reservations</h2>
        <table>
          <tbody>
            <tr>
              <th>Reservation Date</th>
              <td>
                <input type="date" id="reservationdate_cc" name="reservationdate_cc"
                value={this.state.reservationdate_cc}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <th>Reservation Time</th>
              <td>
                <SelectTimeList data={this.state.timedata} />
              </td>
            </tr>
            <tr>
              <th>Reservation User</th>
              <td>
                <SelectUserList data={this.state.userdata} />
              </td>
            </tr>
            <tr>
              <th>Reservation Player</th>
              <td>
                <SelectPlayerList data={this.state.playerdata} />
              </td>
            </tr>
            <tr>
              <th>Reservation Group</th>
              <td>
                <select id="groupsel">
                  <option value = ""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Search Reservation" />
      </form>
    );
  },
});

var ReservationUpdateform = React.createClass({
  getInitialState: function () {
    return {
      upreservationkey_cc: "",
      upreservationuser_cc: "",
      upreservationplayer_cc: "",
      upreservationdate_cc: "",
      upreservationtime_cc: "",
      upreservationgroup_cc: "",
      upuserdata: [],
      upplayerdata: [],
      uptimedata: [],
      upreservationdata: [],
    };
  },
  handleUpOptionChange: function (e) {
    this.setState({
      upselectedOption: e.target.value,
    });
  },
  loadUser: function () {
    $.ajax({
      url: "/getuser",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ upuserdata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  loadPlayers: function () {
    $.ajax({
      url: "/getplayers",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ upplayerdata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  loadTimes: function () {
    $.ajax({
      url: "/gettimes",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ uptimedata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  componentDidMount: function () {
    this.loadPlayers();
    this.loadUser();
    this.loadTimes();
  },
  handleUpSubmit: function (e) {
    e.preventDefault();

    var upreservationkey_cc = upreskey_cc.value;
    var upreservationuser_cc = upresuser_cc.value;
    var upreservationplayer_cc = upresplay_cc.value;
    var upreservationdate_cc = upresdate_cc.value;
    var upreservationtime_cc = uprestime_cc.value;e;
    var upreservationgroup_cc = upresgroup_cc.value;

    this.props.onUpdateSubmit({
      upreservationkey_cc: upreservationkey_cc,
      upreservationuser_cc: upreservationuser_cc,
      upreservationplayer_cc: upreservationplayer_cc,
      upreservationdate_cc: upreservationdate_cc,
      upreservationtime_cc: upreservationtime_cc,
      upreservationgroup_cc: upreservationgroup_cc,
    });
  },
  handleUpChange: function (event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  },
  render: function () {
    return (
      <div>
        <div id="theform">
          <form onSubmit={this.handleUpSubmit}>
            <h2>Reservations</h2>
            <table>
              <tbody>
                <tr>
                  <th>Reservation Date</th>
                  <td>
                    <input
                      type="date"
                      id="upresdate_cc"
                      name="upresdate_cc"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Reservation Time</th>
                  <td>
                    <SelectUpdateTimeList data={this.state.uptimedata} />
                  </td>
                </tr>
                <tr>
                  <th>Reservation User</th>
                  <td>
                    <SelectUpdateUserList data={this.state.upuserdata} />
                  </td>
                </tr>
                <tr>
                  <th>Reservation Player</th>
                  <td>
                    <SelectUpdatePlayerList data={this.state.upplayerdata} />
                  </td>
                </tr>
                <tr>
                  <th>Reservation Group</th>
                  <td>
                    <select id="upresgroup_cc">
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <input
              type="hidden"
              name="upreskey_cc"
              id="upreskey_cc"
              onChange={this.handleUpChange}
            />
            <input type="submit" value="Update Reservation" />
          </form>
        </div>
      </div>
    );
  },
});

var ReservationList = React.createClass({
  render: function () {
    var reservationNodes = this.props.data.map(function (reservation) {
      //map the data to individual donations
      return (
        <Reservation
          key={reservation.dbreservationkey}
          reskey_cc={reservation.dbreservationkey}
          resuserfname_cc={reservation.dbuserfname}
          resuserlname_cc={reservation.dbuserlname}
          resplayerfname_cc={reservation.dbplayerfname}
          resplayerlname_cc={reservation.dbplayerlname}
          resdate_cc={reservation.dbreservationdate}
          restime_cc={reservation.dbreservationstimeduration}
          resgroup_cc={reservation.dbreservationgroup}
        ></Reservation>
      );
    });

    //print all the nodes in the list
    return <tbody>{reservationNodes}</tbody>;
  },
});

var Reservation = React.createClass({
  getInitialState: function () {
    return {
      upreskey_cc: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theupreskey_cc = this.props.reskey_cc;

    this.loadSingleRes(theupreskey_cc);
  },
  loadSingleRes: function (theupreskey_cc) {
    $.ajax({
      url: "/getsinglereservation",
      data: {
        upreskey_cc: theupreskey_cc,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        console.log(theupreskey_cc);
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populateRes = this.state.singledata.map(function (reservation) {
          upreskey_cc.value = theupreskey_cc;
          upresuser_cc.value = reservation.dbreservationuser;
          upresplay_cc.value = reservation.dbreservationplayer;
          upresdate_cc.value = reservation.dbreservationdate;
          uprestime_cc.value = reservation.dbreservationtime;
          upresgroup_cc.value = reservation.dbreservationgroup;
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  render: function () {
    return (
      <tr>
         <td>{this.props.reskey_cc}</td>
        <td>{this.props.resdate_cc}</td>
        <td>{this.props.restime_cc}</td>
        <td>
          {this.props.resuserfname_cc} {this.props.resuserlname_cc}
        </td>
        <td>
          {this.props.resplayerfname_cc} {this.props.resplayerlname_cc}
        </td>
        <td>{this.props.resgroup_cc}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
      </tr>
    );
  },
});

var SelectTimeList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (timesList) {
      return (
        <option
          key={timesList.dbreservationstimeskey}
          value={timesList.dbreservationstimeskey}
        >
          {timesList.dbreservationstimeduration}
        </option>
      );
    });
    return (
      <select name="timesel" id="timesel">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

var SelectUserList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (userList) {
      return (
        <option key={userList.dbuserkey} value={userList.dbuserkey}>
          {userList.dbuserfname} {userList.dbuserlname}
        </option>
      );
    });
    return (
      <select name="usersel" id="usersel">
        <option value = ""></option>
        {optionNodes}
      </select>
    );
  },
});
var SelectPlayerList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (playerList) {
      return (
        <option key={playerList.dbplayerkey} value={playerList.dbplayerkey}>
          {playerList.dbplayerfname} {playerList.dbplayerlname}
        </option>
      );
    });
    return (
      <select name="playersel" id="playersel">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

var SelectUpdateTimeList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (timesList) {
      return (
        <option
          key={timesList.dbreservationstimeskey}
          value={timesList.dbreservationstimeskey}
        >
          {timesList.dbreservationstimeduration}
        </option>
      );
    });
    return (
      <select name="uprestime_cc" id="uprestime_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

var SelectUpdateUserList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (userList) {
      return (
        <option key={userList.dbuserkey} value={userList.dbuserkey}>
          {userList.dbuserfname} {userList.dbuserlname}
        </option>
      );
    });
    return (
      <select name="upresuser_cc" id="upresuser_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});
var SelectUpdatePlayerList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (playerList) {
      return (
        <option key={playerList.dbplayerkey} value={playerList.dbplayerkey}>
          {playerList.dbplayerfname} {playerList.dbplayerlname}
        </option>
      );
    });
    return (
      <select name="upresplay_cc" id="upresplay_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<ReservationBox />, document.getElementById("content"));
