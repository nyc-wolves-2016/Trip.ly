class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.state = {
      editResourceListForm: false,
      resource_list: [],
      resource_lists: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAddNewList = this.handleAddNewList.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditList = this.handleEditList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({resource_lists: this.props.resource_lists});
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

  handleAddNewList(new_list){
    this.props.resource_lists.push(new_list);
    this.forceUpdate();
  }

  handleEditList(lists) {
    this.setState({resource_lists: lists})
    this.forceUpdate();
    this.setState({editResourceListForm: false});
  }

  handleButtonClick() {
    $("#add-resource-list-form").removeClass("hidden");
    $("#add-resource-list-button").addClass("hidden");
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
      this.forceUpdate();
    }.bind(this));
  }


  render() {
    let { trip } = this.props;
    let { resource_lists } = this.state;
    return(
      <div>
        <h1>Resource Lists: </h1>
        <div id="edit-resource-list-form" >
          { this.state.editResourceListForm ? <EditResourceListForm resource_list={this.state.resource_list} trip={trip} onEditList = {this.handleEditList}/> : null }
        </div>
        <ul>
          {resource_lists.map((list, i) =>
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
          <input type="button" value="Add Resource List" onClick={this.handleButtonClick} />
        </div>
        <div id="add-resource-list-form" className="hidden">
          <AddResourceListForm trip={trip} onAddNewList={this.handleAddNewList}/>
        </div>
      </div>
    )
}
}
