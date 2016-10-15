class PackingList extends React.Component {

  render(){
    let { trip_id, id, name } = this.props;
    let { items } = this.props;
    return(
      <div><p> {name}</p>
      <div className="items">
        {items.map((item, i) =>
        <p> {item.name} </p>) }
      </div>
      </div>
    )
  }
}
