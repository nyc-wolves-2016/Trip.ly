class Itinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      ievents: [],
      event: {},
      editEvent: false
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleEventEditSubmit = this.handleEventEditSubmit.bind(this);
    this.handleEventDelete = this.handleEventDelete.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
  }

  componentDidMount(){
    this.setState({
      ievents: this.props.events
    })
    this.props.onResetErrors();
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
  }

  handleEventDelete(response) {
    this.setState({
      ievents: response
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
      ievents: response
    })
    this.forceUpdate();
  }

  render() {
    let { trip_id, id, name } = this.props.itinerary;
    return(
      <div className="row">
        <h1>Itinerary</h1>
        <ul>
          {this.state.ievents.map((event, i ) =>
          <Event key={i} onEventDelete={this.handleEventDelete} onEventEditClick={this.handleEventEdit} data={event} events={this.state.ievents} itinerary={this.props}/>
          )}
        </ul>
          { this.state.editEvent ? <EditEventForm event={this.state.event} trip={trip_id} onEventEditSubmit={this.handleEventEditSubmit}/> : null }

        <div>
          <input id="event-submit"  className="hollow button" value="Add Event" onClick={this.onButtonClick}/>
        </div>
        <div id="add-list-errors">
          { this.props.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>
          <div id="add-event-form" className="hidden">
            <AddEventForm data={this.props} onEventSubmit={this.handleEventSubmit} onErrors={this.handleNestedErrors} errors={this.props.errors} anyErrors={this.props.anyErrors}/>
          </div>
          <button className="hollow button" onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
