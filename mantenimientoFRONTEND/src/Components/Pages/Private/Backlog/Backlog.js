import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {IoIosSync, IoMdAddCircle, IoIosRemove, IoIosSettings } from 'react-icons/io';
import {Link} from 'react-router-dom';
import Image from './Image';


import { paxios } from '../../../../Utilities';

import "./Backlog.css";

export default class Backlog extends Component {
  constructor(){
    super();
    this.state={
      things:[],
      thingse: [],
      hasMore:true,
      page:1,
      itemsToLoad:10
    }

    this.loadMore = this.loadMore.bind(this);
    this.componentDidMount = this.componentDidMount.bind((this));
  }

  loadMore(page){
    const items  = this.state.itemsToLoad;
    const uri = `/api/edificios/page/${page}/${items}`;
    paxios.get(uri)
      .then(
        ({data})=>{
          const { things, totalThings} = data;
          const loadedThings = this.state.things;
          things.map((e)=>loadedThings.push(e));
          if(totalThings){
              this.setState({
                "things": loadedThings,
                "hasMore": (page * items < totalThings)
              });
          } else {
            this.setState({
              "hasMore": false
            });
          }
        }
        
      )
      .catch(
        (err)=>{
          console.log(err);
        }
      );
  }

  componentDidMount(){
    this.setState({isLoading:true});
    paxios.get('/api/edificios/')
      .then( (resp)=>{
        this.setState({thingse:resp.data, isLoading:false});
      })
      .catch( (err)=>{
        alert(err);
      })
    ;
}

  render() {
  
  const items = this.state.thingse.map(
    (thing)=>{
      let ima = thing.imagen;
      return (
        <div className="thingItem" key={thing._id}>
          
          <span>{thing.idEdificio}</span>
          <span>{thing.nombreEdificio}</span>
          <span>Pisos: {thing.pisosEdificio}</span>
          <span className="updateThing">
            <Link to={`/detailupdate/${thing._id}`}>
              <IoIosSettings size="2em"/>
            </Link>
            <Link to={`/detailDelete/${thing._id}`}>
              <IoIosRemove size="2em"/>
            </Link>
          </span>
        </div>);
    }
  );


  if(!items.length) items.push(
    <div className="thingItem" key="pbBackLogAddOne">
      <span>Nuevo edificio o espacio</span>
    </div>);

  return (
    <section className="inicio">
      <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
      <h1>
        Edificios y Espacios
        <span className="addThing">
        </span>
      </h1>

          <Link to="/detailadd"><IoMdAddCircle size="2.5em" /></Link>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            useWindow={false}
            getScrollParent={()=>this.scrollParentRef}
            loader={<div key="pbBackLogLoading" className="thingItem center"><IoIosSync/></div>}
            >
              {items}
          </InfiniteScroll>
          
      </div>
     </section>
   );

   
  }
}
