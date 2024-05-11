var FacultyBox = React.createClass({
    handleFacultySubmit: function (faculty) {

        $.ajax({
            url: "/faculty",
            dataType: "/json",
            type: "POST",
            data: faculty,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, error.toString());
            }.bind(this)
        })
    },
    render: function () {
        return (
            <div className="FacultyBox">
                <Facultyform2 onFacultySubmit ={this.handleFacultySubmit}/>
            </div>
        );
    }
});

var Facultyform2 = React.createClass({
    getInitialState: function () {
        return {
            facultyname: "",
            facultyemail: "",
        };
    },

    handleSubmit: function (e) {

        e.preventDefault();

        var facultyname = this.state.facultyname.trim();
        var facultyemail = this.state.facultyemail.trim();

        if (!this.validateEmail(facultyemail)) {
            console.log("Bad Email " + this.validateEmail(facultyemail));
            return;
        }

        this.props.onFacultySubmit({
            facultyname: facultyname,
            facultyemail: facultyemail,
        });
    },
    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            <form className="FacultyForm" onSubmit={this.handleSubmit}>
                <table id="table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>
                                <TextInput
                                    value={this.state.facultyname}
                                    uniqueName="facultyname"
                                    textArea={false}
                                    required={false}
                                    minCharacters={6}
                                    validate={this.commonValidate}
                                    onChange={this.setValue.bind(this, 'facultyname')}
                                    errorMessage="Faculty Name is invalid" />
                            </td>
                        </tr>
                        <tr>
                            <th>Faculty E-Mail</th>
                            <td>
                                <TextInput
                                    value={this.state.facultyemail}
                                    uniqueName="facultyemail"
                                    textArea={false}
                                    required={true}
                                    validate={this.validateEmail}
                                    onChange={this.setValue.bind(this, 'facultyemail')}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" id="submit" value="Insert Faculty" />

            </form>
        );
    }
});

var InputError = React.createClass({
    getInitialState: function () {
        return {
            message: 'Input is invalid'
        };
    },
    render: function () {
        var errorClass = classNames(this.props.className, {
            'error_container': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });

        return (
            <td> {this.props.errorMessage} </td>
        )
    }
});

var TextInput = React.createClass({
    getInitialState: function () {
        return {
            isEmpty: true,
            value: null,
            valid: false,
            errorMessage: "",
            errorVisible: false
        };
    },

    handleChange: function (event) {
        this.validation(event.target.value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },

    validation: function (value, valid) {
        if (typeof valid === 'undefined') {
            valid = true;
        }

        var message = "";
        var errorVisible = false;

        if (!valid) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }
        else if (this.props.required && jQuery.isEmptyObject(value)) {
            message = this.props.emptyMessage;
            valid = false;
            errorVisible = true;
        }
        else if (value.length < this.props.minCharacters) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }

        this.setState({
            value: value,
            isEmpty: jQuery.isEmptyObject(value),
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
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
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        } else {
            return (
                <div className={this.props.uniqueName}>
                    <input
                        name={this.props.uniqueName}
                        id={this.props.uniqueName}
                        placeholder={this.props.text}
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        }
    }
});

ReactDOM.render(
    <FacultyBox />,
    document.getElementById('content')
);
