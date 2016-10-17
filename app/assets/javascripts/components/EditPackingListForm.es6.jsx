class EditPackingListForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    this.setState({name: this.props.packing_list.name})
  }

  handleNameChange(event) {
    this.setState({name: event.target.value })
  }

  handleSubmit(event) {
    let { packing_list } = this.props;
    event.preventDefault();
    var url = "/trips/" + packing_list.trip_id + "/packing_lists/" + packing_list.id;
    var name = this.state.name
    var trip_id = packing_list.trip_id
    var list = { name, trip_id };
    var data = { list };
    $.ajax({
      url: url,
      method: "put",
      data: data
    })
    .done(function(response) {
      this.props.onListUpdateSubmit(response);
    }.bind(this))
  }
  render() {
    let { name } = this.props
    return(
      <div>
        <form className="list-form" ref="listForm"  onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.name} name="name" placeholder="Name" onChange={this.handleNameChange}/>
          <input type="submit" value="Update"/>
        </form>
      </div>
  )}
}
