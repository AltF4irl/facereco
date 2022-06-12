import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Rank from './components/Rank/Rank'; 
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const opt = {
  fpsLimit: 120,
  interactivity: {
    fullScreen: {
      enable: false
    },
    events: {
      onClick: {
        enable: true,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      grab: {
        distance: 150
      },
    },
  },
  particles: {
    color: {
      value: "#e6007a",
    },
    links: {
      triangles: {
        enable: true,
        color: "#e6007a",
        opacity: 0.03
      },
      color: "#e6007a",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "line",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

const particlesInit = async (main) => {
  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

const particlesLoaded = (container) => {
};

const initState = {
  input: '',
  url: '',
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: '',
    username: '',
    email: '',
    score: 0,
    joined: ''
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = initState;
  }

  updateUser = (data) => {
    this.setState({user: {
      id: data.id,
      username: data.username,
      email: data.email,
      score: data.score,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const facecoord = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.querySelector('#inputimg');

    const imHeight = Number(image.height);
    const imWidth = Number(image.width);

    return {
      topRow: facecoord.top_row * imHeight,
      rightCol: imWidth - (facecoord.right_col * imWidth),
      bottomRow: imHeight - (facecoord.bottom_row * imHeight),
      leftCol: facecoord.left_col * imWidth
    }
  }

  displayBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({url: this.state.input});
    
    fetch("https://murmuring-reaches-30024.herokuapp.com/imageUrl", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(res => res.json())
    .then(response => {
      if(response) {
        fetch("https://murmuring-reaches-30024.herokuapp.com/image", {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState({ user: { ...this.state.user, score: count } })
        })
      }
      this.displayBox(this.calculateFaceLocation(response))
    })
    .catch(err => {
      console.log(err);
    })
    
  }

  // ROUTING
  onRouteChange = (route) => {
    // const signin = document.querySelector("#signinbtn");
    // const register = document.querySelector("#registerbtn");
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else if (route === 'signin'){
      // signin.classList.add('active');
      // register.classList.remove('active');
      this.setState(initState);
    } else if (route === 'register') {
      // register.classList.add('active');
      // signin.classList.remove('active');
      this.setState({isSignedIn: false});
    }
    this.setState({route: route});
  }
  
  render(){
    return (
      <div className="App">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={opt}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} route={this.state.route}/>
        {this.state.route === "home" 
        ? <div>
            <div className='maindiv'>
              <Rank username={this.state.user.username} score={this.state.user.score} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onImageSubmit} />
            </div>
            <FaceRecognition  box={this.state.box} url={this.state.url} />
          </div>
        : (
        this.state.route === "signin" 
        ? <Signin updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
        : <Register onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
        )
        }
        
      </div>
  )};
}

export default App;
