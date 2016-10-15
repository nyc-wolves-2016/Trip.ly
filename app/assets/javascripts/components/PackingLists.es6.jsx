class PackingLists extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    let { trip } = this.props;
    var listID= $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/packing_lists/" + listID
    }).done(function(response) {
      debugger;
      this.props.onListClick(response);
    }.bind(this));
  }

  render() {
    let { packing_lists } = this.props;
    return(
      <div>
        <h1>Packing Lists: </h1>
        <ul>
          {packing_lists.map((list, i) =>
            <li key={i}>
              <a  href={list.id} onClick={this.handleClick}>{list.name}</a>
            </li>
          )}
        </ul>
      </div>
    )
}
}
