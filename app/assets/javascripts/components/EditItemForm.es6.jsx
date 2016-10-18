class EditItemForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    this.setState({name: this.props.item.name})
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleSubmit(event) {
    let { packing_list } = this.props;
    event.preventDefault();
    var itemID = this.props.item.id;
    var name = this.state.name;
    var packing_list_id = packing_list.id;
    var item = { name, packing_list_id };
    var data = { item };
    $.ajax({
      url: "/trips/" + packing_list.trip_id + "/packing_lists/" + packing_list_id + "/items/" + itemID,
      method: "put",
      data:data
    })
    .done(function(response) {
      this.props.onUpdateItems(response);
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))
  }
  render() {
    return(
      <div>
        <form className="item-form" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
