class Itinerary extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   showForm: false
    // };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  onButtonClick() {
    $("#add-event-form").removeClass("hidden");
    $("#event-submit").addClass("hidden");
  }

  handleEventSubmit(response){
    this.props.events.push(response);
    this.forceUpdate();
  }

  // componentDidMount(){
    // let { trip_id, id } = this.props.itinerary;
    // $.ajax({
    //   url: "/trips/" + this.props.data.trip_id + "/itineraries/" + this.props.data.id
    // }).done(function(response) {
    //   this.setState({events: response })
    // }.bind(this));
  // }
  render() {
    // let { trip_id, id, name } = this.props.itinerary;
    return(
      <div>
        <h1>Itinerary blah blah</h1>
        <ul>
          {this.props.events.map((event, i ) =>
          <Event key={i} data={event}/>
          )}
        </ul>
        <div>
          <input id="event-submit" type="button" value="Add Event" onClick={this.onButtonClick}/>
        </div>
          <div id="add-event-form" className="hidden">
            <AddEventForm data={this.props} onEventSubmit={this.handleEventSubmit}/> :
            <button onClick={this.handleReturnClick}>Return To Trip</button>
          </div>
      </div>
    )
  }
}
