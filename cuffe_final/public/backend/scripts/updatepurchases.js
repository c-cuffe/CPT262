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
                if (this.state.viewthepage == 1) {
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
  loadPurchaseFromServer: function () {
    $.ajax({
      url: "/searchpurchases",
      data: {
        purchasedate_cc: purchasedate_cc.value,
        purchasetime_cc: purchasetime_cc.value,
        purchaseuser_cc: purchuser_cc.value,
        purchaseplayer_cc: purchplay_cc.value,
        purchasestatus_cc: purchstatus_cc.value
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
  updateSinglePurchaseFromServer: function (user) {
    $.ajax({
      url: "/updatesinglepurchase",
      dataType: "json",
      data: user,
      type: "POST",
      cache: false,
      success: function (upsingledata) {
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
    this.loadPurchaseFromServer();
    // setInterval(this.loadPurchaseFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <Purchaseform2 onPurchaseSubmit={this.loadPurchaseFromServer} />
        <br />
        <div id="theresults">
          <div id="theleft">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>User</th>
                  <th>Player</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <PurchaseList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <PurchaseUpdateform
              onUpdateSubmit={this.updateSinglePurchaseFromServer}
            />
          </div>
        </div>
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
      statusdata: [],
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
      <div>
        <div id="theform">
          <form onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>Purchase Date</th>
                  <td>
                    <input
                      type="date"
                      id="purchasedate_cc"
                      name="purchasedate_cc"
                    >
                      Select the Date:
                    </input>
                  </td>
                </tr>
                <tr>
                  <th>Purchase Time</th>
                  <td>
                    <input
                      type="time"
                      id="purchasetime_cc"
                      name="purchasetime_cc"
                    >
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
        </div>
      </div>
    );
  },
});

var PurchaseUpdateform = React.createClass({
  getInitialState: function () {
    return {
      uppurchasekey_cc: "",
      uppurhcasedate_cc: "",
      uppurchasetime_cc: "",
      uppurchaseuser_cc: "",
      uppurchaseplayer_cc: "",
      uppurchasestatus_cc: "",
      upuserdata: [],
      upplayerdata: [],
      upstatusdata: [],
    };
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
  loadStatuses: function () {
    $.ajax({
      url: "/getstatuses",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ upstatusdata: data });
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
  handleUpSubmit: function (e) {
    e.preventDefault();

    var uppurchasekey_cc = uppurchkey_cc.value;
    var uppurchasedate_cc = uppurchdate_cc.value;
    var uppurchasetime_cc = uppurchtime_cc.value;
    var uppurchaseuser_cc = uppurchuser_cc.value;
    var uppurchaseplayer_cc = uppurchplayer_cc.value;
    var uppurchasestatus_cc = uppurchstatus_cc.value;

    this.props.onUpdateSubmit({
      uppurchasekey_cc: uppurchasekey_cc,
      uppurchasedate_cc: uppurchasedate_cc,
      uppurchasetime_cc: uppurchasetime_cc,
      uppurchaseuser_cc: uppurchaseuser_cc,
      uppurchaseplayer_cc: uppurchaseplayer_cc,
      uppurchasestatus_cc: uppurchasestatus_cc,
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
            <table>
              <tbody>
                <tr>
                  <th>Purchase Date</th>
                  <td>
                    <input
                      type="date"
                      id="uppurchdate_cc"
                      name="uppurchdate_cc"
                      value={this.state.uppurchdate_cc}
                      onChange={this.state.handleUpChange}
                    >
                      Select the Date:
                    </input>
                  </td>
                </tr>
                <tr>
                  <th>Purchase Time</th>
                  <td>
                    <input
                      type="time"
                      id="uppurchtime_cc"
                      name="uppurchtime_cc"
                      value={this.state.uppurchtime_cc}
                      onChange={this.state.handleUpChange}
                    >
                      Select the Time:
                    </input>
                  </td>
                </tr>
                <tr>
                  <th>Purchase User</th>
                  <td>
                    <SelectUpdateUserList data={this.state.upuserdata} />
                  </td>
                </tr>
                <tr>
                  <th>Purchase Player</th>
                  <td>
                    <SelectUpdatePlayerList data={this.state.upplayerdata} />
                  </td>
                </tr>
                <tr>
                  <th>Purchase Status</th>
                  <td>
                    <SelectUpdateStatusList data={this.state.upstatusdata} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input
              type="hidden"
              name="uppurchkey_cc"
              id="uppurchkey_cc"
              onChange={this.handleUpChange}
            />
            <input type="submit" value="Update Purchase" />
          </form>
        </div>
      </div>
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
          purchkey_cc={purchase.dbpurchasekey}
          purchplayer_cc={purchase.dbplayerfname + " " + purchase.dbplayerlname}
          purchuser_cc={purchase.dbuserfname + " " + purchase.dbuserlname}
          purchdate_cc={purchase.dbpurchasedate}
          purchtime_cc={purchase.dbpurchasetime}
          purchstatus_cc={purchase.dbstatusdescription}
        ></Purchase>
      );
    });

    //print all the nodes in the list
    return <tbody>{purchaseNodes}</tbody>;
  },
});
var Purchase = React.createClass({
  getInitialState: function () {
    return {
      uppurchkey_cc: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theuppurchkey_cc = this.props.purchkey_cc;

    this.loadSinglePurchase(theuppurchkey_cc);
  },
  loadSinglePurchase: function (theuppurchkey_cc) {
    $.ajax({
      url: "/getsinglepurchase",
      data: {
        uppurchkey_cc: theuppurchkey_cc,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populatePurchase = this.state.singledata.map(function (purchase) {
          uppurchkey_cc.value = theuppurchkey_cc;
          uppurchdate_cc.value = purchase.dbpurchasedate;
          uppurchtime_cc.value = purchase.dbpurchasetime;
          uppurchuser_cc.value = purchase.dbpurchaseuser;
          uppurchplayer_cc.value = purchase.dbpurchaseplayer;
          uppurchstatus_cc.value = purchase.dbpurchasestatus;
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
        <td>{this.props.purchkey_cc}</td>
        <td>{this.props.purchdate_cc}</td>
        <td>{this.props.purchtime_cc}</td>
        <td>{this.props.purchuser_cc}</td>
        <td>{this.props.purchplayer_cc}</td>
        <td>{this.props.purchstatus_cc}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
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
        <option value=""></option>
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
      <select name="uppurchuser_cc" id="uppurchuser_cc">
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
      <select name="uppurchplayer_cc" id="uppurchplayer_cc">
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
var SelectUpdateStatusList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (statusList) {
      return (
        <option key={statusList.dbstatuskey} value={statusList.dbstatuskey}>
           {statusList.dbstatusdescription}
        </option>
      );
    });
    return (
      <select name="uppurchstatus_cc" id="uppurchstatus_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<PurchaseBox />, document.getElementById("content"));
