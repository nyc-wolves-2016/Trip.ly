class AddEventForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkGoogleStatus = this.checkGoogleStatus.bind(this)
    this.addToCalendar = this.addToCalendar.bind()
  }

  checkGoogleStatus() {
    $.ajax({
      url: "/users/google"
    })
    .done(function(response){
      return response
    }.bind(this))
  };

  addToCalendar() {
    debugger;
    var url = "https://www.googleapis.com/calendar/v3/calendars/calendarId/events"
    var data = {
       "end": {
        "date": "2016-10-21"
       },
       "start": {
        "date": "2016-10-21"
       },
       "summary": "Graduation",
       "location": "dbc"
      }
    $.ajax({
      url: url,
      method: "post",
      data: data
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    var status = this.checkGoogleStatus();
    if (status) {
      this.addToCalendar();
    }
    var url = "/trips/" + this.props.data.itinerary.trip_id + "/itineraries/" + this.props.data.itinerary.id +"/events"
    var name = this.refs.nameBox.value;
    var location = this.refs.locationBox.value;
    var details = this.refs.detailsBox.value;
    var contact_info = this.refs.contactInfoBox.value;
    var date = this.refs.dateBox.value;
    var start_time = this.refs.startTimeBox.value;
    var end_time = this.refs.endTimeBox.value;
    var itinerary_id = this.props.data.itinerary.id
    var event = { name, location, details, contact_info, date, start_time, end_time, itinerary_id };
    var data = { event }
    $.ajax({
      url: url,
      method: "post",
      data: data
    })
    .done(function(response) {
      this.props.onEventSubmit(response);
      // $("#add-event-form").addClass("hidden");
      // $("#event-submit").removeClass("hidden");
      $(".event-form").trigger("reset");

    }.bind(this))

  }

  render() {

    return(
      <div>
        <form className="event-form" ref="eventForm"  onSubmit={this.handleSubmit}>
          <input type="text" ref="nameBox" name="event[name]" placeholder="Name" />
          <input type="text" ref="locationBox" name="event[location]" placeholder="Location" />
          <input type="text" ref="detailsBox" name="event[details]" placeholder="Details" />
          <input type="text" ref="contactInfoBox" name="event[contact_info]" placeholder="Contact Information" />
          <input type="date" ref="dateBox" name="event[date]" placeholder="Date" />
          <input type="time" ref="startTimeBox" name="event[start_time]" placeholder="Start Time" />
          <input type="time" ref="endTimeBox" name="event[end_time]" placeholder="End Time" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
