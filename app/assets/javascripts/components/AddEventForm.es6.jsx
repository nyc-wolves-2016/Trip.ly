class AddEventForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
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
      $("#add-event-form").addClass("hidden");
      $("#event-submit").removeClass("hidden");
      $(".event-form").trigger("reset");
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))

  }

  render() {

    return(
      <div>
        <fieldset className="event-form fieldset" ref="eventForm"  >
          <legend>Add an Event</legend>
          <input type="text" ref="nameBox" name="event[name]" placeholder="Name" />
          <input type="text" ref="locationBox" name="event[location]" placeholder="Location" />
          <input type="text" ref="detailsBox" name="event[details]" placeholder="Details" />
          <input type="text" ref="contactInfoBox" name="event[contact_info]" placeholder="Contact Information" />
          <input type="date" ref="dateBox" name="event[date]" placeholder="Date" />
          <input type="time" ref="startTimeBox" name="event[start_time]" placeholder="Start Time" />
          <input type="time" ref="endTimeBox" name="event[end_time]" placeholder="End Time" />
          <input className="expanded button" type="submit" value="Submit" onClick={this.handleSubmit}/>
        </fieldset>
      </div>
    )
  }
}
