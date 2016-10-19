class PackingLists extends React.Component {
  constructor(){
    super();
    this.state = {
      packing_list: [],
      editList: false,
      addList: false,
      anyErrors: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleListUpdateSubmit = this.handleListUpdateSubmit.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
    this.handleHideForm = this.handleHideForm.bind(this);
    this.handleNestedResetHolder = this.handleNestedResetHolder.bind(this);
    this.handleDisappearErrors = this.handleDisappearErrors.bind(this);
  }

  handleNestedResetHolder() {
    this.props.onResetHolder();
  }

  handleNestedErrors(response) {
    this.props.onErrors(response);
    this.setState({anyErrors: true});
  }

  handleDisappearErrors() {
    this.setState({anyErrors: false})
  }

  handleClick(event){
    event.preventDefault();
    let { trip } = this.props;
    var listID= $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/packing_lists/" + listID
    }).done(function(response) {
      this.props.onListClick(response);
    }.bind(this));
  }

  handleEditClick(event) {
    event.preventDefault();
    let { trip } = this.props;
    var listID = $(event.target).attr('href');
    $.ajax({
      url: "/trips/" + trip.id + "/packing_lists/" + listID
    })
    .done(function(response) {
      this.setState ({
        editList: true,
        packing_list: response[0]
      })
      this.props.onAddPackingPreviewForm();
    }.bind(this))
  }

  handleListUpdateSubmit(lists){
    this.setState({
      editList: false,
      anyErrors: false
    });
    this.props.onResetHolder();
    this.props.onNewPackingList(lists);
  }

  handleAddClick(event) {
    this.setState({ addList: true });
    this.props.onAddPackingPreviewForm();
  }

  handleListSubmit(lists){
    this.setState({ addList: false, anyErrors: false });
    this.props.onResetHolder();
    this.props.onNewPackingList(lists);
  }

  handleHideForm() {
    this.setState({addList: false, editList: false})
  }

  handleDelete(id) {
    var url = "/trips/" + this.props.trip.id + "/packing_lists/" + id
    $.ajax({
      url: url,
      method: 'delete',
    })
    .done(function(response) {
      this.props.onNewPackingList(response);
    }.bind(this));
  }

  render() {
    let { packing_lists } = this.props;
    return(
      <div className="trips-list medium-6 large-6 columns">
        <h5>Packing Lists</h5>
        <div>
          <input className="hollow button" id="list-submit" type="button" value="Add Packing List" onClick={this.handleAddClick}/>
        </div>
        <div id="add-errors">
          { this.state.anyErrors ? <AddErrors errors={this.props.errors}/> : null }
        </div>
        <div id="add-list-form">
          { this.state.addList ? <AddPackingListForm data={this.props} onListSubmit={this.handleListSubmit} onErrors={this.handleNestedErrors} onHideForm={this.handleHideForm} onResetHolder={this.handleNestedResetHolder} onDisappearErrors={this.handleDisappearErrors}/> : null }
        </div>
        <div id="edit-list-form">
          { this.state.editList ? <EditPackingListForm packing_list={this.state.packing_list}  onListUpdateSubmit={this.handleListUpdateSubmit} onErrors={this.handleNestedErrors} onHideForm={this.handleHideForm} onResetHolder={this.handleNestedResetHolder} onDisappearErrors={this.handleDisappearErrors}/> : null }
        </div>
        <div id="packing-lists-list">
          <ul className="list-display">
            {this.props.packing_lists.map((list, i) =>
              <li key={i}>
                <div className="name"><a href={list.id} onClick={this.handleClick}>{list.name}</a>
                <div className="user-options" id="edit-packing-list-form">
                  <button href={list.id} className="fa fa-pencil-square-o" id="edit-list-submit" type="button" value="Edit List" onClick={this.handleEditClick} ></button>

                  <button id="list-submit" className="fa fa-trash-o" type="button" value="Delete List" onClick={this.handleDelete.bind(this, list.id, list)} data={this.props}></button>
                </div>
                <div className="list-circle">
                  <i className="fa fa-suitcase fa-lg"></i>
                </div>
              </div>
            </li>
            )}
          </ul>
        </div>
      </div>
    )
}
}
