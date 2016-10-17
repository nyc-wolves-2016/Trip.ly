class PackingList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  componentDidMount() {
    this.setState({items: this.props.items})
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  onButtonClick() {
    $("#add-item-form").removeClass("hidden");
    $("#item-submit").addClass("hidden");
  }

  handleItemSubmit(response){
    this.state.items.push(response);
    this.forceUpdate();
  }

  handleDelete(id) {
    var url = "/trips/" + this.props.list.trip_id + "/packing_lists/" + this.props.list.id + "/items/" + id
    $.ajax({
      url: url,
      method: 'delete',
      data: id
    })
    .done(function(response) {
      this.setState({items: response});
      this.handleItemDelete(response);
    }.bind(this));
  }

  handleItemDelete(response) {
    this.forceUpdate();
  }

  render(){
    let { name } = this.props.list;
    return(
      <div>
        <h1>Packing List Name: {name}</h1>
        <div>
          <input id="item-submit" type="button" value="Add Item" onClick={this.onButtonClick}/>
        </div>
        <div id="add-item-form" className="hidden">
          <AddItemForm data={this.props.list} onItemSubmit={this.handleItemSubmit}/>
        </div>
        <ul>
          {this.state.items.map((item, i) =>
          <li key={i}>
          <div>
            <input id="edit-item-submit" type="button" value="Complete Item" onClick={this.onButtonClick}/>
          </div>
          <div>
            <input id="edit-item-submit" type="button" value="Edit Item" onClick={this.onButtonClick}/>
          </div>
          <div>
            <input id="delete-item-submit" type="button" value="Delete Item" onClick={this.handleDelete.bind(this, item.id, item)} data={this.props}/>
          </div> {item.name} </li>) }
        </ul>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
