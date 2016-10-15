class ResourceListPreview extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    let { trip } = this.props;
    var listID= $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/resource_lists/" + listID
    }).done(function(response) {
      this.props.onResourceListClick(response);
      debugger;
    }.bind(this));
  }

  render() {
    let { resource_lists } = this.props;
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
      </div>
    )
}
}
