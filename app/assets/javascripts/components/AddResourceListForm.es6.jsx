class AddResourceListForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNewListSubmit = this.handleNewListSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleNewListSubmit(event) {
    event.preventDefault();
    let { trip } = this.props;
    var name = this.state.name;
    var trip_id = trip.id
    var list = { name, trip_id }
    var data = { list }
    $.ajax({
      url: "/trips/" + trip.id + "/resource_lists",
      method: "post",
      data: data
    })
    .done(function(response) {
      this.props.onAddNewList(response);
    }.bind(this));
  }

  render() {
    return(
      <div>
        <h3>Add a resource list:</h3>
        <form className="resource-list-form" onSubmit={this.handleNewListSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={this.handleNameChange} />
        <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }

}
