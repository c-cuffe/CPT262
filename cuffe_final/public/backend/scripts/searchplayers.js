var PlayerBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
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
                  window.location.replace("home.html")
                  
                }
              }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
    })
  },
  loadPlayersFromServer: function () {
    $.ajax({
      url: "/getplayer",
      data: {
        playerid_cc: playerid_cc.value,
        playerlname_cc: playerlname_cc.value,
        playerfname_cc: playerfname_cc.value,
        playeremail_cc: playeremail_cc.value,
        playerphone_cc: playerphone_cc.value,
        playeraddress1_cc: playeraddress1_cc.value,
        playeraddress2_cc: playeraddress2_cc.value,
        playerstate_cc: playerstatesel_cc.value,
        playercity_cc: playercity_cc.value,
        playerzip_cc: playerzip_cc.value,
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
  componentDidMount: function () {
    this.loadAllowLogin();
    this.loadPlayersFromServer();
    // setInterval(this.loadPlayersFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <h1>Players</h1>
        <Playerform2 onPlayerSubmit={this.loadPlayersFromServer} />
        <br />
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address 1</th>
              <th>Address 2</th>
              <th>State</th>
              <th>City</th>
              <th>ZIP</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <PlayerList data={this.state.data} />
        </table>
      </div>
    );
  },
});

var Playerform2 = React.createClass({
  getInitialState: function () {
    return {
      playerid_cc: "",
      playerlname_cc: "",
      playerfname_cc: "",
      playeremail_cc: "",
      playerphone_cc: "",
      playeraddress1_cc: "",
      playeraddress2_cc: "",
      playerstate_cc: "",
      playercity_cc: "",
      playerzip_cc: "",
      playerrewards_cc: "",
      data: [],
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  loadPlayerRewards: function () {
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
    this.loadPlayerRewards();
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var playerid_cc = this.state.playerid_cc.trim();
    var playerlname_cc = this.state.playerlname_cc.trim();
    var playerfname_cc = this.state.playerfname_cc.trim();
    var playeremail_cc = this.state.playeremail_cc.trim();
    var playerphone_cc = this.state.playerphone_cc.trim();
    var playeraddress1_cc = this.state.playeraddress1_cc.trim();
    var playeraddress2_cc = this.state.playeraddress2_cc.trim();
    var playerstate_cc = playerstatesel_cc.value;
    var playercity_cc = this.state.playercity_cc.trim();
    var playerzip_cc = this.state.playerzip_cc.trim();
    var playerrewards_cc = playrewards_cc.value;

    this.props.onPlayerSubmit({
      playerid_cc: playerid_cc,
      playerlname_cc: playerlname_cc,
      playerfname_cc: playerfname_cc,
      playeremail_cc: playeremail_cc,
      playerphone_cc: playerphone_cc,
      playeraddress1_cc: playeraddress1_cc,
      playeraddress2_cc: playeraddress2_cc,
      playerstate_cc: playerstate_cc,
      playercity_cc: playercity_cc,
      playerzip_cc: playerzip_cc,
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
      <form onSubmit={this.handleSubmit}>
        <h2>Players</h2>
        <table>
          <tbody>
            <tr>
              <th>Player ID</th>
              <td>
                <input
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
              <th>Player E-Mail</th>
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
              <th>Address Line 1</th>
              <td>
                <input
                  name="playeraddress1_cc"
                  id="playeraddress1_cc"
                  value={this.state.playeraddress1_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Address Line 2</th>
              <td>
                <input
                  name="playeraddress2_cc"
                  id="playeraddress2_cc"
                  value={this.state.playeraddress2_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>State</th>
              <td>
                <select id="playerstatesel_cc">
                  <option value=""></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>City</th>
              <td>
                <input
                  name="playercity_cc"
                  id="playercity_cc"
                  value={this.state.playercity_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>ZIP</th>
              <td>
                <input
                  name="playerzip_cc"
                  id="playerzip_cc"
                  value={this.state.playerzip_cc}
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
    );
  },
});

var PlayerList = React.createClass({
  render: function () {
    var playerNodes = this.props.data.map(function (player) {
      //map the data to individual donations
      return (
        <Player
          key={player.dbplayerkey}
          playkey={player.dbplayerkey}
          playid={player.dbplayerid}
          playfname={player.dbplayerfname}
          playlname={player.dbplayerlname}
          playemail={player.dbplayeremail}
          playphone={player.dbplayerphone}
          playaddress1={player.dbplayeraddress1}
          playaddress2={player.dbplayeraddress2}
          playstate={player.dbplayerstate}
          playzip={player.dbplayerzip}
          playcity={player.dbplayercity}
          playrewards={player.dbrewardsdescription}
        ></Player>
      );
    });

    //print all the nodes in the list
    return <tbody>{playerNodes}</tbody>;
  },
});

var Player = React.createClass({
  render: function () {
    //display an individual donation
    return (
      <tr>
        <td>{this.props.playkey}</td>
        <td>{this.props.playid}</td>
        <td>{this.props.playfname}</td>
        <td>{this.props.playlname}</td>
        <td>{this.props.playemail}</td>
        <td>{this.props.playphone}</td>
        <td>{this.props.playaddress1}</td>
        <td>{this.props.playaddress2}</td>
        <td>{this.props.playstate}</td>
        <td>{this.props.playcity}</td>
        <td>{this.props.playzip}</td>
        <td>{this.props.playrewards}</td>
      </tr>
    );
  },
});

var SelectList = React.createClass({
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
      <select name="playrewards_cc" id="playrewards_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<PlayerBox />, document.getElementById("content"));
