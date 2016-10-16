class Itinerary extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  onButtonClick() {
    this.setState({
      showForm: true,
    });
  }

  handleEventSubmit(response){
    this.state.events.push(response);
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
          <input type="button" value="Add Event" onClick={this.onButtonClick}/>
          {this.state.showForm ?
            <AddEventForm data={this.props.data} onEventSubmit={this.handleEventSubmit}/> :
            null
          }
        </div>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
