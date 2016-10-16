class PackingLists extends React.Component {
  constructor(){
    super();
    this.state = {
      packing_lists: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
  }

  componentDidMount() {
    this.setState({packing_lists: this.props.packing_lists})
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
    var url = "/trips/" + this.props.trip.id + "/packing_lists/" + id
    $.ajax({
      url: url,
      method: 'delete',
      data: id
    })
    .done(function(response) {
      this.setState({packing_lists: response});
      this.handleListDelete(response);
    }.bind(this));
  }

  handleListDelete(response) {
    return this.state;
    this.forceUpdate();
  }

  handleListSubmit(response){
    this.state.packing_lists.push(response);
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
          {this.state.packing_lists.map((list, i) =>
            <li key={i}>
            <div>
              <input id="edit-item-submit" type="button" value="Edit List" onClick={this.onButtonClick}/>
            </div>
            <div>
              <input id="delete-item-submit" type="button" value="Delete List" onClick={this.handleDelete.bind(this, list.id, list)} data={this.props}/>
            </div>
            <a href={list.id} onClick={this.handleClick}>{list.name}</a>
            </li>
          )}
        </ul>
      </div>
    )
}
}
