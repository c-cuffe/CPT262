var PurchaseBox = React.createClass({
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
        if (this.state.viewthepage != 1) {
          alert("No access.");
          window.location.replace("home.html");
        } else {
          
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
  handlePurchaseSubmit: function (purchase) {
    $.ajax({
      url: "/purchase",
      dataType: "/json",
      type: "POST",
      data: purchase,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, error.toString());
      }.bind(this),
    });
    alert("Record Inserted.")
  },
  render: function () {
    return (
      <div className="PurchaseBox">
        <h1>Purchases</h1>
        <Purchaseform2 onPurchaseSubmit={this.handlePurchaseSubmit} />
      </div>
    );
  },
});

var Purchaseform2 = React.createClass({
  getInitialState: function () {
    return {
      purchasedate_cc: "",
      purchasetime_cc: "",
      purchaseuser_cc: "",
      purchaseplayer_cc: "",
      userdata: [],
      playerdata: [],
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

  componentDidMount: function () {
    this.loadUser();
    this.loadPlayers();
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var purchaseplayer_cc = appplay.value;
    var purchaseuser_cc = appuser.value;
    var purchasetime_cc = this.state.purchasetime_cc;
    var purchasedate_cc = this.state.purchasedate_cc.trim();

    this.props.onPurchaseSubmit({
      purchaseplayer_cc: purchaseplayer_cc,
      purchaseuser_cc: purchaseuser_cc,
      purchasedate_cc: purchasedate_cc,
      purchasetime_cc: purchasetime_cc,
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
      <form className="PurchaseForm" onSubmit={this.handleSubmit}>
        <h2>Purchases</h2>
        <table>
          <tbody>
            <tr>
              <th>Purchase Date</th>
              <td>
                <input
                  type="date"
                  id="purchasedate_cc"
                  name="purchasedate_cc"
                  value={this.state.purchasedate_cc}
                  onChange={this.setValue.bind(this, "purchasedate_cc")}
                ></input>
              </td>
            </tr>
            <tr>
              <th>Purchase Time</th>
              <td>
                <input type="time" id="purchasetime_cc"
                value={this.state.purchasetime_cc}
                onChange={this.setValue.bind(this,"purchasetime_cc")}>Select the Time:</input>
              </td>
            </tr>
            <tr>
              <th>Purchase User</th>
              <td>
                <SelectUserList data={this.state.userdata} />
              </td>
            </tr>
            <tr>
              <th>Purchase Player</th>
              <td>
                <SelectPlayerList data={this.state.playerdata} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Insert Purchase" />
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
      <select name="appuser" id="appuser">
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
      <select name="appplay" id="appplay">
        <option value="0"></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<PurchaseBox />, document.getElementById("content"));
