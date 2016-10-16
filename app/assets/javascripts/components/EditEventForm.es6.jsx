class EditEventForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    // debugger;
    event.preventDefault();
    var url = "/trips/" + this.props.data.itinerary.itinerary.trip_id + "/itineraries/" + this.props.data.data.itinerary_id +"/events/" + this.props.data.data.id
    var name = this.refs.nameBox.value;
    var location = this.refs.locationBox.value;
    var details = this.refs.detailsBox.value;
    var contact_info = this.refs.contactInfoBox.value;
    var date = this.refs.dateBox.value;
    var start_time = this.refs.startTimeBox.value;
    var end_time = this.refs.endTimeBox.value;
    var itinerary_id = this.props.data.data.itinerary_id
    var event = { name, location, details, contact_info, date, start_time, end_time, itinerary_id };
    var data = { event }
    $.ajax({
      url: url,
      method: "put",
      data: data
    })
    .done(function(response) {
      this.props.onEventEdit(response);
      $("#edit-event-form").addClass("hidden");
      $(".event-edit").removeClass("hidden");
      $(".edit-event-form").trigger("reset");
    }.bind(this))
  }
  render() {
    // debugger;
    // ajax call for specific event?
    return (
      <div>
        <form className="edit-event-form" ref="editEventForm" onSubmit={this.handleSubmit}>
          <input type="text" ref="nameBox" name="event[name]" defaultValue={this.props.data.data.name} placeholder="Name" />
          <input type="text" ref="locationBox" name="event[location]" defaultValue={this.props.data.data.location} placeholder="Location" />
          <input type="text" ref="detailsBox" name="event[details]" defaultValue={this.props.data.data.details} placeholder="Details" />
          <input type="text" ref="contactInfoBox" name="event[contact_info]" defaultValue={this.props.data.data.contact_info} placeholder="Contact Information" />
          <input type="date" ref="dateBox" name="event[date]" defaultValue={this.props.data.data.date} placeholder="Date" />
          <input type="time" ref="startTimeBox" name="event[start_time]" defaultValue={this.props.data.data.start_time} placeholder="Start Time" />
          <input type="time" ref="endTimeBox" name="event[end_time]" defaultValue={this.props.data.data.end_time} placeholder="End Time" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
