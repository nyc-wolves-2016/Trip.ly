class ResourceList extends React.Component {
  constructor() {
    super();
    this.state = {
      editResourceForm: false,
      resource: {},
      rlresources: [],
      anyErrors: false
    }
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleAddNewResource = this.handleAddNewResource.bind(this);
    this.handleEditResource = this.handleEditResource.bind(this);
    this.handleUpdateResources = this.handleUpdateResources.bind(this);
    this.handleDeleteResource = this.handleDeleteResource.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
  }

  componentDidMount() {
    this.setState({ rlresources: this.props.resources });
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
    this.setState({anyErrors: true})
  }

  handleReturnClick(){
    this.props.onReturnTripPage();
  }

  handleAddNewResource(new_resource) {
    this.props.resources.push(new_resource);
    this.forceUpdate();
    this.setState({anyErrors: false})
  }

  handleUpdateResources(resources) {
    this.setState({
      rlresources: resources,
      editResourceForm: false,
      anyErrors: false
    });
  }

  handleButtonClick() {
    $("#add-resource-form").removeClass("hidden");
    $("#add-resource-button").addClass("hidden");
  }

  handleEditResource(event) {
    event.preventDefault();
    let { rlist } = this.props;
    var resourceID = $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + rlist.trip_id + "/resource_lists/" + rlist.id + "/resources/" + resourceID
    })
    .done(function(response) {
      this.setState({ editResourceForm: true,
                      resource: response
      });
    }.bind(this))
  }

    handleDeleteResource(event) {
      event.preventDefault();
      let { rlist } = this.props;
      var resourceID = $(event.target).attr('href');
      $.ajax({
        url: "/trips/" + rlist.trip_id + "/resource_lists/" + rlist.id + "/resources/" + resourceID,
        method: "delete"
      })
      .done(function(response) {
        this.setState({ rlresources: response})
      }.bind(this))
    }

  render(){
    let { name } = this.props.rlist;
    return(
      <div>
        <h2>Name: {name}</h2>
        <div id="add-resource-button">
          <input type="button" value="Add Resource" onClick={this.handleButtonClick} />
        </div>
        <div id="add-errors">
          { this.state.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>
        <div id="add-resource-form" className="hidden">
          <AddSingleResource resource_list={this.props.rlist} onAddNewResource={this.handleAddNewResource} onErrors={this.handleNestedErrors}/>
        </div>
        <div id="edit-resource-form" >
          { this.state.editResourceForm ? <EditSingleResource resource_list={this.props.rlist} resource={this.state.resource} onUpdateResources={this.handleUpdateResources} onErrors={this.handleNestedErrors}/> : null }
        </div>
        <li>
          {this.state.rlresources.map((resource, i) =>
            <div key={i}>
              {resource.link === "" ? <p key={i}>{resource.name}<br/>{resource.details}</p> : <p key={i}><a href={resource.link}> {resource.name} </a> <br/><span className="resource-details">{resource.details}</span></p>}
              <div>
                <input href={resource.id} type="button" value="Edit Resource" onClick={this.handleEditResource} />
              </div>
              <div>
                <input href={resource.id} type="button" value="Delete Resource" onClick={this.handleDeleteResource}/>
              </div>
            </div>
          ) }
        </li>
        <button onClick={this.handleReturnClick}>Return To Trip</button>
      </div>
    )
  }
}
