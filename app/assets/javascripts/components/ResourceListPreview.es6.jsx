class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleAddNewList = this.handleAddNewList.bind(this);
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
        <div>
          <AddResourceListForm trip={trip} onAddNewList = {this.handleAddNewList}/>
        </div>
      </div>
    )
}
}
