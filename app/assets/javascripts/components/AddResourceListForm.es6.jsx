class AddResourceListForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNewListSubmit = this.handleNewListSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  handleReturnClick() {
    this.props.onResetHolder();
    this.props.onHideForm();
    this.props.onDisappearErrors();
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleNewListSubmit(event) {
    event.preventDefault();
    let { trip } = this.props;
    var name = this.state.name;
    var trip_id = trip.id;
    var list = { name, trip_id };
    var data = { list };
    $.ajax({
      url: "/trips/" + trip.id + "/resource_lists",
      method: "post",
      data: data
    })
    .done(function(response) {
      this.props.onListSubmit(response);
      $(".resource-list-form").trigger("reset");
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))
  }

  render() {
    return(
        <div className="row">
          <form className="resource-list-form" onSubmit={this.handleNewListSubmit}>
          <label for="name">Name
            <input type="text" name="name" placeholder="Name" onChange={this.handleNameChange} />
          </label>
          <button className="hollow button" type="submit" value="Submit">Submit</button>
          </form>

        <button className="hollow button" onClick={this.handleReturnClick}>Return To Trip</button>
        </div>
    )
  }

}
