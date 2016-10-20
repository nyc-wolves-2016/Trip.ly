class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    }
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);

  }

  componentDidMount() {
    this.setState({
      events: this.props.events
    })
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
    var url = $(event.target).attr('href');
    var event = this.props.data
    $.ajax({
      url: url,
      method: "delete",
      data: event
    })
    .done(function(response){
      this.props.onEventDelete(response);
    }.bind(this))
  }



  render() {
    let { name, location, details, contact_info, start_date, start_time, end_time, id } = this.props.data;
    // TRY MOVING THE FORM/BUTTON NEXT TO THE EVENT COMPONENT IN ITINERARY
    return(
          <li>
            <input className="radio" type="radio" defaultChecked />
            <div className="relative">
              <label htmlFor="name">{name}</label>
              <span className="date">{start_date}</span>
              <span className="circle"></span>
            </div>
            <div className="content">
              <a className="event-edit fa fa-pencil-square-o" href={"/trips/" + this.props.itinerary.itinerary.trip_id + "/itineraries/" + this.props.itinerary.itinerary.id + "/events/" + id } onClick={this.handleEditButtonClick}></a>
              <a className="event-delete fa fa-trash-o" href={"/trips/" + this.props.itinerary.itinerary.trip_id + "/itineraries/" + this.props.itinerary.itinerary.id + "/events/" + id } onClick={this.handleDeleteButtonClick}></a>
              <p>{location}<br/>
              {details}<br/>
                <span className="start-time">{start_time}</span> -
                <span className="end-time">{end_time}</span><br/>
                <span className="contact-info">{contact_info}</span>
              </p>
            </div>
          </li>
    )
  }
}
