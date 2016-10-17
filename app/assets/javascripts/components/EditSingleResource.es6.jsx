class EditSingleResource extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "",
      link: "",
      details: ""
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleEditResourceSubmit = this.handleEditResourceSubmit.bind(this);
  }

  componentDidMount(){
    let { resource } = this.props;
    this.setState({ name: resource.name,
                    link: resource.link,
                    details: resource.details
    })
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleLinkChange(event) {
    this.setState({link: event.target.value});
  }

  handleDetailsChange(event) {
    this.setState({details: event.target.value});
  }

  handleEditResourceSubmit(event) {
    let { resource_list } = this.props;
    event.preventDefault();
    var name = this.state.name;
    var link = this.state.link;
    var details = this.state.details;
    var resource_list_id = resource_list.id;
    var resourceID = this.props.resource.id
    var resource = { name, link, details, resource_list_id };
    var data = { resource };
    $.ajax({
      url: "/trips/" + resource_list.trip_id + "/resource_lists/" + resource_list_id + "/resources/" + resourceID,
      method: "put",
      data: data
    })
    .done(function(response) {
      this.props.onUpdateResources(response);
    }.bind(this))
  }

  render() {
    return(
      <form className="edit-resource-form" onSubmit={this.handleEditResourceSubmit}>
          <input type="text" name="name" value={this.state.name} placeholder="Name" onChange={this.handleNameChange} />
          <input type="text" name="link" placeholder="Link" onChange={this.handleLinkChange} value={this.state.link}/>
          <textarea type="text" name="details" onChange={this.handleDetailsChange} value={this.state.details}></textarea>
        <input type="submit" value="Update"/>
      </form>
    )
  }
}
