class Itinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      ievents: [],
      event: {},
      addEvent: false,
      editEvent: false,
      anyForms: false
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
    this.props.onResetErrors();
    this.props.onResetForm();
  }

  handleNestedForms(response) {
    this.props.onForm(response);
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
  }

  handleEventDelete(response) {
    this.setState({
      ievents: response
    })
    // debugger;
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
    // debugger;
    this.props.onResetErrors();
    this.setState({
      ievents: response,
      addEvent: false,
      anyForms: false
    });
    this.forceUpdate();
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
    // debugger;
    this.props.onResetErrors();
    this.setState({
      editEvent: false,
      ievents: response,
      anyForms: false
    })
    this.forceUpdate();
  }

  render() {
    let { trip_id, id, name } = this.props.itinerary;
    return(
      <div className="row">
        <h1>Itinerary</h1>
          { this.state.anyForms ? null : <ul>
            {this.state.ievents.map((event, i ) =>
            <Event key={i} onEventDelete={this.handleEventDelete} onEventEditClick={this.handleEventEdit} data={event} events={this.state.ievents} itinerary={this.props}/>
            )}
          </ul> }

          { this.state.editEvent ? <EditEventForm event={this.state.event} trip={trip_id} onEventEditSubmit={this.handleEventEditSubmit} onErrors={this.handleNestedErrors} errors={this.props.errors} anyErrors={this.props.anyErrors}/> : null }

        <div id="add-list-errors">
          { this.props.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>

          { this.state.addEvent ? <AddEventForm data={this.props} onEventSubmit={this.handleEventSubmit} onErrors={this.handleNestedErrors} errors={this.props.errors} anyErrors={this.props.anyErrors}/> : <div><input id="event-submit"  className="hollow button" value="Add Event" onClick={this.onButtonClick}/></div> }

          <button className="hollow button" onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
