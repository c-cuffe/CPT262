var ProductBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
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
                if (this.state.viewthepage == 1 || this.state.viewthepage == 3) {
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
  loadProductsFromServer: function () {
    $.ajax({
      url: "/getproduct",
      data: {
        productname_cc: productname_cc.value,
        productmodel_cc: productmodel_cc.value,
        productdescription_cc: productdescription_cc.value,
        productcolor_cc: productcolor_cc.value,
        productprice_cc: productprice_cc.value,
        productstock_cc: productstock_cc.value,
        productbrand_cc: prodbrand_cc.value,
        productcategory_cc: prodcat_cc.value,
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
  componentDidMount: function () {
    this.loadAllowLogin();
    this.loadProductsFromServer();
  },

  render: function () {
    return (
      <div>
        <h1>Products</h1>
        <Productform2 onProductSubmit={this.loadProductsFromServer} />
        <br />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Description</th>
              <th>Color</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <ProductList data={this.state.data} />
        </table>
      </div>
    );
  },
});

var Productform2 = React.createClass({
  getInitialState: function () {
    return {
      productname_cc: "",
      productmodel_cc: "",
      productdescription_cc: "",
      productcolor_cc: "",
      productprice_cc: "",
      productstock_cc: "",
      branddata: [],
      categorydata: [],
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  loadBrands: function () {
    $.ajax({
      url: "/getbrands",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ branddata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  loadProductCategories: function () {
    $.ajax({
      url: "/getproductcategories",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ categorydata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function () {
    this.loadBrands();
    this.loadProductCategories();
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var productname_cc = this.state.productname_cc.trim();
    var productmodel_cc = this.state.productmodel_cc.trim();
    var productdescription_cc = this.state.productdescription_cc.trim();
    var productcolor_cc = this.state.productcolor_cc.trim();
    var productprice_cc = this.state.productprice_cc.trim();
    var productstock_cc = this.state.productstock_cc.trim();
    var productbrand_cc = prodbrand_cc.value;
    var productcategory_cc = prodcat_cc.value;

    if (isNaN(productstock_cc)) {
      console.log("Not a number " + employeesalary);
      return;
    }
    this.props.onProductSubmit({
      productname_cc: productname_cc,
      productmodel_cc: productmodel_cc,
      productdescription_cc: productdescription_cc,
      productcolor_cc: productcolor_cc,
      productprice_cc: productprice_cc,
      productstock_cc: productstock_cc,
      productbrand_cc: productbrand_cc,
      productcategory_cc: productcategory_cc,
    });
  },
  handleChange: function (event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Product Name</th>
              <td>
                <input
                  type="text"
                  name="productname_cc"
                  id="productname_cc"
                  value={this.state.productname_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Product Model</th>
              <td>
                <input
                  name="productmodel_cc"
                  id="productmodel_cc"
                  value={this.state.productmodel_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Product Description</th>
              <td>
                <input
                  name="productdescription_cc"
                  id="productdescription_cc"
                  value={this.state.productdescription_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Product Color</th>
              <td>
                <input
                  name="productcolor_cc"
                  id="productcolor_cc"
                  value={this.state.productcolor_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Product Price</th>
              <td>
                <input
                  name="productprice_cc"
                  id="productprice_cc"
                  value={this.state.productprice_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Product Stock</th>
              <td>
                <input
                  name="productstock_cc"
                  id="productstock_cc"
                  value={this.state.productstock_cc}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Product Brand</th>
              <td>
                <SelectBrandList data={this.state.branddata} />
              </td>
            </tr>
            <tr>
              <th>Product Category</th>
              <td>
                <SelectCategoryList data={this.state.categorydata} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Search Product" />
      </form>
    );
  },
});
var ProductList = React.createClass({
  render: function () {
    var productNodes = this.props.data.map(function (product) {
      //map the data to individual donations
      return (
        <Product
          key={product.dbproductkey}
          prodname={product.dbproductname}
          prodmodel={product.dbproductmodel}
          proddescription={product.dbproductdescription}
          prodcolor={product.dbproductcolor}
          prodprice={product.dbproductprice}
          prodstock={product.dbproductstock}
          prodbrand={product.dbbrandname}
          prodcategory={product.dbproductcategoryname}
        ></Product>
      );
    });
    //print all the nodes in the list
    return <tbody>{productNodes}</tbody>;
  },
});

var Product = React.createClass({
  render: function () {
    //display an individual donation
    return (
      <tr>
        <td>{this.props.prodname}</td>
        <td>{this.props.prodbrand}</td>
        <td>{this.props.prodmodel}</td>
        <td>{this.props.proddescription}</td>
        <td>{this.props.prodcolor}</td>
        <td>{this.props.prodcategory}</td>
        <td>${this.props.prodprice}</td>
        <td>{this.props.prodstock}</td>
      </tr>
    );
  },
});

var SelectBrandList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (prodBrand) {
      return (
        <option key={prodBrand.dbbrandkey} value={prodBrand.dbbrandkey}>
          {prodBrand.dbbrandname}
        </option>
      );
    });
    return (
      <select name="prodbrand_cc" id="prodbrand_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});
var SelectCategoryList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (prodCategory) {
      return (
        <option
          key={prodCategory.dbproductcategorykey}
          value={prodCategory.dbproductcategorykey}
        >
          {prodCategory.dbproductcategoryname}
        </option>
      );
    });
    return (
      <select name="prodcat_cc" id="prodcat_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});
ReactDOM.render(<ProductBox />, document.getElementById("content"));
