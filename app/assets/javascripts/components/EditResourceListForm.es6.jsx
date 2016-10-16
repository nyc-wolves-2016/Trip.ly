class EditResourceListForm extends React.Component {
  constructor() {
    super();
    this.handleUpdateList = this.handleUpdateList.bind(this);
  }

  handleUpdateList(event) {
    event.preventDefault();
  }

  render() {
    return(
        <form className="edit-resource-list-form" onSubmit={this.handleUpdateList}>
        <input type="text" name="name" value={this.props.list.name} placeholder="Name" />
        <input type="submit" value="Update" />
        </form>
    )
  }
}
