class EditPackingListForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    var url = "/trips/" + trip.id + "/packing_lists";
    var name = this.refs.nameBox.value;
    var list = { name, trip_id };
    var data = { list };
    $.ajax({
      url: url,
      method: "put",
      data: data
    })
    .done(function(response) {
      this.props.onListSubmit(response);
    }.bind(this))
  }
  render() {
    let { name } = this.props
    return(
      <div>
        <form className="list-form" ref="listForm"  onSubmit={this.handleSubmit}>
          <input type="text" ref="nameBox" value={ name } name="list[name]" placeholder="Name" />
          <input type="submit" value="Update"/>
        </form>
      </div>
  )}
}
