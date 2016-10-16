class EditEventForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    // debugger;
    event.preventDefault();
    var url = "/trips/" + this.props.trip_id + "/itineraries/" + this.props.event.itinerary_id +"/events/" + this.props.event.id
    var name = this.refs.nameBox.value;
    var location = this.refs.locationBox.value;
    var details = this.refs.detailsBox.value;
    var contact_info = this.refs.contactInfoBox.value;
    var date = this.refs.dateBox.value;
    var start_time = this.refs.startTimeBox.value;
    var end_time = this.refs.endTimeBox.value;
    var itinerary_id = this.props.event.itinerary_id
    var event = { name, location, details, contact_info, date, start_time, end_time, itinerary_id };
    var data = { event }
    $.ajax({
      url: url,
      method: "put",
      data: data
    })
    .done(function(response) {
      this.props.onEventEditSubmit(response);
      // $("#edit-event-form").addClass("hidden");
      // $(".event-edit").removeClass("hidden");
      // $(".edit-event-form").trigger("reset");
    }.bind(this))
  }
  render() {

    let { name, location, details, contact_info, date, start_time, end_time } = this.props.event;
    // debugger;

    return (
      <div>
          <form className="edit-event-form" ref="editEventForm" onSubmit={this.handleSubmit}>
          <input type="text" ref="nameBox" name="event[name]" defaultValue={name} placeholder="Name" />
          <input type="text" ref="locationBox" name="event[location]" defaultValue={location} placeholder="Location" />
          <input type="text" ref="detailsBox" name="event[details]" defaultValue={details} placeholder="Details" />
          <input type="text" ref="contactInfoBox" name="event[contact_info]" defaultValue={contact_info} placeholder="Contact Information" />
          <input type="date" ref="dateBox" name="event[date]" defaultValue={date} placeholder="Date" />
          <input type="time" ref="startTimeBox" name="event[start_time]" defaultValue={start_time} placeholder="Start Time" />
          <input type="time" ref="endTimeBox" name="event[end_time]" defaultValue={end_time} placeholder="End Time" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
