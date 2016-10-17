class EditSingleResource extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "",
      link: "",
      details: ""
    }
  }

  componentDidMount(){
    let { resource } = this.props;
    this.setState({ name: resource.name,
                    link: resource.link,
                    details: resource.details
    })
  }

  render() {
    return(
      <form className="edit-resource-form" onSubmit={this.handleNewResourceSubmit}>
          <input type="text" name="name" value={this.state.name} placeholder="Name" onChange={this.handleNameChange} />
          <input type="text" name="link" placeholder="Link" onChange={this.handleLinkChange} value={this.state.link}/>
          <textarea type="text" name="details" onChange={this.handleDetailsChange} value={this.state.details}></textarea>
        <input type="submit" value="Update"/>
      </form>
    )
  }
}
