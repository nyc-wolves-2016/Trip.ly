class Event extends React.Component {
  constructor() {
    super();
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleEventEdit = this.handleEventEdit.bind(this);
  }

  onButtonClick() {
    $("#edit-event-form").removeClass("hidden");
    $(".event-edit").addClass("hidden");
  }

  handleEventEdit() {
  }

  render() {
    let { name, location, details, contact_info, date, start_time, end_time } = this.props.data;
    // debugger;
    // TRY MOVING THE FORM/BUTTON NEXT TO THE EVENT COMPONENT IN ITINERARY
    return(
      <div>
        <div>
          <input className="event-edit" type="button" value="Edit Event" onClick={this.onButtonClick}/>
        </div>
        <div id="edit-event-form" className="hidden">
          <EditEventForm data={this.props} onEventEdit={this.handleEventEdit}/>
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
