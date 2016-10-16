class ItineraryPreview extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    let { trip } = this.props;
    $.ajax({
      url: "/trips/" + trip.id + "/itineraries"
    }).done(function(response) {
      this.props.onItineraryClick(response);
    }.bind(this));
  }

  render() {
    return(
        <h1 onClick={this.handleClick}>Itinerary</h1>
    )}
}
