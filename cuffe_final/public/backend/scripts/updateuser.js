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
  loadUserFromServer: function () {
    $.ajax({
      url: "/searchuserup",
      data: {
        userid_cc: userid_cc.value,
        userlname_cc: userlname_cc.value,
        userfname_cc: userfname_cc.value,
        useremail_cc: useremail_cc.value,
        userphone_cc: userphone_cc.value,
        usercategory_cc: usercat_cc.value,
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
  updateSingleUserFromServer: function (user) {
    $.ajax({
      url: "/updatesingleuser",
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
    this.loadUserFromServer();
    // setInterval(this.loadUserFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <Userform2 onUserSubmit={this.loadUserFromServer} />
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
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>
              <UserList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <UserUpdateform onUpdateSubmit={this.updateSingleUserFromServer} />
          </div>
        </div>
      </div>
    );
  },
});

var Userform2 = React.createClass({
  getInitialState: function () {
    return {
      userkey_cc: "",
      userid_cc: "",
      userlname_cc: "",
      userfname_cc: "",
      useremail_cc: "",
      userphone_cc: "",
      usercategory_cc: "",
      data: [],
    };
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
    var usercategory_cc = usercat_cc.value;

    this.props.onUserSubmit({
      userid_cc: userid_cc,
      userlname_cc: userlname_cc,
      userfname_cc: userfname_cc,
      useremail_cc: useremail_cc,
      userphone_cc: userphone_cc,
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
      <div>
        <div id="theform">
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
                  <th>User Category</th>
                  <td>
                    <SelectList data={this.state.data} />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Search User" />
          </form>
        </div>
      </div>
    );
  },
});

var UserUpdateform = React.createClass({
  getInitialState: function () {
    return {
      upuserkey_cc: "",
      upuserid_cc: "",
      upuserlname_cc: "",
      upuserfname_cc: "",
      upuseremail_cc: "",
      upuserphone_cc: "",
      upusercategory_cc: "",
      updata: [],
    };
  },
  loadUserCategories: function () {
    $.ajax({
      url: "/getusercategories",
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
    this.loadUserCategories();
  },
  handleUpSubmit: function (e) {
    e.preventDefault();

    var upuserkey_cc = upukey_cc.value;
    var upuserid_cc = upuid_cc.value;
    var upuserlname_cc = upulname_cc.value;
    var upuserfname_cc = upufname_cc.value;
    var upuseremail_cc = upuemail_cc.value;
    var upuserphone_cc = upuphone_cc.value;
    var upusercategory_cc = upucategory_cc.value;

    this.props.onUpdateSubmit({
      upuserkey_cc: upuserkey_cc,
      upuserid_cc: upuserid_cc,
      upuserlname_cc: upuserlname_cc,
      upuserfname_cc: upuserfname_cc,
      upuseremail_cc: upuseremail_cc,
      upuserphone_cc: upuserphone_cc,
      upusercategory_cc: upusercategory_cc,
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
                      name="upuid_cc"
                      id="upuid_cc"
                      value={this.state.upuid_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>
                    <input
                      name="upulname_cc"
                      id="upulname_cc"
                      value={this.state.upulname_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>
                    <input
                      name="upufname_cc"
                      id="upufname_cc"
                      value={this.state.upufname_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <input
                      name="upuemail_cc"
                      id="upuemail_cc"
                      value={this.state.upuemail_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>
                    <input
                      name="upuphone_cc"
                      id="upuphone_cc"
                      value={this.state.upuphone_cc}
                      onChange={this.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>
                    <SelectUpdateList data={this.state.updata} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input type="hidden" name="upukey_cc" id="upukey_cc" onChange={this.handleUpChange}/>
            <input type="submit" value="Update User" />
          </form>
        </div>
      </div>
    );
  },
});

var UserList = React.createClass({
  render: function () {
    var userNodes = this.props.data.map(function (user) {
      return (
        <User
          key={user.dbuserkey}
          ukey_cc={user.dbuserkey}
          uid_cc={user.dbuserid}
          ufname_cc={user.dbuserfname}
          ulname_cc={user.dbuserlname}
          uemail_cc={user.dbuseremail}
          uphone_cc={user.dbuserphone}
          ucategory_cc={user.dbusercategory}
        ></User>
      );
    });

    //print all the nodes in the list
    return <tbody>{userNodes}</tbody>;
  },
});

var User = React.createClass({
  getInitialState: function () {
    return {
      upukey_cc: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theupukey_cc = this.props.ukey_cc;

    this.loadSingleUser(theupukey_cc);
  },
  loadSingleUser: function (theupukey_cc) {
    $.ajax({
      url: "/getsingleuser",
      data: {
        upukey_cc: theupukey_cc,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populateUser = this.state.singledata.map(function (user) {
          upukey_cc.value = theupukey_cc;
          upuemail_cc.value = user.dbuseremail;
          upuid_cc.value = user.dbuserid;
          upuphone_cc.value = user.dbuserphone;
          upufname_cc.value = user.dbuserfname;
          upulname_cc.value = user.dbuserlname;
          upucategory_cc.value = user.dbusercategory;
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
        <td>{this.props.ukey_cc}</td>
        <td>{this.props.uid_cc}</td>
        <td>{this.props.ufname_cc}</td>
        <td>{this.props.ulname_cc}</td>
        <td>{this.props.uemail_cc}</td>
        <td>{this.props.uphone_cc}</td>
        <td>{this.props.ucategory_cc}</td>
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

var SelectUpdateList = React.createClass({
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
      <select name="upucategory_cc" id="upucategory_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<UserBox />, document.getElementById("content"));
