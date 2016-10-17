class EditItemForm extends React.Component {
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
      $("#add-item-form").addClass("hidden");
      $("#item-submit").removeClass("hidden");
      $(".item-form").trigger("reset");
    }.bind(this))
  }
  render() {
    return(
      <div>
        <form className="item-form" ref="itemForm"  onSubmit={this.handleSubmit}>
          <input type="text" ref="nameBox" name="item[name]" placeholder="Name" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
