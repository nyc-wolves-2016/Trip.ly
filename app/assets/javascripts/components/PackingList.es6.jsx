class PackingList extends React.Component {
  constructor() {
    super();
    this.state = {
      editItemForm: false,
      item: {},
      plitems: [],
      addItemForm: false,
      anyErrors: false
    }
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleUpdateItems = this.handleUpdateItems.bind(this);
    this.handleItemComplete = this.handleItemComplete.bind(this);
    this.handleAddItemClick = this.handleAddItemClick.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this)
  }

  componentDidMount() {
    this.setState({plitems: this.props.items})
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
    this.setState({anyErrors: true})
  }

  handleItemComplete(event) {
    event.preventDefault();
    var url = $(event.target).attr('href');
    $.ajax({
      url: url,
      method: "put"
    })
    .done(function(response){
      this.setState({
        plitems: response
      })
    }.bind(this))
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  handleAddItemClick(){
    this.setState({addItemForm: true})
    $("#items-list").addClass('hidden')
  }

  handleItemSubmit(items){
    this.setState({
      plitems: items,
      addItemForm: false,
      anyErrors: false
    })
    $("#items-list").removeClass('hidden')
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
      $("#items-list").addClass('hidden')
    }.bind(this))
  }

  handleUpdateItems(items) {
    this.setState({
      plitems: items,
      editItemForm: false,
      anyErrors: false
    });
    $("#items-list").removeClass('hidden')
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
    }.bind(this));
  }

  render(){
    let { name } = this.props.list;
    return(
      <div>
        <h1>Packing List Name: {name}</h1>
        <div>
          <input className="hollow button" id="item-submit" type="button" value="Add Item" onClick={this.handleAddItemClick}/>
        </div>
        <div id="add-errors">
          { this.state.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>
        <div className="hollow button" id="add-item-form" >
          { this.state.addItemForm ? <AddItemForm data={this.props.list} onItemSubmit={this.handleItemSubmit} onErrors={this.handleNestedErrors}/> : null }
        </div>
        <div id="edit-item-form">
          { this.state.editItemForm ? <EditItemForm packing_list={this.props.list} item={this.state.item} onUpdateItems={this.handleUpdateItems} onErrors={this.handleNestedErrors}/> : null }
        </div>
        <div id="items-list">
          <ul>
            {this.state.plitems.map((item, i) =>
            <li key={i}>
              { !item.packed ? <div><a id="edit-item-submit" href={"/trips/" + this.props.list.trip_id + "/packing_lists/" + this.props.list.id + "/items/" + item.id + "/complete"} onClick={this.handleItemComplete}>Complete Item</a></div> : null }
              <div>
                <input href={item.id} id="edit-item-submit" type="button" value="Edit Item" onClick={this.handleEditItem}/>
              </div>
              <div>
                <input id="delete-item-submit" type="button" value="Delete Item" onClick={this.handleDelete.bind(this, item.id, item)} />
              </div>
              <span style={{"textDecoration": item.packed ? "line-through" : ""}}>{item.name}</span>
            </li>
          )}
          </ul>
        </div>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
