class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.state = {
      editResourceListForm: false,
      resource_list: [],
      resource_lists: [],
      addResourceList: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditList = this.handleEditList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
  }

  componentDidMount() {
    this.setState({resource_lists: this.props.resource_lists});
    this.props.onResetErrors();
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
  }

  handleClick(event){
    event.preventDefault();
    let { trip } = this.props;
    var listID= $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/resource_lists/" + listID
    }).done(function(response) {
      this.props.onResourceListClick(response);
    }.bind(this));
  }

  handleAddClick() {
    this.setState( {addResourceList: true })
  }

  handleListSubmit(lists) {
    this.setState({resource_lists: lists, addResourceList: false});
    this.props.onResetErrors();
  }

  handleEditList(lists) {
    this.setState({
      resource_lists: lists,
      editResourceListForm: false
    })
  }

  handleEditClick(event) {
    event.preventDefault();
    let { trip } = this.props;
    var listID= $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/resource_lists/" + listID
    }).done(function(response) {
      this.setState({
        editResourceListForm: true,
        resource_list: response[0]
      });
    }.bind(this));
  }

  handleDelete(event) {
    event.preventDefault();
    let { trip } = this.props;
    var listID = $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/resource_lists/" + listID,
      method: "delete"
    })
    .done(function(response) {
      this.setState({ resource_lists: response });
    }.bind(this));
  }

  render() {
    let { trip } = this.props;
    return(
      <div>
        <h1>Resource Lists: </h1>
        <div id="edit-resource-list-form" >
          { this.state.editResourceListForm ? <EditResourceListForm resource_list={this.state.resource_list} trip={trip} onEditList = {this.handleEditList}/> : null }
        </div>
        <ul>
          {this.state.resource_lists.map((list, i) =>
            <li key={i}>
              <a  href={list.id} onClick={this.handleClick}>{list.name}</a>
              <div className="edit-list-button">
                <input href={list.id} type="button" value="Edit List" onClick={this.handleEditClick}/>
              </div>
              <div className="delete-list-button">
                <input href={list.id} type="button" value="Delete List" onClick={this.handleDelete}/>
              </div>
            </li>
          )}
        </ul>
        <div id="add-resource-list-button">
          <input className="hollow button" type="button" value="Add Resource List" onClick={this.handleAddClick} />
        </div>
        <div id="add-errors">
          { this.props.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>
        <div id="add-resource-list-form">
          { this.state.addResourceList ? <AddResourceListForm trip={trip} onAddNewList={this.handleAddNewList} onErrors={this.handleNestedErrors} onListSubmit={  this.handleListSubmit}/> : null }
        </div>
      </div>
    )
}
}
