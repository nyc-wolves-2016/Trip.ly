class AddSingleResource extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      link: null,
      details: null,
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleNewResourceSubmit = this.handleNewResourceSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleLinkChange(event) {
    this.setState({link: event.target.value});
  }

  handleDetailsChange(event) {
    this.setState({details: event.target.value})
  }

  handleNewResourceSubmit(event) {
    event.preventDefault();
    let { resource_list, trip } = this.props;
    var name = this.state.name;
    var link = this.state.link;
    var details = this.state.details;
    var resource_list_id = resource_list.id;
    var resource = { name, link, details, resource_list_id };
    var data = { resource };
    $.ajax({
      url: "/trips/" + resource_list.trip_id + "/resource_lists/" + resource_list.id + "/resources",
      method: "post",
      data: data
    })
    .done(function(response) {
      this.props.onAddNewResource(response);
      $(".new-resource-form").trigger("reset");
    }.bind(this))
    .fail(function(response) {
      this.props.onErrors(response.responseJSON);
    }.bind(this))
  }

  render() {
    return(
    <div className="row">
      <div className="large-6 column">
          <form className="new-resource-form" onSubmit={this.handleNewResourceSubmit}>
            <label>Name
              <input type="text" name="name" placeholder="Name" onChange={this.handleNameChange} />
            </label>
            <label>Link
              <input type="text" name="link" placeholder="Link" onChange={this.handleLinkChange} />
            </label>            
            <label>Details
              <textarea type="text" name="details" onChange={this.handleDetailsChange}></textarea>
            </label>
            <button className="expanded hollow button" type="submit" value="Submit">Submit</button>
          </form>
        </div>
    </div>
    )
  }
}
