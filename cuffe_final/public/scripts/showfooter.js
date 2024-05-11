var ShowFooter = React.createClass({
  render: function () {
    return (
      <div>
        <nav>
          <a href="insertplayers.html">Create Player Account</a>
          <a href="insertreservation.html">Tee Times</a>
          <img src="images/logo-mbg-white.png" />
          <img src="images/palmetto_logo.png" />
          <img src="images/logo-founders-white.png" />
          <a href="searchproducts.html">View Products</a>
        </nav>
        <a id="login" href="backend/index.html">
          User Login
        </a>
      </div>
    );
  },
});

ReactDOM.render(<ShowFooter />, document.getElementById("footer"));
