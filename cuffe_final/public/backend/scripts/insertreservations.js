var ReservationBox = React.createClass({
  getInitialState: function () {
    return { data: [], viewthepage: 0 };
  },
  loadAllowLogin: function () {
    $.ajax({
      url: "/usergetloggedin",
      dataType: "json",
      cache: false,
      success: function (datalog) {
        this.setState({ data: datalog });
        this.setState({ viewthepage: this.state.data[0].dbusercategory });
        console.log("Logged in:" + this.state.viewthepage);
        if (this.state.viewthepage == 1 || this.state.viewthepage == 2) {
        
        } else {
          alert("No access.");
          window.location.replace("home.html");
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function () {
    this.loadAllowLogin();
  },
  handleReservationSubmit: function (reservation) {
    $.ajax({
      url: "/reservation",
      dataType: "/json",
      type: "POST",
      data: reservation,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, error.toString());
      }.bind(this),
    });
    alert("Record inserted.");
  },
  render: function () {
    return (
      <div className="ReservationBox">
        <h1>Reservations</h1>
        <Reservationform2 onReservationSubmit={this.handleReservationSubmit} />
      </div>
    );
  },
});

var Reservationform2 = React.createClass({
  getInitialState: function () {
    return {
      reservationtime_cc: "",
      reservationdate_cc: "",
      reservationuser_cc: "",
      reservationplayer_cc: "",
      reservationgroup_cc: "",
      userdata: [],
      playerdata: [],
      timedata: [],
    };
  },

  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },

  loadStaff: function () {
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
    this.loadTimes();
    this.loadStaff();
    this.loadPlayers();
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var reservationplayer_cc = resplay.value;
    var reservationuser_cc = resuser.value;
    var reservationtime_cc = restime.value;
    var reservationgroup_cc = resgroup.value;
    var reservationdate_cc = this.state.reservationdate_cc.trim();

    this.props.onReservationSubmit({
      reservationplayer_cc: reservationplayer_cc,
      reservationuser_cc: reservationuser_cc,
      reservationdate_cc: reservationdate_cc,
      reservationtime_cc: reservationtime_cc,
      reservationgroup_cc: reservationgroup_cc,
    });
  },

  commonValidate: function () {
    return true;
  },
  setValue: function (field, event) {
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  },
  render: function () {
    return (
      <form className="ReservationForm" onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Reservation Date</th>
              <td>
                <input
                  type="date"
                  id="reservationdate_cc"
                  name="reservationdate_cc"
                  value={this.state.reservationdate_cc}
                  onChange={this.setValue.bind(this, "reservationdate_cc")}
                >
                  Select the Date:
                </input>
              </td>
            </tr>
            <tr>
              <th>Reservation Time</th>
              <td>
                <SelectTimeList data={this.state.timedata} />
              </td>
            </tr>
            <tr>
              <th>Reservation Staff</th>
              <td>
                <SelectStaffList data={this.state.userdata} />
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
                <select id="resgroup">
                  <option selected disabled></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Insert Reservation" />
      </form>
    );
  },
});

var InputError = React.createClass({
  getInitialState: function () {
    return {
      message: "Input is invalid",
    };
  },
  render: function () {
    var errorClass = classNames(this.props.className, {
      error_container: true,
      visible: this.props.visible,
      invisible: !this.props.visible,
    });

    return <td> {this.props.errorMessage} </td>;
  },
});

var SelectStaffList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (userList) {
      return (
        <option key={userList.dbuserkey} value={userList.dbuserkey}>
          {userList.dbuserfname} {userList.dbuserlname}
        </option>
      );
    });
    return (
      <select name="resuser" id="resuser">
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
      <select name="resplay" id="resplay">
        <option value="0"></option>
        {optionNodes}
      </select>
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
      <select name="restime" id="restime">
        <option selected disabled></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<ReservationBox />, document.getElementById("content"));
