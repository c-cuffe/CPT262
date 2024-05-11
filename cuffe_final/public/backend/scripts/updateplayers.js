var PlayerBox = React.createClass({
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
  loadPlayerFromServer: function () {
    $.ajax({
      url: "/searchplayerup",
      data: {
        playerid_cc: playerid_cc.value,
        playerlname_cc: playerlname_cc.value,
        playerfname_cc: playerfname_cc.value,
        playeremail_cc: playeremail_cc.value,
        playerphone_cc: playerphone_cc.value,
        playerrewards_cc: playrewards_cc.value,
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
  updateSinglePlayerFromServer: function (player) {
    $.ajax({
      url: "/updatesingleplayer",
      dataType: "json",
      data: player,
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
    this.loadPlayerFromServer();
    // setInterval(this.loadPlayerFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <Playerform2 onPlayerSubmit={this.loadPlayerFromServer} />
        <br />
        <div id="theresults">
          <div id="theleft">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Rewards</th>
                  <th></th>
                </tr>
              </thead>
              <PlayerList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <PlayerUpdateform onUpdateSubmit={this.updateSinglePlayerFromServer} />
          </div>
        </div>
      </div>
    );
  },
});

var Playerform2 = React.createClass({
  getInitialState: function () {
    return {
      playerkey_cc: "",
      playerid_cc: "",
      playerlname_cc: "",
      playerfname_cc: "",
      playeremail_cc: "",
      playerphone_cc: "",
      playerrewards_cc: "",
      data: [],
    };
  },
  loadPlayerCategories: function () {
    $.ajax({
      url: "/getplayerrewards",
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
    this.loadPlayerCategories();
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var playerid_cc = this.state.playerid_cc.trim();
    var playerlname_cc = this.state.playerlname_cc.trim();
    var playerfname_cc = this.state.playerfname_cc.trim();
    var playeremail_cc = this.state.playeremail_cc.trim();
    var playerphone_cc = this.state.playerphone_cc.trim();
    var playerrewards_cc = playrewards_cc.value;

    this.props.onPlayerSubmit({
      playerid_cc: playerid_cc,
      playerlname_cc: playerlname_cc,
      playerfname_cc: playerfname_cc,
      playeremail_cc: playeremail_cc,
      playerphone_cc: playerphone_cc,
      playerrewards_cc: playerrewards_cc,
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
            <h2>Player</h2>
            <table>
              <tbody>
                <tr>
                  <th>Player ID</th>
                  <td>
                    <input
                      type="text"
                      name="playerid_cc"
                      id="playerid_cc"
                      value={this.state.playerid_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player First Name</th>
                  <td>
                    <input
                      name="playerfname_cc"
                      id="playerfname_cc"
                      value={this.state.playerfname_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Last Name</th>
                  <td>
                    <input
                      name="playerlname_cc"
                      id="playerlname_cc"
                      value={this.state.playerlname_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Email</th>
                  <td>
                    <input
                      name="playeremail_cc"
                      id="playeremail_cc"
                      value={this.state.playeremail_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Phone</th>
                  <td>
                    <input
                      name="playerphone_cc"
                      id="playerphone_cc"
                      value={this.state.playerphone_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Rewards</th>
                  <td>
                    <SelectList data={this.state.data} />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Search Player" />
          </form>
        </div>
      </div>
    );
  },
});

var PlayerUpdateform = React.createClass({
  getInitialState: function () {
    return {
      upplayerkey_cc: "",
      upplayerid_cc: "",
      upplayerlname_cc: "",
      upplayerfname_cc: "",
      upplayeremail_cc: "",
      upplayerphone_cc: "",
      upplayerrewards_cc: "",
      updata: [],
    };
  },
  loadPlayerCategories: function () {
    $.ajax({
      url: "/getplayerrewards",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ updata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function () {
    this.loadPlayerCategories();
  },
  handleUpSubmit: function (e) {
    e.preventDefault();

    var upplayerkey_cc = uppkey_cc.value;
    var upplayerid_cc = uppid_cc.value;
    var upplayerlname_cc = upplname_cc.value;
    var upplayerfname_cc = uppfname_cc.value;
    var upplayeremail_cc = uppemail_cc.value;
    var upplayerphone_cc = uppphone_cc.value;
    var upplayerrewards_cc = upprewards_cc.value;

    this.props.onUpdateSubmit({
      upplayerkey_cc: upplayerkey_cc,
      upplayerid_cc: upplayerid_cc,
      upplayerlname_cc: upplayerlname_cc,
      upplayerfname_cc: upplayerfname_cc,
      upplayeremail_cc: upplayeremail_cc,
      upplayerphone_cc: upplayerphone_cc,
      upplayerrewards_cc: upplayerrewards_cc,
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
                  <th>ID</th>
                  <td>
                    <input
                      type="text"
                      name="uppid_cc"
                      id="uppid_cc"
                      value={this.state.uppid_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>
                    <input
                      name="upplname_cc"
                      id="upplname_cc"
                      value={this.state.upplname_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>
                    <input
                      name="uppfname_cc"
                      id="uppfname_cc"
                      value={this.state.uppfname_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <input
                      name="uppemail_cc"
                      id="uppemail_cc"
                      value={this.state.uppemail_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>
                    <input
                      name="uppphone_cc"
                      id="uppphone_cc"
                      value={this.state.uppphone_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Rewards</th>
                  <td>
                    <SelectUpdateList data={this.state.updata} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input type="hidden" name="uppkey_cc" id="uppkey_cc" onChange={this.handleUpChange}/>
            <input type="submit" value="Update Player" />
          </form>
        </div>
      </div>
    );
  },
});

var PlayerList = React.createClass({
  render: function () {
    var playerNodes = this.props.data.map(function (player) {
      return (
        <Player
          key={player.dbplayerkey}
          pkey_cc={player.dbplayerkey}
          pid_cc={player.dbplayerid}
          pfname_cc={player.dbplayerfname}
          plname_cc={player.dbplayerlname}
          pemail_cc={player.dbplayeremail}
          pphone_cc={player.dbplayerphone}
          prewards_cc={player.dbplayerrewards}
        ></Player>
      );
    });

    //print all the nodes in the list
    return <tbody>{playerNodes}</tbody>;
  },
});

var Player = React.createClass({
  getInitialState: function () {
    return {
      uppkey_cc: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theuppkey_cc = this.props.pkey_cc;

    this.loadSinglePlayer(theuppkey_cc);
  },
  loadSinglePlayer: function (theuppkey_cc) {
    $.ajax({
      url: "/getsingleplayer",
      data: {
        uppkey_cc: theuppkey_cc,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populatePlayer = this.state.singledata.map(function (player) {
          uppkey_cc.value = theuppkey_cc;
          uppemail_cc.value = player.dbplayeremail;
          uppid_cc.value = player.dbplayerid;
          uppphone_cc.value = player.dbplayerphone;
          uppfname_cc.value = player.dbplayerfname;
          upplname_cc.value = player.dbplayerlname;
          upprewards_cc.value = player.dbplayerrewards;
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
        <td>{this.props.pkey_cc}</td>
        <td>{this.props.pid_cc}</td>
        <td>{this.props.pfname_cc}</td>
        <td>{this.props.plname_cc}</td>
        <td>{this.props.pemail_cc}</td>
        <td>{this.props.pphone_cc}</td>
        <td>{this.props.prewards_cc}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
      </tr>
    );
  },
});

var SelectList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (playerCategories) {
      return (
        <option
          key={playerCategories.dbplayerrewardsid}
          value={playerCategories.dbplayerrewardsid}
        >
          {playerCategories.dbrewardsdescription}
        </option>
      );
    });
    return (
      <select name="playrewards_cc" id="playrewards_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

var SelectUpdateList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (playerRewards) {
      return (
        <option
          key={playerRewards.dbrewardskey}
          value={playerRewards.dbrewardskey}
        >
          {playerRewards.dbrewardsdescription}
        </option>
      );
    });
    return (
      <select name="upprewards_cc" id="upprewards_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<PlayerBox />, document.getElementById("content"));
