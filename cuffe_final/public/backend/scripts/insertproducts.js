var ProductBox = React.createClass({
  getInitialState: function () {
    return { data: [], viewthepage: 0 };
  },
  handleProductSubmit: function (product) {
    $.ajax({
      url: "/product",
      dataType: "/json",
      type: "POST",
      data: product,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, error.toString());
      }.bind(this),
    });
    alert("Record inserted.")
  },
  loadAllowLogin: function () {
    $.ajax({
      url: "/usergetloggedin",
      dataType: "json",
      cache: false,
      success: function (datalog) {
        this.setState({ data: datalog });
        this.setState({ viewthepage: this.state.data[0].dbusercategory });
        console.log("Logged in:" + this.state.viewthepage);
        if (this.state.viewthepage != 1) {
          alert("No access.");
          window.location.replace("home.html");
        }
        else {
          
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function () {
    this.loadAllowLogin();
  },
  render: function () {
    return (
      <div className="ProductBox">
        <h1>Products</h1>
        <Productform2 onProductSubmit={this.handleProductSubmit} />
      </div>
    );
  },
});

var Productform2 = React.createClass({
  getInitialState: function () {
    return {
      productid_cc: "",
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
    var productbrand_cc = prodbrand.value;
    var productcategory_cc = prodcat.value;

    if (isNaN(productstock_cc)) {
      console.log("Not a number " + employeesalary);
      return;
    }
    this.props.onProductSubmit({
      productname_cc: productname_cc,
      productdescription_cc: productdescription_cc,
      productmodel_cc: productmodel_cc,
      productcolor_cc: productcolor_cc,
      productprice_cc: productprice_cc,
      productstock_cc: productstock_cc,
      productbrand_cc: productbrand_cc,
      productcategory_cc: productcategory_cc,
    });
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
      <form className="ProductForm" onSubmit={this.handleSubmit}>
        <h2>Products</h2>
        <table>
          <tbody>
            <tr>
              <th>Product Name</th>
              <td>
                <TextInput
                  value={this.state.productname_cc}
                  uniqueName="productname_cc"
                  textArea={false}
                  required={true}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "productname_cc")}
                  errorMessage="Product name is invalid"
                  emptyMessage="Product name is required"
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
              <th>Product Model</th>
              <td>
                <TextInput
                  value={this.state.productmodel_cc}
                  uniqueName="productmodel_cc"
                  textArea={false}
                  required={false}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "productmodel_cc")}
                  errorMessage="Product model is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Product Description</th>
              <td>
                <TextInput
                  value={this.state.productdescription_cc}
                  uniqueName="productdescription_cc"
                  textArea={false}
                  required={false}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "productdescription_cc")}
                  errorMessage="Product description is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Product Color</th>
              <td>
                <TextInput
                  value={this.state.productcolor_cc}
                  uniqueName="productcolor_cc"
                  textArea={false}
                  required={false}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "productcolor_cc")}
                  errorMessage="Product color is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Product Category</th>
              <td>
                <SelectCategoryList data={this.state.categorydata} />
              </td>
            </tr>
            <tr>
              <th>Product Price</th>
              <td>
                <TextInput
                  value={this.state.productprice_cc}
                  uniqueName="productprice_cc"
                  textArea={false}
                  required={false}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "productprice_cc")}
                  errorMessage="Product price is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Product Stock</th>
              <td>
                <TextInput
                  value={this.state.productstock_cc}
                  uniqueName="productstock_cc"
                  textArea={false}
                  required={false}
                  minCharacters={1}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "productstock_cc")}
                  errorMessage="Product stock is invalid"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Insert Product" />
      </form>
    );
  },
});

var InputError = React.createClass({
  getInitialState: function () {
    return {
      message: "Input is invalid",
    };
  },
  render: function () {
    var errorClass = classNames(this.props.className, {
      error_container: true,
      visible: this.props.visible,
      invisible: !this.props.visible,
    });

    return <td> {this.props.errorMessage} </td>;
  },
});

var TextInput = React.createClass({
  getInitialState: function () {
    return {
      isEmpty: true,
      value: null,
      valid: false,
      errorMessage: "",
      errorVisible: false,
    };
  },

  handleChange: function (event) {
    this.validation(event.target.value);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  validation: function (value, valid) {
    if (typeof valid === "undefined") {
      valid = true;
    }

    var message = "";
    var errorVisible = false;

    if (!valid) {
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    } else if (this.props.required && jQuery.isEmptyObject(value)) {
      message = this.props.emptyMessage;
      valid = false;
      errorVisible = true;
    } else if (value.length < this.props.minCharacters) {
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    }

    this.setState({
      value: value,
      isEmpty: jQuery.isEmptyObject(value),
      valid: valid,
      errorMessage: message,
      errorVisible: errorVisible,
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
            className={"input input-" + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage}
          />
        </div>
      );
    } else {
      return (
        <div className={this.props.uniqueName}>
          <input
            type={this.props.inputType}
            name={this.props.uniqueName}
            id={this.props.uniqueName}
            placeholder={this.props.text}
            className={"input input-" + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage}
          />
        </div>
      );
    }
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
      <select name="prodbrand" id="prodbrand">
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
          <option key={prodCategory.dbproductcategorykey} value={prodCategory.dbproductcategorykey}>
            {prodCategory.dbproductcategoryname}
          </option>
        );
      });
      return (
        <select name="prodcat" id="prodcat">
          <option value=""></option>
          {optionNodes}
        </select>
      );
    },
  });


ReactDOM.render(<ProductBox />, document.getElementById("content"));
