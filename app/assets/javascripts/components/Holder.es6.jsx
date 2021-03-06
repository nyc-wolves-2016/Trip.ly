class Holder extends React.Component {
  constructor() {
    super();

    this.state = {
      packingPreview: true,
      resourcePreview: true,
      itineraryPreview: true,
      packing_lists: [],
      resource_lists: [],
      itinerary: {}
    }

    this.handleNested = this.handleNested.bind(this);
    this.handleNestedResource = this.handleNestedResource.bind(this);
    this.handleNestedItinerary = this.handleNestedItinerary.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
    this.handleAddPackingPreviewForm = this.handleAddPackingPreviewForm.bind(this);
    this.handleAddResourcePreviewForm = this.handleAddResourcePreviewForm.bind(this);
    this.handleResetHolder = this.handleResetHolder.bind(this);
    this.handleNewPackingList = this.handleNewPackingList.bind(this);
    this.handleNewResourceList = this.handleNewResourceList.bind(this);
  }

  componentDidMount() {
    let { trip } = this.props.allLists;
    $.ajax({
      url: "/trips/" + trip.id + "/lists"
    }).done(function(response){
      this.setState({
        packing_lists: response.packing_lists,
        itinerary: response.itinerary,
        resource_lists: response.resource_lists
      })
    }.bind(this));
  }

  handleNewPackingList(lists){
    this.setState({
      packing_lists: lists
    });
  }

  handleNewResourceList(lists){
    this.setState({
      resource_lists: lists
    });
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

  handleNestedErrors(response) {
    this.props.onErrors(response);
  }

  handleAddPackingPreviewForm() {
    this.setState({
      itineraryPreview: false,
      resourcePreview: false
    })
    $("#list-submit").addClass('hidden');
    $('#packing-lists-list').addClass('hidden');
  }

  handleAddResourcePreviewForm() {
    this.setState({
      itineraryPreview: false,
      packingPreview: false
    })
    $("#resource-list-submit").addClass('hidden');
    $('#resource-lists-list').addClass('hidden');
  }

  handleResetHolder() {
    this.setState({
      itineraryPreview: true,
      packingPreview: true,
      resourcePreview: true
    })
    $("#list-submit").removeClass('hidden');
    $("#resource-list-submit").removeClass('hidden');
    $('#packing-lists-list').removeClass('hidden');
    $('#resource-lists-list').removeClass('hidden');
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props.allLists;

    return(
      <div className="row container">
          <div className="large-8 column large-centered">
            { this.state.itineraryPreview ? <ItineraryPreview onItineraryClick={this.handleNestedItinerary} trip={trip}/> : null }
            <div className="row">
              { this.state.packingPreview ? <PackingLists onNewPackingList={this.handleNewPackingList} onListClick={this.handleNested} trip={trip} packing_lists={this.state.packing_lists} onErrors={this.handleNestedErrors} errors={this.props.errors} onAddPackingPreviewForm={this.handleAddPackingPreviewForm} onResetHolder={this.handleResetHolder} /> : null }
              { this.state.resourcePreview ? <ResourceListPreview onResourceListClick={this.handleNestedResource} trip={trip} resource_lists={this.state.resource_lists}  onErrors={this.handleNestedErrors}
              onNewResourceList={this.handleNewResourceList} errors={this.props.errors} onAddResourcePreviewForm={this.handleAddResourcePreviewForm} onResetHolder={this.handleResetHolder} /> : null }
            </div>
        </div>
      </div>
    )
  }
}
