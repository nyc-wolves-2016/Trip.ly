class Itinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      event: {},
      editEvent: false
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleEventEditSubmit = this.handleEventEditSubmit.bind(this);
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  onButtonClick() {
    $("#add-event-form").removeClass("hidden");
    $("#event-submit").addClass("hidden");
  }

  handleEventSubmit(response){
    // debugger;
    this.props.events.push(response);
    this.forceUpdate();
  }

  handleEventEdit(response) {
    // debugger;
    // $(".event-edit").addClass("hidden");
    this.setState({
      event: response,
      editEvent: true
    });
  }

  handleEventEditSubmit(response) {
    this.setState({
      editEvent: false
    })
    debugger;
    // this.forceUpdate();
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
    let { trip_id, id, name } = this.props.itinerary;
    return(
      <div>
        <h1>Itinerary blah blah</h1>
        <ul>
          {this.props.events.map((event, i ) =>
          <Event key={i} onEventEditClick={this.handleEventEdit} data={event} itinerary={this.props}/>
          )}
        </ul>
          { this.state.editEvent ? <EditEventForm event={this.state.event} trip={trip_id} onEventEditSubmit={this.handleEventEditSubmit}/> : null }

        <div>
          <input id="event-submit" type="button" value="Add Event" onClick={this.onButtonClick}/>
        </div>
          <div id="add-event-form" className="hidden">
            <AddEventForm data={this.props} onEventSubmit={this.handleEventSubmit}/>
          </div>
          <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
