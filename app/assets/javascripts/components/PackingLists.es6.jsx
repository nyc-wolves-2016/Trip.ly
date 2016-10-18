class PackingLists extends React.Component {
  constructor(){
    super();
    this.state = {
      packing_lists: [],
      packing_list: [],
      editList: false,
      addList: false,
      errors: [],
      anyErrors: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleListUpdateSubmit = this.handleListUpdateSubmit.bind(this);
    this.handleListSubmitErrors = this.handleListSubmitErrors.bind(this);
  }

  componentDidMount() {
    this.setState({
      packing_lists: this.props.packing_lists
    })
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

  handleEditClick(event) {
    event.preventDefault();
    let { trip } = this.props;
    var listID = $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/packing_lists/" + listID
    })
    .done(function(response) {
      this.setState ({
        editList: true,
        packing_list: response[0]
      })
    }.bind(this))
  }

  handleListUpdateSubmit(lists){
    this.setState({
      editList: false,
      packing_lists: lists
    })
  }

  handleAddClick() {
    this.setState({ addList: true })
  }

  handleListSubmit(response){
    this.setState({packing_lists: response, addList: false, anyErrors: false });
  }

  handleListSubmitErrors(errors){
    this.setState({ errors: errors, anyErrors: true })
  }

  handleDelete(id) {
    var url = "/trips/" + this.props.trip.id + "/packing_lists/" + id
    $.ajax({
      url: url,
      method: 'delete',
    })
    .done(function(response) {
      this.setState({packing_lists: response});
    }.bind(this));
  }

  render() {
    let { packing_lists } = this.props;
    return(
      <div>
        <h1>Packing Lists: </h1>
        <div>
          <input id="list-submit" type="button" value="Add Packing List" onClick={this.handleAddClick}/>
        </div>
        <div id="add-list-errors">
          { this.state.anyErrors ? <AddListErrors errors={this.state.errors}/> : null }
        </div>
        <div id="add-list-form">
          { this.state.addList ? <AddPackingListForm data={this.props} onListSubmit={this.handleListSubmit} onListSubmitErrors={this.handleListSubmitErrors}/> : null }
        </div>
        <ul>
        { this.state.editList ? <EditPackingListForm packing_list={this.state.packing_list}  onListUpdateSubmit={this.handleListUpdateSubmit}/> : null }
          {this.state.packing_lists.map((list, i) =>
            <li key={i}>
            <div id="edit-packing-list-form">
              <input href={list.id} id="edit-list-submit" type="button" value="Edit List" onClick={this.handleEditClick} />
            </div>
            <div>
              <input id="delete-list-submit" type="button" value="Delete List" onClick={this.handleDelete.bind(this, list.id, list)} data={this.props}/>
            </div>
            <a href={list.id} onClick={this.handleClick}>{list.name}</a>
            </li>
          )}
        </ul>
      </div>
    )
}
}
