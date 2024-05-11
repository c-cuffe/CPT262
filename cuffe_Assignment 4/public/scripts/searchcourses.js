var CustomerBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadCustomersFromServer: function () {
        console.log(customername.value);
        var cmembervalue = 2;
        if (custmemberyes.checked) {
            cmembervalue = 1;
        }
        if (custmemberno.checked) {
            cmembervalue = 0;
        }
        $.ajax({
            url: '/getcust',
            data: {
                'customername': customername.value,
                'customeraddress': customeraddress.value,
                'customerzip': customerzip.value,
                'customercredit': customercredit.value,
                'customeremail': customeremail.value,
                "customermember": cmembervalue,
                "customerrewards": custrewards.value
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
        this.loadCustomersFromServer();
        // setInterval(this.loadCustomersFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div>
                <h1>Customers</h1>
                <Customerform2 onCustomerSubmit={this.loadCustomersFromServer} />
                <br />
                <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Zip</th>
                                <th>Credit</th>
                                <th>Email</th>
                                <th>Member</th>
                                <th>Rewards</th>
                            </tr>
                         </thead>
                        <CustomerList data={this.state.data} />
                    </table>
                
            </div>
        );
    }
});

var Customerform2 = React.createClass({
    getInitialState: function () {
        return {
            customername: "",
            customeraddress: "",
            customerzip: "",
            customercredit: "",
            customeremail: "",
            customerMember: "",
            data: []
        };
    },

    handleOptionChange: function(e) {
        this.setState({
            selectedOption: e.target.value
        });
    },
    loadCustRewards: function() {
        $.ajax({
            url: "/getcustrewards",
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
        this.loadCustRewards();
    },
    handleSubmit: function (e) {
        e.preventDefault();

        var customername = this.state.customername.trim();
        var customeraddress = this.state.customeraddress.trim();
        var customerzip = this.state.customerzip.trim();
        var customercredit = this.state.customercredit.trim();
        var customeremail = this.state.customeremail;
        var customermember = this.state.selectedOption;
        var customerrewards = custrewards.value;

        this.props.onCustomerSubmit({ 
            customername: customername, 
            customeraddress: customeraddress, 
            customerzip: customerzip, 
            customercredit: customercredit, 
            customeremail: customeremail,
            customermember: customermember,
            customerrewards: customerrewards });

    },
    handleChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Customers</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Customer Name</th>
                            <td>
                                <input type="text" name="customername" id="customername" value={this.state.customername} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Customer Address</th>
                            <td>
                                <input name="customeraddress" id="customeraddress" value={this.state.customeraddress} onChange={this.handleChange}  />
                            </td>
                        </tr>
                        <tr>
                            <th>Customer Zip</th>
                            <td>
                                <input name="customerzip" id="customerzip" value={this.state.customerzip} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Customer Credit</th>
                            <td>
                                <input name="customercredit" id="customercredit" value={this.state.customercredit} onChange={this.handleChange}  />
                            </td>
                        </tr>
                        <tr>
                            <th>Customer Email</th>
                            <td>
                                <input name="customeremail" id="customeremail" value={this.state.customeremail} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Normal or Discount Club Member
                            </th>
                            <td>
                            <input
                                type = "radio"
                                name = "custmember"
                                id = "custmemberyes"
                                value = "1"
                                checked = {this.state.selectedOption === "1"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                                />Discount Club 
                                <input
                                type = "radio"
                                name = "custmember"
                                id = "custmemberno"
                                value = "0"
                                checked = {this.state.selectedOption === "0"}
                                onChange = {this.handleOptionChange}
                                className = "form-check-input"
                                />Normal
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Customer Rewards
                            </th>
                            <td>
                                <SelectList data={this.state.data} />
                            </td>
                        </tr>   
                    </tbody>
                </table>
                <input type="submit" value="Search Customer" />

            </form>
        );
    }
});

var CustomerList = React.createClass({
    render: function () {
        var customerNodes = this.props.data.map(function (customer) {
            //map the data to individual donations
            return (
                <Customer
                    key={customer.dbcustomerkey}
                    custkey={customer.dbcustomerkey}
                    custname={customer.dbcustomername}
                    custaddress={customer.dbcustomeraddress}
                    custzip={customer.dbcustomerzip}
                    custcredit={customer.dbcustomercredit}
                    custemail={customer.dbcustomeremail}
                    custmember={customer.dbcustomermember}
                    custrewards={customer.dbcustomerrewards}
                >
                </Customer>
            );
                       
        });
        
        //print all the nodes in the list
        return (
             <tbody>
                {customerNodes}
            </tbody>
        );
    }
});



var Customer = React.createClass({

    render: function () {
        //display an individual donation
        if (this.props.custmember == 1) {
            var themember = "Discount";
        } else {
            var themember = "Regular";
        }
        return (

            <tr>
                            <td>
                                {this.props.cust} 
                            </td>
                            <td>
                                {this.props.custname}
                            </td>
                            <td>
                                {this.props.custaddress}
                            </td>
                            <td>
                                {this.props.custzip}
                            </td>
                            <td>
                                {this.props.custcredit}
                            </td>
                            <td>
                                {this.props.custemail}
                            </td>
                            <td>
                                {themember}
                            </td>
                            <td>
                                {this.props.custrewards}
                            </td>
                </tr>
        );
    }
});

var SelectList = React.createClass({
    render: function() {
        var optionNodes = this.props.data.map(function (custRewards) {
            return(
                <option
                key={custRewards.dbcustrewardsid}
                value={custRewards.dbcustrewardsid}
                >
                    {custRewards.dbcustrewardsname}
                </option>
            );
        });
        return(
            <select name="custrewards" id="custrewards">
                <option value = "0"></option>
                {optionNodes}
            </select>
        );
    }
});

ReactDOM.render(
    <CustomerBox />,
    document.getElementById('content')
);

