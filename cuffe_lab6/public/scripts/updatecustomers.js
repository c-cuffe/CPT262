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
    updateSingleCustFromServer: function (customer) {

        $.ajax({
            url: "/updatesinglecust",
            dataType: "json",
            data: customer,
            type: "POST",
            cache: false,
            success: function (upsingledata) {
                this.setState({ upsingledata: upsingledata });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString)
            }.bind(this)
        });
        window.location.reload(true)
    },
    componentDidMount: function () {
        this.loadCustomersFromServer();
        // setInterval(this.loadCustomersFromServer, this.props.pollInterval);
    },

    render: function () {
        return (
            <div>
                <h1>Update Customers</h1>
                <Customerform2 onCustomerSubmit={this.loadCustomersFromServer} />
                <br />
                <div id="theresults">
                    <div id="theleft">
                        <table>
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                         </thead>
                        <CustomerList data={this.state.data} />
                    </table>
                    </div>
                    <div id="theright">
                        <CustomerUpdateform onUpdateSubmit={this.updateSingleCustFromServer}/>
                    </div>
                    </div>
                
            </div>
        );
    }
});

var Customerform2 = React.createClass({
    getInitialState: function () {
        return {
            customerkey: "",
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
            <div>
                <div id="theform">
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
            </div>
            <div>
                <br />
                <form onSubmit={this.getInitialState}>
                    <input type="submit" value="Clear Form" />
                </form>
            </div>
            </div>
        );
    }
});

var CustomerUpdateform = React.createClass({
    getInitialState: function() {
        return {
            upcustomerkey: "",
            upcustomername: "",
            upcustomeraddress: "",
            upcustomerzip: "",
            upcustomercredit: "",
            upcustomeremail: "",
            upcustomerMember: "",
            upselectedOption: "",
            updata: []
        };
    },
    handleUpOptionChange: function(e) {
        this.setState({
            upselectedOption: e.target.value
        });
    },
    loadCustRewards: function() {
        $.ajax({
            url: "/getcustrewards",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ updata: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCustRewards();
    },
    handleUpSubmit: function (e) {
        e.preventDefault();

        var upcustomerkey = upcustkey.value;
        var upcustomername = upcustname.value;
        var upcustomeraddress = upcustaddress.value;
        var upcustomerzip = upcustzip.value;
        var upcustomeremail = upcustemail.value;
        var upcustomercredit = upcustcredit.value;
        var upcustomermember = this.state.upselectedOption;
        var upcustomerrewards = upcustrewards.value;

        this.props.onUpdateSubmit({
            upcustomerkey: upcustomerkey,
            upcustomername: upcustomername,
            upcustomeraddress: upcustomeraddress,
            upcustomerzip: upcustomerzip,
            upcustomeremail: upcustomeremail,
            upcustomercredit: upcustomercredit,
            upcustomerrewards: upcustomerrewards,
            upcustomermember: upcustomermember
        })
    },
    handleUpChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
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
                                    <th>Customer Name</th>
                                    <td>
                                        <input name="upcustname"
                                        id="upcustname"
                                        value={this.state.upcustname}
                                        onChange={this.handleUpChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Customer Address</th>
                                    <td>
                                        <input name="upcustaddress"
                                        id="upcustaddress"
                                        value={this.state.upcustaddress}
                                        onChange={this.handleUpChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Customer ZIP</th>
                                    <td>
                                        <input name="upcustzip"
                                        id="upcustzip"
                                        value={this.state.upcustzip}
                                        onChange={this.handleUpChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Customer Credit</th>
                                    <td>
                                        <input name="upcustcredit"
                                        id="upcustcredit"
                                        value={this.state.upcustcredit}
                                        onChange={this.handleUpChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Customer Email</th>
                                    <td>
                                        <input name="upcustemail"
                                        id="upcustemail"
                                        value={this.state.upcustemail}
                                        onChange={this.handleUpChange}/>
                                    </td>
                                </tr>
                                <tr>
                            <th>
                                Normal or Discount Club Member
                            </th>
                            <td>
                            <input
                                type = "radio"
                                name = "upcustmember"
                                id = "upcustmemberyes"
                                value = "1"
                                checked = {this.state.upselectedOption === "1"}
                                onChange = {this.handleUpOptionChange}
                                className = "form-check-input"
                                />Discount Club 
                                <input
                                type = "radio"
                                name = "upcustmember"
                                id = "upcustmemberno"
                                value = "0"
                                checked = {this.state.upselectedOption === "0"}
                                onChange = {this.handleUpOptionChange}
                                className = "form-check-input"
                                />Normal
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Customer Rewards
                            </th>
                            <td>
                                <SelectUpdateList data={this.state.updata} />
                            </td>
                        </tr>
                            </tbody>
                        </table><br />
                        <input id="upcustkey" type="hidden" name="upcustkey" onChange={this.handleUpChange}/>
                        <input type="submit" value="Update Customer" />
                    </form>
                </div>
            </div>
        );
    }
    
});

var CustomerList = React.createClass({
    render: function () {
        var customerNodes = this.props.data.map(function (customer) {
            //map the data to individual donations
            return (
                <Customer
                    key={customer.dbcustomerid}
                    custkey={customer.dbcustomerid}
                    custname={customer.dbcustomername}
                    custemail={customer.dbcustomeremail}
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
    getInitialState: function() {
        return {
            upcustkey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupcustkey = this.props.custkey;

        this.loadSingleCust(theupcustkey);
    },
    loadSingleCust: function(theupcustkey) {
        $.ajax({
            url: "/getsinglecust",
            data: {
                "upcustkey": theupcustkey
            },
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateCust = this.state.singledata.map(function (customer) {
                    upcustkey.value = theupcustkey;
                    upcustname.value = customer.dbcustomername;
                    upcustaddress.value = customer.dbcustomeraddress;
                    upcustzip.value = customer.dbcustomerzip;
                    upcustcredit.value = customer.dbcustomercredit;
                    upcustemail.value = customer.dbcustomeremail;
                    upcustrewards.value = customer.dbcustomerrewards;
                    if (customer.dbcustomermember == 1) {
                        upcustmemberyes.checked = true;
                    } else {
                        upcustmemberno.checked = true;
                    }
                });
            }.bind(this)
        });
    },
    render: function () {
        //display an individual donation
        return (

            <tr>
                            <td>
                                {this.props.custkey} 
                            </td>
                            <td>
                                {this.props.custname}
                            </td>
                            <td>
                                {this.props.custemail}
                            </td>
                            <td>
                                <form onSubmit={this.updateRecord}>
                                    <input type="submit" value="Update Record"/>
                                </form>
                            </td>
                </tr>
        );
    }
});

var SelectUpdateList = React.createClass({
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
            <select name="upcustrewards" id="upcustrewards">
                <option value = "0"></option>
                {optionNodes}
            </select>
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

