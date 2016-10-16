class PackingLists extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    let { trip } = this.props;
    var listID= $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/packing_lists/" + listID
    }).done(function(response) {
      this.props.onListClick(response);
    }.bind(this));
  }


  onButtonClick() {
    $("#add-list-form").removeClass("hidden");
    $("#list-submit").addClass("hidden");
  }

  handleDelete(id) {
    // this.props.handleDelete(id);
    debugger;
    var url = "/trips/" + this.props.trip.id + "/packing_lists/" + id
    $.ajax({
      url: url,
      method: 'delete',
      data: id
    })
    .done(function() {
      debugger;
      this.forceUpdate();
    }.bind(this));
  }

  handleListSubmit(response){
    this.props.packing_lists.push(response);
    this.forceUpdate();
  }

  render() {
    let { packing_lists } = this.props;
    return(
      <div>
        <h1>Packing Lists: </h1>
        <div>
          <input id="list-submit" type="button" value="Add Packing List" onClick={this.onButtonClick}/>
        </div>
        <div id="add-list-form" className="hidden">
          <AddPackingListForm data={this.props} onListSubmit={this.handleListSubmit}/>
        </div>
        <ul>
          {packing_lists.map((list, i) =>
            <li key={i}>
            <div>
              <input id="edit-item-submit" type="button" value="Edit Item" onClick={this.onButtonClick}/>
            </div>
            <div>
              <input id="delete-item-submit" type="button" value="Delete Item" onClick={this.handleDelete.bind(this, list.id)} data={this.props}/>
            </div>
            <a href={list.id} onClick={this.handleClick}>{list.name}</a>
            </li>
          )}
        </ul>
      </div>
    )
}
}
