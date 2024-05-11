var PurchaseBox = React.createClass({
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
                if (this.state.viewthepage == 1 || this.state.viewthepage == 3) {
                  alert("Success.")
                }
                else {
                  alert("No access.")
                  // window.location.replace("home.html")
                }
              }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
    })
  },
  loadPurchasesFromServer: function () {
    $.ajax({
      url: "/searchpurchases",
      data: {
        "purchasedate_cc": purchasedate_cc.value,
        "purchasetime_cc": purchasetime_cc.value,
        "purchaseuser_cc": purchuser_cc.value,
        "purchaseplayer_cc": purchplay_cc.value,
        "purchasestatus_cc": purchstatus_cc.value
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
    this.loadPurchasesFromServer();
    // setInterval(this.loadPurchasesFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <h1>Purchases</h1>
        <Purchaseform2 onPurchaseSubmit={this.loadPurchasesFromServer} />
        <br />
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Purchase Date</th>
              <th>Purchase Time</th>
              <th>Purchase User</th>
              <th>Purchase Player</th>
              <th>Purchase Status</th>
            </tr>
          </thead>
          <PurchaseList data={this.state.data} />
        </table>
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
      purchasestatus_cc: "",
      userdata: [],
      playerdata: [],
      statusdata: []
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
  loadStatuses: function () {
    $.ajax({
      url: "/getstatuses",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ statusdata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function () {
    this.loadUser();
    this.loadPlayers();
    this.loadStatuses();
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var purchaseplayer_cc = purchplay_cc.value;
    var purchaseuser_cc = purchuser_cc.value;
    var purchasetime_cc = this.state.purchasetime_cc;
    var purchasedate_cc = this.state.purchasedate_cc;
    var purchasestatus_cc = purchstatus_cc.value;

    this.props.onPurchaseSubmit({
      purchaseplayer_cc: purchaseplayer_cc,
      purchaseuser_cc: purchaseuser_cc,
      purchasedate_cc: purchasedate_cc,
      purchasetime_cc: purchasetime_cc,
      purchasestatus_cc: purchasestatus_cc
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
        <h2>Purchases</h2>
        <table>
          <tbody>
            <tr>
              <th>Purchase Date</th>
              <td>
                <input type="date" id="purchasedate_cc" name="purchasedate_cc">
                  Select the Date:
                </input>
              </td>
            </tr>
            <tr>
              <th>Purchase Time</th>
              <td>
                <input type="time" id="purchasetime_cc" name="purchasetime_cc">
                  Select the Time:
                </input>
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
            <tr>
              <th>Purchase Status</th>
              <td>
                <SelectStatusList data={this.state.statusdata} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Search Purchase" />
      </form>
    );
  },
});

var PurchaseList = React.createClass({
  render: function () {
    var purchaseNodes = this.props.data.map(function (purchase) {
      //map the data to individual donations
      return (
        <Purchase
          key={purchase.dbpurchasekey}
          purchkey={purchase.dbpurchasekey}
          purchplayer={purchase.dbplayerfname + " " + purchase.dbplayerlname}
          purchuser={purchase.dbuserfname +  " " + purchase.dbuserlname}
          purchdate={purchase.dbpurchasedate}
          purchtime={purchase.dbpurchasetime}
          purchstatus={purchase.dbpurchasestatus}
        ></Purchase>
      );
    });

    //print all the nodes in the list
    return <tbody>{purchaseNodes}</tbody>;
  },
});

var Purchase = React.createClass({
  render: function () {
    //display an individual donation
    return (
      <tr>
        <td>{this.props.purchkey}</td>
        <td>{this.props.purchdate}</td>
        <td>{this.props.purchtime}</td>
        <td>{this.props.purchuser}</td>
        <td>{this.props.purchplayer}</td>
        <td>{this.props.purchstatus}</td>
      </tr>
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
      <select name="purchuser_cc" id="purchuser_cc">
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
      <select name="purchplay_cc" id="purchplay_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});
var SelectStatusList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (statusList) {
      return (
        <option key={statusList.dbstatuskey} value={statusList.dbstatuskey}>
          {statusList.dbstatusdescription}
        </option>
      );
    });
    return (
      <select name="purchstatus_cc" id="purchstatus_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<PurchaseBox />, document.getElementById("content"));
