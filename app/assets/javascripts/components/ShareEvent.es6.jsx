class ShareEvent extends React.Component {

  render() {
    let { name, location, details, contact_info, start_time, end_time, start_date, id } = this.props.data;

    return(
          <li>
            <input className="radio" type="radio" defaultChecked />
            <div className="relative">
              <label htmlFor="name">{name}</label>
              <span className="date">{start_date}</span>
              <span className="circle"></span>
            </div>
            <div className="content">
              <p>{location}<br/>
              {details}<br/>
                <span className="start-time">{start_time}</span> -
                <span className="end-time">{end_time}</span>
                <div className="contact-info">{contact_info}</div>
              </p>
            </div>
          </li>
    )
  }
}
