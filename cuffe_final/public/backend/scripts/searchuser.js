var UserBox = React.createClass({
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
                  console.log("Success.")
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
  loadUserFromServer: function () {
    $.ajax({
      url: "/searchuser",
      data: {
        "userid_cc": userid_cc.value,
        "userlname_cc": userlname_cc.value,
        "userfname_cc": userfname_cc.value,
        "useremail_cc": useremail_cc.value,
        "userphone_cc": userphone_cc.value,
        "useraddress1_cc": useraddress1_cc.value,
        "useraddress2_cc": useraddress2_cc.value,
        "usercity_cc": usercity_cc.value,
        "userstate_cc": userstatesel_cc.value,
        "userzip_cc": userzip_cc.value,
        "usercategory_cc": usercat_cc.value,
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
  },
  componentDidMount: function () {
    this.loadUserFromServer();
    // setInterval(this.loadUsersFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div>
        <h1>User</h1>
        <Userform2 onUserSubmit={this.loadUserFromServer} />
        <br />
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address 1</th>
              <th>Address 2</th>
              <th>State</th>
              <th>City</th>
              <th>ZIP</th>
              <th>Category</th>
            </tr>
          </thead>
          <UserList data={this.state.data} />
        </table>
      </div>
    );
  },
});

var Userform2 = React.createClass({
  getInitialState: function () {
    return {
      userid_cc: "",
      userlname_cc: "",
      userfname_cc: "",
      useremail_cc: "",
      userphone_cc: "",
      useraddress1_cc: "",
      useraddress2_cc: "",
      userstate_cc: "",
      usercity_cc: "",
      userzip_cc: "",
      userpassword_cc: "",
      usercategory_cc: "",
      data: [],
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  loadUserCategories: function () {
    $.ajax({
      url: "/getusercategories",
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
    this.loadUserCategories();
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var userid_cc = this.state.userid_cc.trim();
    var userlname_cc = this.state.userlname_cc.trim();
    var userfname_cc = this.state.userfname_cc.trim();
    var useremail_cc = this.state.useremail_cc.trim();
    var userphone_cc = this.state.userphone_cc.trim();
    var useraddress1_cc = this.state.useraddress1_cc.trim();
    var useraddress2_cc = this.state.useraddress2_cc.trim();
    var userstate_cc = userstatesel_cc.value;
    var usercity_cc = this.state.usercity_cc.trim();
    var userzip_cc = this.state.userzip_cc.trim();
    var usercategory_cc = usercat_cc.value;

    this.props.onUserSubmit({
      userid_cc: userid_cc,
      userlname_cc: userlname_cc,
      userfname_cc: userfname_cc,
      useremail_cc: useremail_cc,
      userphone_cc: userphone_cc,
      useraddress1_cc: useraddress1_cc,
      useraddress2_cc: useraddress2_cc,
      userstate_cc: userstate_cc,
      usercity_cc: usercity_cc,
      userzip_cc: userzip_cc,
      usercategory_cc: usercategory_cc,
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
        <h2>User</h2>
        <table>
          <tbody>
            <tr>
              <th>User ID</th>
              <td>
                <input
                  type="text"
                  name="userid_cc"
                  id="userid_cc"
                  value={this.state.userid_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User First Name</th>
              <td>
                <input
                  name="userfname_cc"
                  id="userfname_cc"
                  value={this.state.userfname_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Last Name</th>
              <td>
                <input
                  name="userlname_cc"
                  id="userlname_cc"
                  value={this.state.userlname_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Email</th>
              <td>
                <input
                  name="useremail_cc"
                  id="useremail_cc"
                  value={this.state.useremail_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Phone</th>
              <td>
                <input
                  name="userphone_cc"
                  id="userphone_cc"
                  value={this.state.userphone_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Address 1</th>
              <td>
                <input
                  name="useraddress1_cc"
                  id="useraddress1_cc"
                  value={this.state.useraddress1_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Address 2</th>
              <td>
                <input
                  name="useraddress2_cc"
                  id="useraddress2_cc"
                  value={this.state.useraddress2_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User City</th>
              <td>
                <input
                  name="usercity_cc"
                  id="usercity_cc"
                  value={this.state.usercity_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>State</th>
              <td>
                <select id="userstatesel_cc">
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
              <th>User ZIP</th>
              <td>
                <input
                  name="userzip_cc"
                  id="userzip_cc"
                  value={this.state.userzip_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Category</th>
              <td>
                <SelectList data={this.state.data} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Search User" />
      </form>
    );
  },
});

var UserList = React.createClass({
  render: function () {
    var userNodes = this.props.data.map(function (user) {
      //map the data to individual donations
      return (
        <User
          key={user.dbuserkey}
          userid={user.dbuserid}
          userfname={user.dbuserfname}
          userlname={user.dbuserlname}
          useremail={user.dbuseremail}
          userphone={user.dbuserphone}
          useraddress1={user.dbuseraddress1}
          useraddress2={user.dbuseraddress2}
          userstate={user.dbuserstate}
          usercity={user.dbusercity}
          userzip={user.dbuserzip}
          usercategory={user.dbusercategorydescription}
        ></User>
      );
    });

    //print all the nodes in the list
    return <tbody>{userNodes}</tbody>;
  },
});

var User = React.createClass({
  render: function () {
    //display an individual donation
    return (
      <tr>
        <td>{this.props.userkey}</td>
        <td>{this.props.userid}</td>
        <td>{this.props.userfname} {this.props.userlname}</td>
        <td>{this.props.useremail}</td>
        <td>{this.props.userphone}</td>
        <td>{this.props.useraddress1}</td>
        <td>{this.props.useraddress2}</td>
        <td>{this.props.userstate}</td>
        <td>{this.props.usercity}</td>
        <td>{this.props.userzip}</td>
        <td>{this.props.usercategory}</td>
      </tr>
    );
  },
});

var SelectList = React.createClass({
    render: function () {
      var optionNodes = this.props.data.map(function (userCategories) {
        return (
          <option
            key={userCategories.dbusercategoryid}
            value={userCategories.dbusercategoryid}
          >
            {userCategories.dbusercategorydescription}
          </option>
        );
      });
      return (
        <select name="usercat_cc" id="usercat_cc">
          <option value=""></option>
          {optionNodes}
        </select>
      );
    },
  });

ReactDOM.render(<UserBox />, document.getElementById("content"));
