class PackingList extends React.Component {
  constructor() {
    super();
    this.state = {
      editItemForm: false,
      item: {},
      plitems: []
    }
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleUpdateItems = this.handleUpdateItems.bind(this);
  }

  componentDidMount() {
    this.setState({plitems: this.props.items})
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  onButtonClick() {
    $("#add-item-form").removeClass("hidden");
    $("#item-submit").addClass("hidden");
  }

  handleItemSubmit(response){
    this.state.plitems.push(response);
    this.forceUpdate();
  }

  handleEditItem(event) {
    event.preventDefault();
    let { list } = this.props;
    var itemID = $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + list.trip_id + "/packing_lists/" + list.id + "/items/" + itemID
    }).done(function(response) {
      this.setState({ editItemForm: true,
                      item: response
                    })
    }.bind(this))
  }

  handleUpdateItems(items) {
    this.setState({
      plitems: items,
      editItemForm: false
    });
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
      this.setState({plitems: response});
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
        <div id="edit-item-form">
          { this.state.editItemForm ? <EditItemForm packing_list={this.props.list} item={this.state.item} onUpdateItems={this.handleUpdateItems}/> : null }
        </div>
        <ul>
          {this.state.plitems.map((item, i) =>
          <li key={i}>
          <div>
            <input id="edit-item-submit" type="button" value="Complete Item" />
          </div>
          <div>
            <input href={item.id} id="edit-item-submit" type="button" value="Edit Item" onClick={this.handleEditItem}/>
          </div>
          <div>
            <input id="delete-item-submit" type="button" value="Delete Item" onClick={this.handleDelete.bind(this, item.id, item)} />
          </div> {item.name} </li>) }
        </ul>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
