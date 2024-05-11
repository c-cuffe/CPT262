var ShowNav = React.createClass({
  render: function () {
    return (
      <div>
        <a href="index.html">
          <img src="images/palmetto_logo.png" />
        </a>
        <nav>
          <a href="insertplayers.html">CREATE PLAYER ACCOUNT</a>
          <a href="searchproducts.html">VIEW PRODUCTS</a>
          <a href="playerlogin.html">LOGIN TO RESERVE A TEE TIME</a>
        </nav>
      </div>
    );
  },
});

ReactDOM.render(<ShowNav />, document.getElementById("heading"));
