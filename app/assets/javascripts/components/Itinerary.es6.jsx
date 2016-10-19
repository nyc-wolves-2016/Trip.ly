class Itinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      ievents: [],
      event: {},
      addEvent: false,
      anyForms: false,
      editEvent: false,
      anyErrors: false
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
    this.handleEventEditSubmit = this.handleEventEditSubmit.bind(this);
    this.handleEventDelete = this.handleEventDelete.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
    this.handleNestedForms = this.handleNestedForms.bind(this);
  }

  componentDidMount(){
    this.setState({
      ievents: this.props.events
    })
    this.props.onResetForm();
  }

  handleNestedForms(response) {
    this.props.onForm(response);
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
    this.setState({anyErrors: true});
  }

  handleEventDelete(response) {
    this.setState({
      ievents: response
    })
    this.forceUpdate();
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  onButtonClick() {
    this.setState({
      addEvent: true,
      anyForms: true
    })
  }

  handleEventSubmit(response){
    this.setState({
      ievents: response,
      addEvent: false,
      anyForms: false
    });
    this.props.events.push(response);
    this.forceUpdate();
    this.setState({anyErrors: false});
  }

  handleEventEdit(response) {
    // debugger;
    this.setState({
      event: response,
      editEvent: true,
      anyForms: true
    });
  }

  handleEventEditSubmit(response) {
    this.setState({
      editEvent: false,
      ievents: response,
      anyForms: false,
      anyErrors: false
    })
    this.forceUpdate();
  }

  render() {
    let { trip_id, id, name } = this.props.itinerary;
    return(
      <div className="row">
        <div className="large-8 column large-centered">
          <h5>Itinerary</h5>

          <div id="add-errors">
            { this.state.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
          </div>

            { this.state.addEvent ? <AddEventForm data={this.props} onEventSubmit={this.handleEventSubmit} onErrors={this.handleNestedErrors} errors={this.props.errors} anyErrors={this.props.anyErrors}/> : <div><button id="event-submit"  className="hollow button" onClick={this.onButtonClick}>Add Event</button></div> }
            { this.state.anyForms ? null : <ul id="timeline">
              {this.state.ievents.map((event, i ) =>
              <Event key={i} onEventDelete={this.handleEventDelete} onEventEditClick={this.handleEventEdit} data={event} events={this.state.ievents} itinerary={this.props}/>
              )}
            </ul> }

            { this.state.editEvent ? <EditEventForm event={this.state.event} trip={trip_id} onEventEditSubmit={this.handleEventEditSubmit} onErrors={this.handleNestedErrors} errors={this.props.errors} anyErrors={this.props.anyErrors}/> : null }



              <button className="hollow button" onClick={this.handleReturnClick}>Return To Trip</button>
        </div>
      </div>
    )
  }
}
