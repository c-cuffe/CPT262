var ProductBox = React.createClass({
  getInitialState: function () {
    return { data: [], viewthepage: 0 };
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
                if (this.state.viewthepage == 1) {
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
  updateSingleProdFromServer: function (product) {
    $.ajax({
      url: "/updatesingleproduct",
      dataType: "json",
      data: product,
      type: "POST",
      cache: false,
      success: function (upsingledata) {
        console.log("1 record updated.")
        this.setState({ upsingledata: upsingledata });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
    window.location.reload(true);
  },
  componentDidMount: function () {
    this.loadAllowLogin();
    this.loadProductsFromServer();
    // setInterval(this.loadProductsFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <h1>Update Products</h1>
        <Productform2 onProductSubmit={this.loadProductsFromServer} />
        <br />
        <div id="theresults">
          <div id="theleft">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Description</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <ProductList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <ProductUpdateform
              onUpdateSubmit={this.updateSingleProdFromServer}
            />
          </div>
        </div>
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
        <h2>Products</h2>
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

var ProductUpdateform = React.createClass({
  getInitialState: function () {
    return {
      upproductkey_cc: "",
      upproductname_cc: "",
      upproductmodel_cc: "",
      upproductdescription_cc: "",
      upproductcolor_cc: "",
      upproductprice_cc: "",
      upproductstock_cc: "",
      upbranddata: [],
      upcategorydata: [],
    };
  },
  handleUpOptionChange: function (e) {
    this.setState({
      upselectedOption: e.target.value,
    });
  },
  loadBrands: function () {
    $.ajax({
      url: "/getbrands",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ upbranddata: data });
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
        this.setState({ upcategorydata: data });
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
  handleUpSubmit: function (e) {
    e.preventDefault();

    var upproductkey_cc = upprodkey_cc.value
    var upproductname_cc = upprodname_cc.value;
    var upproductmodel_cc = upprodmodel_cc.value;
    var upproductdescription_cc = upproddescription_cc.value;
    var upproductcolor_cc = upprodcolor_cc.value;
    var upproductprice_cc = upprodprice_cc.value;
    var upproductstock_cc = upprodstock_cc.value;
    var upproductbrand_cc = upprodbrand_cc.value;
    var upproductcategory_cc = upprodcat_cc.value;

    this.props.onUpdateSubmit({
      upproductkey_cc: upproductkey_cc,
      upproductdescription_cc: upproductdescription_cc,
      upproductname_cc: upproductname_cc,
      upproductmodel_cc: upproductmodel_cc,
      upproductcolor_cc: upproductcolor_cc,
      upproductprice_cc: upproductprice_cc,
      upproductstock_cc: upproductstock_cc,
      upproductbrand_cc: upproductbrand_cc,
      upproductcategory_cc: upproductcategory_cc,
    });
  },
  handleUpChange: function (event) {
    this.setState({
      [event.target.id]: event.target.value,
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
                  <th>Product Name</th>
                  <td>
                    <input
                      type="text"
                      name="upprodname_cc"
                      id="upprodname_cc"
                      value={this.state.upprodname_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Model</th>
                  <td>
                    <input
                      name="upprodmodel_cc"
                      id="upprodmodel_cc"
                      value={this.state.upprodmodel_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Description</th>
                  <td>
                    <input
                      name="upproddescription_cc"
                      id="upproddescription_cc"
                      value={this.state.upproddescription_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Color</th>
                  <td>
                    <input
                      name="upprodcolor_cc"
                      id="upprodcolor_cc"
                      value={this.state.upprodcolor_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Price</th>
                  <td>
                    <input
                      name="upprodprice_cc"
                      id="upprodprice_cc"
                      value={this.state.upprodprice_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Stock</th>
                  <td>
                    <input
                      name="upprodstock_cc"
                      id="upprodstock_cc"
                      value={this.state.upprodstock_cc}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Brand</th>
                  <td>
                    <SelectUpdateBrandList data={this.state.upbranddata} />
                  </td>
                </tr>
                <tr>
                  <th>Product Category</th>
                  <td>
                    <SelectUpdateCategoryList data={this.state.upcategorydata} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input
              type="hidden"
              name="upprodkey_cc"
              id="upprodkey_cc"
              onChange={this.handleUpChange}
            />
            <input type="submit" value="Update Product" />
          </form>
        </div>
      </div>
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
          prodbrand_cc={product.dbbrandname}
          prodkey_cc={product.dbproductkey}
          prodcategory_cc={product.dbproductcategoryname}
          prodname_cc={product.dbproductname}
          prodmodel_cc={product.dbproductmodel}
          proddescription_cc={product.dbproductdescription}
          prodcolor_cc={product.dbproductcolor}
          prodprice_cc={product.dbproductprice}
          prodstock_cc={product.dbproductstock}

        ></Product>
      );
    });

    //print all the nodes in the list
    return <tbody>{productNodes}</tbody>;
  },
});

var Product = React.createClass({
  getInitialState: function () {
    return {
      upprodkey_cc: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theupprodkey_cc = this.props.prodkey_cc;

    this.loadSingleProd(theupprodkey_cc);
  },
  loadSingleProd: function (theupprodkey_cc) {
    $.ajax({
      url: "/getsingleprod",
      data: {
        upprodkey_cc: theupprodkey_cc,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        console.log(theupprodkey_cc)
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populateProduct = this.state.singledata.map(function (product) {
          upprodkey_cc.value = theupprodkey_cc;
          upprodname_cc.value = product.dbproductname;
          upprodbrand_cc.value = product.dbproductbrand;
          upprodmodel_cc.value = product.dbproductmodel;
          upproddescription_cc.value = product.dbproductdescription;
          upprodstock_cc.value = product.dbproductstock;
          upprodcolor_cc.value = product.dbproductcolor;
          upprodcat_cc.value = product.dbproductcategory;
          upprodprice_cc.value = product.dbproductprice;

        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  render: function () {
    return (
      <tr>
        <td>{this.props.prodkey_cc}</td>
        <td>{this.props.prodname_cc}</td>
        <td>{this.props.prodcategory_cc}</td>
        <td>{this.props.prodbrand_cc}</td>
        <td>{this.props.prodmodel_cc}</td>
        <td>{this.props.proddescription_cc}</td>
        <td>{this.props.prodcolor_cc}</td>
        <td>${this.props.prodprice_cc}</td>
        <td>{this.props.prodstock_cc}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
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

var SelectUpdateBrandList = React.createClass({
  render: function () {
    var optionNodes = this.props.data.map(function (prodBrand) {
      return (
        <option key={prodBrand.dbbrandkey} value={prodBrand.dbbrandkey}>
          {prodBrand.dbbrandname}
        </option>
      );
    });
    return (
      <select name="upprodbrand_cc" id="upprodbrand_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});
var SelectUpdateCategoryList = React.createClass({
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
      <select name="upprodcat_cc" id="upprodcat_cc">
        <option value=""></option>
        {optionNodes}
      </select>
    );
  },
});

ReactDOM.render(<ProductBox />, document.getElementById("content"));
