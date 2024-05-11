var UserBox = React.createClass({
  handleUserSubmit: function (user) {
    $.ajax({
      url: "/user",
      dataType: "/json",
      type: "POST",
      data: user,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, error.toString());
      }.bind(this),
    });
    alert("Record inserted.")
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
  render: function () {
    return (
      <div className="UserBox">
        <h1>User</h1>
        <Userform2 onUserSubmit={this.handleUserSubmit} />
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
    var userpassword_cc = this.state.userpassword_cc.trim();
    var usercategory_cc = usercat_cc.value;

    console.log("PW: " + userpassword_cc);

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
      userpassword_cc: userpassword_cc,
      usercategory_cc: usercategory_cc,
    });
  },

  validateEmail: function (value) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },
  validateDollars: function (value) {
    var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    return regex.test(value);
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
      <form className="UserForm" onSubmit={this.handleSubmit}>
        <h2>User</h2>
        <table>
          <tbody>
            <tr>
              <th>User ID</th>
              <td>
                <TextInput
                  value={this.state.userid_cc}
                  uniqueName="userid_cc"
                  textArea={false}
                  required={true}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "userid_cc")}
                  errorMessage="User ID is invalid"
                  emptyMessage="User ID is required"
                />
              </td>
            </tr>
            <tr>
              <th>User First Name</th>
              <td>
                <TextInput
                  value={this.state.userfname_cc}
                  uniqueName="userfname_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "userfname_cc")}
                  errorMessage="First Name is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>User Last Name</th>
              <td>
                <TextInput
                  value={this.state.userlname_cc}
                  uniqueName="userlname_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "userlname_cc")}
                  errorMessage="Last Name is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>User E-Mail</th>
              <td>
                <TextInput
                  value={this.state.useremail_cc}
                  uniqueName="useremail_cc"
                  textArea={false}
                  required={true}
                  validate={this.validateEmail}
                  onChange={this.setValue.bind(this, "useremail_cc")}
                  errorMessage="Invalid E-Mail Address"
                  emptyMessage="E-Mail Address is Required"
                />
              </td>
            </tr>
            <tr>
              <th>User Phone</th>
              <td>
                <TextInput
                  value={this.state.userphone_cc}
                  uniqueName="userphone_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "userphone_cc")}
                  errorMessage="User Phone is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Address Line 1</th>
              <td>
                <TextInput
                  value={this.state.useraddress1_cc}
                  uniqueName="useraddress1_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "useraddress1_cc")}
                  errorMessage="Address Line 1 is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Address Line 2</th>
              <td>
                <TextInput
                  value={this.state.useraddress2_cc}
                  uniqueName="useraddress2_cc"
                  textArea={false}
                  required={false}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "useraddress2_cc")}
                />
              </td>
            </tr>
            <tr>
              <th>State</th>
              <td>
                <select id="userstatesel_cc">
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
                  value={this.state.usercity_cc}
                  uniqueName="usercity_cc"
                  textArea={false}
                  required={false}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "usercity_cc")}
                  errorMessage="City is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>ZIP</th>
              <td>
                <TextInput
                  value={this.state.userzip_cc}
                  uniqueName="userzip_cc"
                  textArea={false}
                  required={false}
                  minCharacters={5}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "userzip_cc")}
                  errorMessage="ZIP Code is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <TextInput
                  inputType="password"
                  value={this.state.userpassword_cc}
                  uniqueName="userpassword_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "userpassword_cc")}
                  emptyMessage="Password is required"
                />
              </td>
            </tr>
            <tr>
              <th>Password Confirm</th>
              <td>
                <TextInput
                  inputType="password"
                  value={this.state.userpassword2_cc}
                  uniqueName="userpassword2_cc"
                  textArea={false}
                  required={false}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "userpassword2_cc")}
                  errorMessage="Password is incorrect"
                  emptyMessage="Password is required"
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
        <input type="submit" value="Insert User" />
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
        <option value="0"></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<UserBox />, document.getElementById("content"));
