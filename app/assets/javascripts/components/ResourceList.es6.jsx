class ResourceList extends React.Component {
  constructor() {
    super();
    this.handleReturnClick = this.handleReturnClick.bind(this);
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }


  render(){
    let { name } = this.props.rlist;

    return(
      <div>
        <li><h2>Name: {name}</h2>
          {this.props.resources.map((resource, i) =>
            resource.link === null ? <p key={i}>{resource.name}<br/>{resource.details}</p> : <p key={i}><a href={resource.link}> {resource.name} </a> <br/><span className="resource-details">{resource.details}</span></p>

          ) }
        </li>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
