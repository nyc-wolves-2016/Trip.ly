class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleAddNewList = this.handleAddNewList.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
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
    this.props.resource_lists.push(new_list)
    this.forceUpdate();
  }

  handleButtonClick() {
    $("#add-resource-list-form").removeClass("hidden");
    $("#add-resource-list-button").addClass("hidden");
  }

  render() {
    let { resource_lists, trip } = this.props;
    return(
      <div>
        <h1>Resource Lists: </h1>
        <ul>
          {resource_lists.map((list, i) =>
            <li key={i}>
              <a  href={list.id} onClick={this.handleClick}>{list.name}</a>
            </li>
          )}
        </ul>
        <div id="add-resource-list-button">
          <input type="button" value="Add Resource List" onClick={this.handleButtonClick} />
        </div>
        <div id="add-resource-list-form" className="hidden">
          <AddResourceListForm trip={trip} onAddNewList = {this.handleAddNewList}/>
        </div>
      </div>
    )
}
}
