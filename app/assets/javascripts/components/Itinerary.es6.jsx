class Itinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      event: {},
      editEvent: false
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleEventEditSubmit = this.handleEventEditSubmit.bind(this);
    this.handleEventDelete = this.handleEventDelete.bind(this);
  }

  componentDidMount(){
    this.setState({
      events: this.props.events
    })
  }

  handleEventDelete(response) {
    this.setState({
      events: response
    })
    debugger;
    this.forceUpdate();
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
    this.setState({
      event: response,
      editEvent: true
    });
  }

  handleEventEditSubmit(response) {
    // debugger;
    this.setState({
      editEvent: false,
      events: response
    })
    this.forceUpdate();
  }

  render() {
    let { trip_id, id, name } = this.props.itinerary;
    return(
      <div>
        <h1>Itinerary blah blah</h1>
        <ul>
          {this.state.events.map((event, i ) =>
          <Event key={i} onEventDelete={this.handleEventDelete} onEventEditClick={this.handleEventEdit} data={event} events={this.state.events} itinerary={this.props}/>
          )}
        </ul>
          { this.state.editEvent ? <EditEventForm event={this.state.event} trip={trip_id} onEventEditSubmit={this.handleEventEditSubmit}/> : null }

        <div>
          <input id="event-submit" className="expanded button" value="Add Event" onClick={this.onButtonClick}/>
        </div>
          <div id="add-event-form" className="hidden">
            <AddEventForm data={this.props} onEventSubmit={this.handleEventSubmit}/>
          </div>
          <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
