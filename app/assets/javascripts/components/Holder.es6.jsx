class Holder extends React.Component {
  constructor() {
    super();

    this.state = {
      packingPreview: true,
      resourcePreview: true,
      itineraryPreview: true
    }

    this.handleNested = this.handleNested.bind(this);
    this.handleNestedResource = this.handleNestedResource.bind(this);
    this.handleNestedItinerary = this.handleNestedItinerary.bind(this);
    this.handleNestedErrors = this.handleNestedErrors.bind(this);
    this.handleAddPackingPreviewForm = this.handleAddPackingPreviewForm.bind(this);
    this.handleAddResourcePreviewForm = this.handleAddResourcePreviewForm.bind(this);
    this.handleResetHolder = this.handleResetHolder.bind(this);
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
  }

  handleResetHolder() {
    this.setState({
      itineraryPreview: true,
      packingPreview: true,
      resourcePreview: true
    })
    $("#list-submit").removeClass('hidden');
    $('#packing-lists-list').removeClass('hidden');
  }

  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props.allLists;

    return(
      <div className="row">
        <div>
          { this.state.itineraryPreview ? <ItineraryPreview onItineraryClick={this.handleNestedItinerary} trip={trip}/> : null }
        </div>
          { this.state.packingPreview ? <PackingLists onListClick={this.handleNested} trip={trip} packing_lists={packing_lists} onErrors={this.handleNestedErrors} errors={this.props.errors} onAddPackingPreviewForm={this.handleAddPackingPreviewForm} onResetHolder={this.handleResetHolder}/> : null }
          { this.state.resourcePreview ? <ResourceListPreview onResourceListClick={this.handleNestedResource} trip={trip} resource_lists={resource_lists}  onErrors={this.handleNestedErrors} errors={this.props.errors} onAddResourcePreviewForm={this.handleAddResourcePreviewForm}/> : null }
        <div>


        </div>

      </div>

    )
  }
}
