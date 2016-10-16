class Event extends React.Component {
  constructor() {
    super();
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    // this.handleEventEdit = this.handleEventEdit.bind(this);
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

  render() {
    let { name, location, details, contact_info, date, start_time, end_time, id } = this.props.data;
    // debugger;
    // TRY MOVING THE FORM/BUTTON NEXT TO THE EVENT COMPONENT IN ITINERARY
    return(
      <div>
        <div>
          <a className="event-edit" href={"/trips/" + this.props.itinerary.itinerary.trip_id + "/itineraries/" + this.props.itinerary.itinerary.id + "/events/" + id } onClick={this.handleEditButtonClick}>Edit Event</a>
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
