var PlayerBox = React.createClass({
  handlePlayerSubmit: function (player) {
    $.ajax({
      url: "/player",
      dataType: "/json",
      type: "POST",
      data: player,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, error.toString());
      }.bind(this),
    });
    alert("Player successfully created.");
  },
  render: function () {
    return (
      <div className="PlayerBox">
        <h1>Player</h1>
        <Playerform2 onPlayerSubmit={this.handlePlayerSubmit} />
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
      playerpassword_cc: "",
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
    var playerpassword_cc = this.state.playerpassword_cc.trim();

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
      playerpassword_cc: playerpassword_cc,
    });
  },

  validateEmail: function (value) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
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
      <form className="PlayerForm" onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Player ID</th>
              <td>
                <TextInput
                  value={this.state.playerid_cc}
                  uniqueName="playerid_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerid_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>Player First Name</th>
              <td>
                <TextInput
                  value={this.state.playerfname_cc}
                  uniqueName="playerfname_cc"
                  textArea={false}
                  required={false}
                  minCharacters={3}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerfname_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>Player Last Name</th>
              <td>
                <TextInput
                  value={this.state.playerlname_cc}
                  uniqueName="playerlname_cc"
                  textArea={false}
                  required={false}
                  minCharacters={3}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerlname_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>Player E-Mail</th>
              <td>
                <TextInput
                  value={this.state.playeremail_cc}
                  uniqueName="playeremail_cc"
                  textArea={false}
                  required={true}
                  validate={this.validateEmail}
                  onChange={this.setValue.bind(this, "playeremail_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>Player Password</th>
              <td>
                <TextInput
                  value={this.state.playerpassword_cc}
                  inputType="password"
                  uniqueName="playerpassword_cc"
                  textArea={false}
                  required={true}
                  validate={this.validateEmail}
                  onChange={this.setValue.bind(this, "playerpassword_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>Player Phone</th>
              <td>
                <TextInput
                  value={this.state.playerphone_cc}
                  uniqueName="playerphone_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerphone_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>Address Line 1</th>
              <td>
                <TextInput
                  value={this.state.playeraddress1_cc}
                  uniqueName="playeraddress1_cc"
                  textArea={false}
                  required={false}
                  minCharacters={5}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playeraddress1_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>Address Line 2</th>
              <td>
                <TextInput
                  value={this.state.playeraddress2_cc}
                  uniqueName="playeraddress2_cc"
                  textArea={false}
                  required={false}
                  minCharacters={0}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playeraddress2_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>State</th>
              <td>
                <select id="playerstatesel_cc">
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
                <TextInput
                  value={this.state.playercity_cc}
                  uniqueName="playercity_cc"
                  textArea={false}
                  required={false}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playercity_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>ZIP</th>
              <td>
                <TextInput
                  value={this.state.playerzip_cc}
                  uniqueName="playerzip_cc"
                  textArea={false}
                  required={false}
                  minCharacters={5}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerzip_cc")}
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
        <input type="submit" value="Insert Player" />
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
var TextInput = React.createClass({
  getInitialState: function () {
    return {
      isEmpty: true,
      value: null,
      valid: false,
      errorMessage: "",
      errorVisible: false,
    };
  },

  handleChange: function (event) {
    this.validation(event.target.value);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  validation: function (value, valid) {
    if (typeof valid === "undefined") {
      valid = true;
    }

    var message = "";
    var errorVisible = false;

    if (!valid) {
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    } else if (this.props.required && jQuery.isEmptyObject(value)) {
      message = this.props.emptyMessage;
      valid = false;
      errorVisible = true;
    } else if (value.length < this.props.minCharacters) {
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    }

    this.setState({
      value: value,
      isEmpty: jQuery.isEmptyObject(value),
      valid: valid,
      errorMessage: message,
      errorVisible: errorVisible,
    });
  },

  handleBlur: function (event) {
    var valid = this.props.validate(event.target.value);
    this.validation(event.target.value, valid);
  },
  render: function () {
    if (this.props.textArea) {
      return (
        <div className={this.props.uniqueName}>
          <textarea
            placeholder={this.props.text}
            className={"input input-" + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage}
          />
        </div>
      );
    } else {
      return (
        <div className={this.props.uniqueName}>
          <input
            type={this.props.inputType}
            name={this.props.uniqueName}
            id={this.props.uniqueName}
            placeholder={this.props.text}
            className={"input input-" + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage}
          />
        </div>
      );
    }
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
        <option value="0"></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<PlayerBox />, document.getElementById("content"));
