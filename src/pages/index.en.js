import React, { Component } from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image';
import { Carousel } from 'react-responsive-carousel';
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './index.module.css';
import PhoneButton from '../components/PhoneButton';
import { Collapse } from 'react-collapse';
import SmoothCollapse from 'react-smooth-collapse';

// images
import truckImg from '../assets/giliTruck.jpg';
import middleOf from '../assets/middleOfNoWhere.jpg';
import yo from '../assets/yo.jpg';
import gf from '../assets/girlfriend.jpg';
import towIcon from '../assets/towtruck.svg';

//icons
import MdArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import MdArrowUp from 'react-icons/lib/md/keyboard-arrow-up';

//data 
import {enTowingServices, enRoadSide, enOtherServices} from '../data/services';
console.log(enTowingServices);

const MainSlider = (props) => (
  <Carousel showThumbs={false}
    infiniteLoop={true}
    autoPlay={true}
    interval={5000}
    className={styles.Carousel}
  >
    <div>
      <img src={truckImg} alt="" />
      {/* <Img
        title={'gili\'s truck'}
        sizes={props.img1}
    /> */}
      {/* <p className="legend">Legend 2</p> */}
    </div>
    <div>
      <img src={middleOf} alt="" />
      {/* <Img
        title={'truck in middle of nowhere'}
        sizes={props.img2}
    /> */}
      {/* <p className="legend">Legend 3</p> */}
    </div>
    <div>
      <img src={yo} alt="" />
      {/* <Img
        title={'gili\'s girl'}
        sizes={props.img3}
      /> */}
      {/* <p className="legend">Legend 1</p> */}
    </div>
    <div>
      <img src={gf} alt="" />
      {/* <Img
        title={'gili\'s girl'}
        sizes={props.img3}
      /> */}
      {/* <p className="legend">Legend 1</p> */}
    </div>
  </Carousel>
)

class ServiceContainer extends Component {
  state = { isOpened: false }

  toggleOnClick = () => {
    this.setState({ isOpened: !this.state.isOpened })
  }

  render() {
    const arrowIcon = !this.state.isOpened ? <MdArrowDown /> : <MdArrowUp />;
    return (
      <div>
        <p onClick={this.toggleOnClick} className={styles.serviceTitle}><span> {arrowIcon} {this.props.serviceTitle} </span></p>
        <SmoothCollapse expanded={this.state.isOpened}>
          <p>{this.props.serviceDescription}</p>
        </SmoothCollapse>
      </div>
    )
  }
}

const ServiceList = (props) => {

  const services = props.serviceArr.map((item) => {
    return (
      <ServiceContainer key={item.title} serviceTitle={item.title} serviceDescription={item.description} />
    )
  })

  return (
    <ul>
      {services}
    </ul>
  )
}


const Description = () => (
  <section className={[styles.Description, 'white-card'].join(' ')} >
    <p> Hi, my name is Gili and I'm here to fix your day. I am based in Central Israel, but I can arrive anywhere in the country at any time of day for emergency services and roadside assistance.
    </p>
    <p>You can see my full list of towing and roadside assistance services below.</p>
    
    {/* desktop view */}
    <p className={styles.checkMap} >You can also check the map below to see how close I am to you.</p>
    <p className={styles.callMe} >Need a tow? Call Now!</p>
    <PhoneButton customId="tablet-call" customStyle={{ width: '222px', margin: '0 auto', padding: '0.3rem', fontSize: '1.2rem', color: 'white' }} />
  </section>
)

const Services = () => (
  <section className={styles.Services} >
    <h1>Services</h1>
    <h3>Towing:</h3>
    <ServiceList serviceArr={enTowingServices} />

    <h3>Roadside Assistance:</h3>
    <ServiceList serviceArr={enRoadSide} />
    
    <h3>Other Services:</h3>
    <ServiceList serviceArr={enOtherServices} />
    

  </section>
)

const MapTracker = () => (
  <section className={styles.MapTracker} >
    <p>Hi, I'm currently in: <span style={{ fontStyle: 'italic' }} >Petach Tikvah</span></p>
    <div className={styles.mapContainer}>
      <div>map goes here</div>
    </div>
  </section>
)


const IndexPage = () => (
  <main className={styles.gridContainer} >
    {/* <HomeButtons /> */}
    <MainSlider />
    <Description />
    <Services />
    <MapTracker />
    {/* <Link to="/en/page-2/">Go to page 2</Link> */}
  </main>
)

export default IndexPage;

