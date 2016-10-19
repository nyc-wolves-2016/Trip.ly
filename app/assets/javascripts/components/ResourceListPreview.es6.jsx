class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.state = {
      editResourceListForm: false,
      resource_list: [],
      resource_lists: [],
      addResourceList: false,
      anyErrors: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditList = this.handleEditList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
    this.handleNestedResetHolder = this.handleNestedResetHolder.bind(this);
    this.handleHideForm = this.handleHideForm.bind(this);
  }

  componentDidMount() {
    this.setState({resource_lists: this.props.resource_lists});
  }

  handleNestedResetHolder() {
    this.props.onResetHolder();
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
    this.setState({anyErrors: true});
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
    this.setState( {addResourceList: true });
    this.props.onAddResourcePreviewForm();
  }

  handleListSubmit(lists) {
    this.setState({resource_lists: lists, addResourceList: false, anyErrors: false});
    this.props.onResetHolder();
  }

  handleHideForm() {
    this.setState({addResourceList: false, editResourceListForm: false});
  }

  handleEditList(lists) {
    this.setState({
      resource_lists: lists,
      editResourceListForm: false,
      anyErrors: false
    })
    this.props.onResetHolder();
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
      this.props.onAddResourcePreviewForm();
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
        <div id="add-resource-list-button">
          <input className="hollow button" id="resource-list-submit" type="button" value="Add Resource List" onClick={this.handleAddClick} />
        </div>
        <div id="add-errors">
          { this.state.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>
        <div id="add-resource-list-form">
          { this.state.addResourceList ? <AddResourceListForm trip={trip} onAddNewList={this.handleAddNewList} onErrors={this.handleNestedErrors} onListSubmit={  this.handleListSubmit} onResetHolder={this.handleNestedResetHolder} onHideForm={this.handleHideForm}/> : null }
        </div>
        <div id="edit-resource-list-form" >
          { this.state.editResourceListForm ? <EditResourceListForm resource_list={this.state.resource_list} trip={trip} onEditList = {this.handleEditList} onErrors={this.handleNestedErrors} onResetHolder={this.handleNestedResetHolder} onHideForm={this.handleHideForm}/> : null }
        </div>
        <div id="resource-lists-list">
          <ul>
            {this.props.resource_lists.map((list, i) =>
              <li key={i}>
                <a  href={list.id} onClick={this.handleClick}>{list.name}</a>
                <div className="edit-list-button">
                  <input href={list.id} id="resource-list-submit" type="button" value="Edit List" onClick={this.handleEditClick}/>
                </div>
                <div className="delete-list-button">
                  <input href={list.id} type="button" value="Delete List" onClick={this.handleDelete}/>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
}
}
