var AppointmentBox = React.createClass({
  handleAppointmentSubmit: function (reservation) {
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
    alert("Appointment successfully created.");
  },
  render: function () {
    return (
      <div className="AppointmentBox">
        <h1>Appointments</h1>
        <Appointmentform2 onAppointmentSubmit={this.handleAppointmentSubmit} />
      </div>
    );
  },
});

var Appointmentform2 = React.createClass({
  getInitialState: function () {
    return {
      reservationtime_cc: "",
      reservationdate_cc: "",
      reservationuser_cc: "",
      reservationgroup_cc: "",
      reservationplayer_cc: "",
      userdata: [],
      timedata: [],
      playerdata: []
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  loadUsers: function () {
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
    this.loadUsers();
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var reservationuser_cc = resuser.value;
    var reservationtime_cc = restime.value;
    var reservationgroup_cc = resgroup.value;
    var reservationdate_cc = this.state.reservationdate_cc.trim();

    this.props.onAppointmentSubmit({
      reservationuser_cc: reservationuser_cc,
      reservationdate_cc: reservationdate_cc,
      reservationtime_cc: reservationtime_cc,
      reservationgroup_cc: reservationgroup_cc,
      reservationplayer_cc: reservationplayer_cc
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
      <form className="AppointmentForm" onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <td>
                <input
                  type="date"
                  id="reservationdate_cc"
                  name="reservationdate_cc"
                  value={this.state.reservationdate_cc}
                  onChange={this.setValue.bind(this, "reservationdate_cc")}
                ></input>
              </td>
            </tr>
            <tr>
              <th>Time</th>
              <td>
                <SelectTimeList data={this.state.timedata} />
              </td>
            </tr>
            <tr>
              <th>Staff Member</th>
              <td>
                <SelectUserList data={this.state.userdata} />
              </td>
            </tr>
            <tr>
              <th>Group</th>
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
        <input type="submit" value="Insert Appointment" />
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
      <select name="resuser" id="resuser">
        <option selected disabled></option>
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

ReactDOM.render(<AppointmentBox />, document.getElementById("content"));
