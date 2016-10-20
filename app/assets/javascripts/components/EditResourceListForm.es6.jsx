class EditResourceListForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
    this.handleUpdateList = this.handleUpdateList.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  componentDidMount(){
    this.setState({name: this.props.resource_list.name})
  }

  handleReturnClick() {
    this.props.onResetHolder();
    this.props.onHideForm();
    this.props.onDisappearErrors();
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleUpdateList(event) {
    let { resource_list, trip } = this.props;
    event.preventDefault();
    var name = this.state.name;
    var trip_id = trip.id;
    var list = { name, trip_id };
    var data = { list };
    $.ajax({
      url: "/trips/" + trip.id + "/resource_lists/" + resource_list.id ,
      method: "put",
      data: data
    })
    .done(function(response) {
      this.props.onEditList(response);
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))
  }

  render() {
    return(
      <div className="row">
        <form className="edit-resource-list-form" onSubmit={this.handleUpdateList}>
          <div className="input-group">
            <input className="input-group-field" type="text" name="name" value={this.state.name} placeholder="Name" onChange={this.handleNameChange} />
            <div className="input-group-button">
              <button className="hollow button" type="submit" value="Submit">Update</button>
            </div>
          </div>
        </form>
        <button className="hollow button" onClick={this.handleReturnClick}>Return To Trip</button>

      </div>
    )
  }
}
