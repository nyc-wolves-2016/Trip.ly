class Trip extends React.Component {

  constructor(){
    super();
    this.state = {holder: true, packingLists: false};
  }


  render(){
    let { trip, packing_lists, itinerary, resource_lists } = this.props;

    return(
      <div>
        { this.state.holder ? <Holder allLists={this.props}/> : null }

        <PackingLists packing_lists={packing_lists}/>
      </div>
    )

}
}
