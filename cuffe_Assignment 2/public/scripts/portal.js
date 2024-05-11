var RequestBox = React.createClass({
    getInitialState: function() {
      return {data: []};
    },
    loadRequestsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentDidMount: function() {
        this.loadRequestsFromServer();
        setInterval(this.loadRequestsFromServer, this.props.pollInterval);
      },

      render: function() {
        return (
          <div className="requestBox">
            <RequestList data={this.state.data} />
        
          </div>
        );
      }
    });
    var RequestList = React.createClass({
        render: function() {
          var requestNodes = this.props.data.map(function(request) {
            return (
              <Request
                key={request.id}  
                fName={request.fName}
                lName={request.lName}
                dob={request.dob}
                address={request.address}
                city={request.city}
                state={request.state}
                zip={request.zip}
                email={request.email}
                phone={request.phone}
                contact={request.contact}
                newsletter={request.newsletter}
                insure={request.insure}
                insureOther={request.insureOther}
                issue={request.issue}
                symptoms={request.symptoms}
                location={request.location}
                learn={request.learn}
                >
              </Request>
            );
          });
          return (
            <div className="requestList">
              {requestNodes}
            </div>
          );
        }
      });

      var Request = React.createClass({
        render: function() {
          return (
            <div className="request">
                  <table id="portaltable">
                    <tbody>
                    <tr>
                      <td>{this.props.fName}</td>
                      <td>{this.props.lName}</td>
                      <td>{this.props.dob}</td>
                      <td>{this.props.address}</td>
                      <td>{this.props.city}</td>
                      <td>{this.props.state}</td>
                      <td>{this.props.zip}</td>
                      <td>{this.props.email}</td>
                      <td>{this.props.phone}</td>
                      <td>{this.props.contact}</td>
                      <td>{this.props.newsletter}</td>
                      <td>{this.props.insure}</td>
                      <td>{this.props.insureOther}</td>
                      <td>{this.props.issue}</td>
                      <td>{this.props.symptoms}</td>
                      <td>{this.props.location}</td>
                      <td>{this.props.learn}</td>
                    </tr>
                    </tbody>
                    </table>
            </div>
          );
        }
      });

      ReactDOM.render(
        <RequestBox url="/api/requests" pollInterval={2000} />,
        document.getElementById('content')
      );