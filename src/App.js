import React, { Component } from 'react'
import Particles from 'react-particles-js'
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: '8aa5367b8e7a40289529ab4be049b3be'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {

  state = {
    input: '',
    imageUrl: '',
    box: {}
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
    function(response) {
      console.log(response)
    },
    function(err) {
      // there was an error
    }
  );
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange } 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
