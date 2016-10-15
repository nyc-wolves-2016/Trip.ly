class Trip extends React.Component {

  constructor(){
    super();

  }

  render(){
    let { trip, packing_lists } = this.props;

    return(
      <div>
        <div>
          <h1>Your Itinerary</h1>

        </div>
        <div>
          <h1>Packing Lists: </h1>
          <ul>
            {packing_lists.map((list, i) =>
              <PackingList list = {list} key = {i} />
            )}
          </ul>
        </div>
        <div>
          <h1>Resource Lists: </h1>
        </div>

      </div>

    )

}
}
