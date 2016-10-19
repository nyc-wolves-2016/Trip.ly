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
      $(".event-form").trigger("reset");
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))

  }

  render() {

    return(
      <div>
        <p className="help-text">* Required field</p>
        <form className="event-form" ref="eventForm"  >
          <label>* Name
            <input type="text" ref="nameBox" name="event[name]" placeholder="Name" />
          </label>
          <div className="row">
            <div className="large-6 columns">
          <label> Location
            <input type="text" ref="locationBox" name="event[location]" placeholder="Location" />
          </label>
            </div>
            <div className="large-6 column">
          <label>* Event Date
            <input type="date" ref="dateBox" name="event[date]" placeholder="Date" />
          </label>
          </div>
          </div>
          <div className="row">
            <div className="large-6 columns">
              <label>Start Time
                <input type="time" ref="startTimeBox" name="event[start_time]" placeholder="Start Time" />
              </label>
            </div>
            <div className="large-6 columns">
              <label>End Time
                <input type="time" ref="endTimeBox" name="event[end_time]" placeholder="End Time" />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="large-6 columns">
              <label>Details
                <textarea ref="detailsBox" name="event[details]" placeholder="Details"></textarea>
              </label>
            </div>
            <div className="large-6 columns">
              <label>Contact Information
                <textarea ref="contactInfoBox" name="event[contact_info]" placeholder="Contact Information"></textarea>
              </label>
            </div>
          </div>
          <div className="row">&nbsp;</div>
          <input className="expanded hollow button" type="submit" value="Add Your Event" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}
