class Holder extends React.Component {
  constructor() {
    super();
    this.handleNested = this.handleNested.bind(this);
    this.handleNestedResource = this.handleNestedResource.bind(this);
    this.handleNestedItinerary = this.handleNestedItinerary.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleNestedItinerary(response){
    this.props.onItineraryClick(response);
  }

  handleNested(response){
    this.props.onListClick(response);
  }

  handleNestedResource(response){
    this.props.onResourceListClick(response);
  }

  handleDelete(id){
    var url = "/trips/" + this.props.allLists.trip.id + "/packing_lists/" + id
    $.ajax({
      url: url,
      method: 'delete',
      data: id
    })
    .done(function() {
      this.forceUpdate();
    }.bind(this));
  }

  removeList(id) {
    var newList = this.props.allLists.packing_lists.filter((list) => { return list.id != id;
    });

    this.setState({ lists: newList });
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props.allLists;

    return(
      <div>
        <div>
          <ItineraryPreview onItineraryClick={this.handleNestedItinerary} trip={trip}/>
        </div>
          <PackingLists onListClick={this.handleNested} trip={trip} packing_lists={packing_lists} handleDelete={this.handleDelete} />
          <ResourceListPreview onResourceListClick={this.handleNestedResource} trip={trip} resource_lists={resource_lists}/>
        <div>


        </div>

      </div>

    )
  }
}
