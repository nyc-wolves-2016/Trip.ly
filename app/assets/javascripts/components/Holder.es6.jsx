class Holder extends React.Component {
  render(){
    let { packing_lists, itinerary, resource_lists } = this.props.allLists;

    return(
      <div>
        <div>

          <h1>Your Itinerary</h1>
        </div>
          <PackingLists packing_lists={packing_lists}/>
        <div>

          <h1>Resource Lists: </h1>
        </div>

      </div>

    )
  }
}
