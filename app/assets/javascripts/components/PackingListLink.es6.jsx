class PackingListLink extends React.Component {
  constructor(){
    super();
    this.state = {items: [], showComponent: false};
    this.handleClickListLink = this.handleClickListLink.bind(this);
  }

  handleClickListLink(event){
    event.preventDefault();
    let { trip_id, id } = this.props.list;
    $.ajax({
      url: "/trips/" + trip_id + "/packing_lists/" + id
    }).done(function(response){
      this.setState({ items: response, showComponent: true })
      debugger;
    }.bind(this));
  }

  render() {
    let { name } = this.props.list;
    return(
      <div>
      <p><a href="#" onClick={this.handleClickListLink}>{name}</a></p>
      { this.state.showComponent ? <PackingList list={this.props.list} items={this.state.items}/> : null }
      </div>
    )
  }
}
