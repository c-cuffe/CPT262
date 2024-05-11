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
                if (this.state.viewthepage != 0) {
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
  componentDidMount: function () {
    this.loadAllowLogin();
    this.loadReservationsFromServer();
  },

  render: function () {
    console.log("Test")
    return (
      <div>
        <h1>Reservations</h1>
        <Reservationform2
          onReservationSubmit={this.loadReservationsFromServer}
        />
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
    var reservationdate_cc = this.state.reservationdate_cc.trim();
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
                <input
                  type="date"
                  id="reservationdate_cc"
                  name="reservationdate_cc"
                />
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
        <input type="submit" value="Search Reservation" />
      </form>
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
          reskey={reservation.dbreservationkey}
          resuserfname={reservation.dbuserfname}
          resuserlname={reservation.dbuserlname}
          resplayerfname={reservation.dbplayerfname}
          resplayerlname={reservation.dbplayerlname}
          resdate={reservation.dbreservationdate}
          restime={reservation.dbreservationtime}
          resgroup={reservation.dbreservationgroup}
        ></Reservation>
      );
    });

    //print all the nodes in the list
    return <tbody>{reservationNodes}</tbody>;
  },
});

var Reservation = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.reskey}</td>
        <td>{this.props.resdate}</td>
        <td>{this.props.restime}</td>
        <td>
          {this.props.resuserfname} {this.props.resuserlname}
        </td>
        <td>
          {this.props.resplayerfname} {this.props.resplayerlname}
        </td>
        <td>{this.props.resgroup}</td>
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
        <option selected disabled></option>
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
        <option selected disabled></option>
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

ReactDOM.render(<ReservationBox />, document.getElementById("content"));
