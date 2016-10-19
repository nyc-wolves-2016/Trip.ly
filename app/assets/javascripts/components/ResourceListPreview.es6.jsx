class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.state = {
      editResourceListForm: false,
      resource_list: [],
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
    this.handleDisappearErrors = this.handleDisappearErrors.bind(this);
  }


  handleNestedResetHolder() {
    this.props.onResetHolder();
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
    this.setState({anyErrors: true});
  }

  handleDisappearErrors() {
    this.setState({anyErrors: false})
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
    this.setState({addResourceList: false, anyErrors: false});
    this.props.onNewResourceList(lists);
    this.props.onResetHolder();
  }

  handleHideForm() {
    this.setState({addResourceList: false, editResourceListForm: false});
  }

  handleEditList(lists) {
    this.setState({
      editResourceListForm: false,
      anyErrors: false
    })
    this.props.onNewResourceList(lists);
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
      this.props.onNewResourceList(response);
    }.bind(this));
  }

  render() {
    let { trip } = this.props;
    return(
      <div className="trips-list medium-6 large-6 columns">
        <h1>Resource Lists: </h1>
        <div id="add-resource-list-button">
          <input className="hollow button" id="resource-list-submit" type="button" value="Add Resource List" onClick={this.handleAddClick} />
        </div>
        <div id="add-errors">
          { this.state.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>
        <div id="add-resource-list-form">
          { this.state.addResourceList ? <AddResourceListForm trip={trip} onAddNewList={this.handleAddNewList} onErrors={this.handleNestedErrors} onListSubmit={  this.handleListSubmit} onResetHolder={this.handleNestedResetHolder} onHideForm={this.handleHideForm} onDisappearErrors={this.handleDisappearErrors}/> : null }
        </div>
        <div id="edit-resource-list-form" >
          { this.state.editResourceListForm ? <EditResourceListForm resource_list={this.state.resource_list} trip={trip} onEditList = {this.handleEditList} onErrors={this.handleNestedErrors} onResetHolder={this.handleNestedResetHolder} onHideForm={this.handleHideForm} onDisappearErrors={this.handleDisappearErrors}/> : null }
        </div>
        <div id="resource-lists-list">
          <ul>
            {this.props.resource_lists.map((list, i) =>
              <li key={i}>
                <div className="user-options">
                  <button className="fa fa-pencil-square-o" href={list.id} id="resource-list-submit" type="button" onClick={this.handleEditClick}></button>
                  <button className="fa fa-trash-o" href={list.id} type="button" onClick={this.handleDelete}></button>
                </div>
                <a  href={list.id} onClick={this.handleClick}>{list.name}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
}
}
