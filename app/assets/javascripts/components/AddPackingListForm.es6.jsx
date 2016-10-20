class AddPackingListForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  handleReturnClick() {
    this.props.onResetHolder();
    this.props.onHideForm();
    this.props.onDisappearErrors();
  }

  handleSubmit(event) {
    event.preventDefault();
    var url = "/trips/" + this.props.data.trip.id + "/packing_lists";
    var name = this.refs.nameBox.value;
    var trip_id = this.props.data.trip.id
    var list = { name, trip_id };
    var data = { list };
    $.ajax({
      url: url,
      method: "post",
      data: data
    })
    .done(function(response) {
      this.props.onListSubmit(response);
      $(".list-form").trigger("reset");
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))
  }

  render() {
    return(
      <div className="row">
        <div>
          <form className="list-form" ref="listForm"  onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input className="input-group-field" type="text" ref="nameBox" name="list[name]" placeholder="Name" />
              <div className="input-group-button">
                <input className="hollow button" type="submit" value="Submit"/>
              </div>
            </div>
          </form>
        </div>
        <button className="hollow button" onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
  )}
}
