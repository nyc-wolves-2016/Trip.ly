class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.state = {
      editResourceListForm: false,
      resource_list: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAddNewList = this.handleAddNewList.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);

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
      console.log(this.state);
    }.bind(this));
  }


  render() {
    let { resource_lists, trip } = this.props;
    return(
      <div>
        <h1>Resource Lists: </h1>
        <div id="edit-resource-list-form" >
          { this.state.editResourceListForm ? <EditResourceListForm list={this.state.resource_list}/> : null }
        </div>
        <ul>
          {resource_lists.map((list, i) =>
            <li key={i}>
              <a  href={list.id} onClick={this.handleClick}>{list.name}</a>
              <div className="edit-list-button">
                <input href={list.id} type="button" value="Edit List" onClick={this.handleEditClick}/>
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
