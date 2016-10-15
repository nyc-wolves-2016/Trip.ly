class PackingLists extends React.Component {
  render() {
    let { packing_lists } = this.props;
    return(
      <div>
        <h1>Packing Lists: </h1>
        <ul>
          {packing_lists.map((list, i) =>
            <li>
              <PackingListLink list={list} key={i}/>
            </li>
          )}
        </ul>
      </div>
    )
}
}
