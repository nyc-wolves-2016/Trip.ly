class AddItemForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var url = "/trips/" + this.props.data.trip_id + "/packing_lists/" + this.props.data.id + "/items";
    var name = this.refs.nameBox.value;
    var packing_list_id = this.props.data.id;
    var item = { name, packing_list_id };
    var data = { item };
    $.ajax({
      url: url,
      method: "post",
      data:data
    })
    .done(function(response) {
      this.props.onItemSubmit(response);
      $(".item-form").trigger("reset");
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))
  }

  render() {
    return(
<<<<<<< HEAD
      <div>
        <form className="item-form" ref="itemForm"  onSubmit={this.handleSubmit}>
          <input type="text" ref="nameBox" name="item[name]" placeholder="Name" />
          <input className="expanded hollow button" type="submit" value="Submit"/>
        </form>
=======
      <div className="row">
        <div className="large-6 column">
          <form className="item-form" ref="itemForm"  onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input className="input-group-field" type="text" ref="nameBox" name="item[name]" placeholder="Name" />
            <div className="input-group-button">
              <button type="submit" value="Submit" className="hollow button">Submit</button>
            </div>
          </div>
          </form>
        </div>
>>>>>>> Style forms
      </div>
    )
  }
}
