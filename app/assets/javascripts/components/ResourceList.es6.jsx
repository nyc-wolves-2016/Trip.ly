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
        <h2>Name: {name}</h2>
        {/* <div id="add-resource-button">
          <input type="button" value="Add Resource" onClick={this.handleButtonClick} />
        </div> */}
        <div id="add-resource-form">
          <AddSingleResource resource_list={this.props.rlist}/>
        </div>
        <li>
          {this.props.resources.map((resource, i) =>
            resource.link === null ? <p key={i}>{resource.name}<br/>{resource.details}</p> : <p key={i}><a href={resource.link}> {resource.name} </a> <br/><span className="resource-details">{resource.details}</span></p>

          ) }
        </li>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
