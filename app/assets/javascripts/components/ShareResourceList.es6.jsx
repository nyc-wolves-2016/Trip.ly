class ShareResourceList extends React.Component {

  render() {
    let { resources } = this.props;

    return(
      <div>
        <h2>Resources</h2>
        <ul>
          {resources.map((resource, i) =>
            <div key={i}>
              {resource.link === "" ? <p key={i}>{resource.name}<br/><span className="resource-details">{resource.details}</span></p> : <p key={i}><a href={resource.link}> {resource.name} </a> <br/><span className="resource-details">{resource.details}</span></p>}
            </div>
          ) }
        </ul>
      </div>
    )
  }
}
