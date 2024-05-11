var CourseBox = React.createClass({

    handleCustomerSubmit: function (customer) {
        $.ajax({
            url: "/course",
            dataType: "json",
            type: "POST",
            data: customer,
            success: function (data) {
                this.setState({ data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, error.toString());
            }.bind(this)
        })
    },
    render: function () {
        return (
            <div className="CourseBox">
                <Customerform2 onCustomerSubmit={this.handleCustomerSubmit} />
            </div>
        );
    }
});

var Customerform2 = React.createClass({
    getInitialState: function () {
        return {
            coursefaculty: "",
            customeraddress: "",
            customerzip: "",
            customecredit: "",
            customeremail: ""
        };
    },

    handleSubmit: function(e) {

        e.preventDefault();

        var coursefaculty = this.state.coursefaculty.trim();
        var customeraddress = this.state.customeraddress.trim();
        var customerzip = this.state.customerzip.trim();
        var customercredit = this.state.customercredit.trim();
        var customeremail = this.state.customeremail.trim();

        if (!this.validateEmail(customeremail)) {
            console.log("Bad Email " + this.validateEmail(customeremail));
            return;
        }
        if (isNaN(customercredit)) {
            console.log("Not a number " + customercredit);
            return;
        }

        if (!customername || !customeremail || !customercredit) {
            console.log("Field Missing")
            return;
        }

        this.props.onCustomerSubmit({
            coursefaculty: coursefaculty,
            customeraddress: customeraddress,
            customerzip: customerzip,
            customercredit: customercredit,
            customeremail: customeremail
        });
    },
    
    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            <form className="customerForm" onSubmit={this.handleSubmit}>
                <table id="table">
                    <tbody>
                        <tr>
                            <th>Faculty</th>
                            <td>
                <TextInput
                    value={this.state.coursefaculty}
                    uniqueName="coursefaculty"
                    textArea={false}
                    required={true}
                    minCharacters={6}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'coursefaculty')}
                    errorMessage="Course Faculty is invalid"
                    emptyMessage="Course Faculty is required" />
                            </td>
                        </tr>
                        <tr>
                            <th>Semester</th>
                            <td>
                            <select>
                                <option id="coursesemester" value="null"></option>
                                <option id="coursesemester" value="fall">Fall</option>
                                <option id="coursesemester" value="spring">Spring</option>
                                <option id="coursesemester" value="summer">Summer</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Campus</th>
                            <td>
                            <select>
                                <option id="coursecampus" value="null"></option>
                                <option id="coursecampus" value="conway">Conway</option>
                                <option id="coursecampus" value="georgetown">Georgetown</option>
                                <option id="coursecampus" value="grandstrand">Grand Strand</option>
                                <option id="coursecampus" value="online">Online</option>
                                <option id="coursecampus" value="hybrid">Hybrid</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Course Year</th>
                            <td>

                <TextInput
                    value={this.state.courseyear}
                    uniqueName="courseyear"
                    textArea={false}
                    required={false}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'courseyear')}
                    errorMessage=""
                    emptyMessage="" />
                            </td>
                        </tr>
                        <tr>
                            <th>Course Prefix</th>
                            <td>

                <TextInput
                    value={this.state.courseprefix}
                    uniqueName="courseprefix"
                    textArea={false}
                    required={false}
                    onChange={this.setValue.bind(this, 'courseprefix')}
                    emptyMessage="" />
                            </td>
                        </tr>
                        <tr>
                            <th>Course Number</th>
                            <td>
              

                <TextInput
                    value={this.state.coursenumber}
                    uniqueName="coursenumber"
                    textArea={false}
                    required={true}
                    onChange={this.setValue.bind(this, 'coursenumber')} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" id="submit" value="Insert Course" />
               
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
    <CourseBox />,
    document.getElementById('content')
);
