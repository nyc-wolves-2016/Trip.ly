class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    }
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);

  }

  componentDidMount() {
    // debugger;
    this.setState({
      events: this.props.events
    })
    // debugger;
  }

  handleEditButtonClick(event) {
    event.preventDefault();
    var url = $(event.target).attr('href');
    $.ajax({
      url: url
    })
    .done(function(response) {
      this.props.onEventEditClick(response);
    }.bind(this))

  }

  handleDeleteButtonClick(event) {
    event.preventDefault();
    // debugger;
    var url = $(event.target).attr('href');
    var event = this.props.data
    $.ajax({
      url: url,
      method: "delete",
      data: event
    })
    .done(function(response){
      // debugger;
      // this.props.handleEventDelete(response);
      this.props.onEventDelete(response);
      // debugger;
      // this.forceUpdate();
    }.bind(this))
  }

  // handleDelete(response){
  //   this.setState({
  //     events: response
  //   });
  //   // debugger;
  //   this.forceUpdate();
  // }

  render() {
    let { name, location, details, contact_info, date, start_time, end_time, id } = this.props.data;
    // TRY MOVING THE FORM/BUTTON NEXT TO THE EVENT COMPONENT IN ITINERARY
    return(
      <div>
        <div>
          <a className="event-edit" href={"/trips/" + this.props.itinerary.itinerary.trip_id + "/itineraries/" + this.props.itinerary.itinerary.id + "/events/" + id } onClick={this.handleEditButtonClick}>Edit Event</a>
          <a className="event-delete" href={"/trips/" + this.props.itinerary.itinerary.trip_id + "/itineraries/" + this.props.itinerary.itinerary.id + "/events/" + id } onClick={this.handleDeleteButtonClick}>Delete Event</a>
        </div>

          <li>
            <p>Name: {name}</p>
            <ul>
              <li>
                Date: {date}
              </li>
              <li>
                Details: {details}
              </li>
              <li>
                Start Time: {start_time}
              </li>
            </ul>
          </li>
      </div>
    )
  }
}
