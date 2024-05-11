var CourseBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadCoursesFromServer: function () {
        console.log(coursename.value);
        $.ajax({
            url: '/getcourses',
            data: {
                'coursefaculty': coursefaculty.value,
                'coursesemester': coursesemester.value,
                'courseyear': courseyear.value,
                'coursecampus': coursecampus.value,
                'courseprefix': courseprefix.value,
                'coursenumber': coursenumber.value,
                'coursesection': coursesection.value
            },
            
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },
    componentDidMount: function () {
        this.loadCoursesFromServer();
        // setInterval(this.loadCustomersFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div>
                <Courseform2 onFacultySubmit={this.loadCoursesFromServer} />
                <br />
                <table id="table">
                        <thead>
                            <tr>
                                <th>Faculty</th>
                                <th>Semester</th>
                                <th>Year</th>
                                <th>Prefix</th>
                                <th>Number</th>
                                <th>Section</th>
                            </tr>
                         </thead>
                        <CourseList data={this.state.data} />
                    </table>
                
            </div>
        );
    }
});

var Courseform2 = React.createClass({
    getInitialState: function () {
        return {
            coursefaculty: "",
            coursesemester: "",
            courseyear: "",
            coursecampus: "",
            courseprefix: "",
            coursesection: "",
            data: []
        };
    },

    handleOptionChange: function(e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    handleSubmit: function (e) {
        e.preventDefault();

        var coursefaculty = this.state.coursefaculty.trim();
        var coursesemester = this.state.coursesemester.trim();
        var courseyear = this.state.courseyear.trim();
        var coursecampus = this.state.coursecampus.trim();
        var coursenumber = this.state.coursenumber;
        var coursesection = this.state.coursesection;

        this.props.onCustomerSubmit({ 
            coursefaculty: coursefaculty, 
            coursesemester: coursesemester, 
            courseyear: courseyear, 
            coursecampus: coursecampus, 
            coursenumber: coursenumber,
            coursesection: coursesection });

    },
    handleChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {

        return (
            <form onSubmit={this.handleSubmit}>
                <table id="table">
                    <tbody>
                        <tr>
                            <th>Course Faculty</th>
                            <td>
                                <input type="text" name="coursefaculty" id="coursefaculty" value={this.state.coursefaculty} onChange={this.handleChange} />
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
                                <input type="text" name="courseyear" id="coursyear"></input>
                            </td>
                        </tr>
                        <tr>
                            <th>Course Prefix</th>
                            <td>
                                <input name="courseprefix" id="courseprefix" value={this.state.customeremail} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Course Number</th>
                            <td>
                                <input name="coursenumber" id="coursenumber" value={this.state.coursenumber} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Course Section</th>
                            <td>
                                <input name="coursesection" id="coursesection" value={this.state.coursesection} onChange={this.handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" id="submit" value="Search Courses" />

            </form>
        );
    }
});

var CourseList = React.createClass({
    render: function () {
        var courseNodes = this.props.data.map(function (customer) {
            //map the data to individual donations
            return (
                <Course
                    key={customer.dbcoursekey}
                    courkey={customer.dbcoursekey}
                    courfaculty={customer.dbcoursefaculty}
                    coursemester={customer.dbcoursemester}
                    couryear={customer.dbcourseyear}
                    courcampus={customer.dbcoursecampus}
                    courprefix={customer.dbcourseprefix}
                    cournumber={customer.dbcoursenumber}
                    coursection={customer.dbcoursesection}
                >
                </Course>
            );
                       
        });
        
        //print all the nodes in the list
        return (
             <tbody>
                {courseNodes}
            </tbody>
        );
    }
});



var Course = React.createClass({

    render: function () {
        return (

            <tr>
                            <td>
                                {this.props.cour} 
                            </td>
                            <td>
                                {this.props.courfaculty}
                            </td>
                            <td>
                                {this.props.coursemester}
                            </td>
                            <td>
                                {this.props.couryear}
                            </td>
                            <td>
                                {this.props.courcampus}
                            </td>
                            <td>
                                {this.props.courprefix}
                            </td>
                            <td>
                                {this.props.cournumber}
                            </td>
                            <td>
                                {this.props.coursection}
                            </td>
                </tr>
        );
    }
});

ReactDOM.render(
    <CourseBox />,
    document.getElementById('content')
);

