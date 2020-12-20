import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as handpose from '@tensorflow-models/handpose';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { cameraWithTensors, fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
// import CallDetectorManager from 'react-native-call-detection'

const TensorCamera = cameraWithTensors(Camera);
const AUTORENDER = true;
let frameCount = 0;
const makePredictionEveryNFrames = 3;

// Position of camera preview.
const previewLeft = 0;
const previewTop = 0;
const previewWidth = 415;
const previewHeight = 768;

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
      cameraType: Camera.Constants.Type.front,
      lastShape: 'none',
      hands: [],
      mobilenetClasses: [],
      gesture: "nothing detected",
    };

    this.handleImageTensorReady = this.handleImageTensorReady.bind(this);
  }

  async loadHandposeModel() {
    return await handpose.load();
  }

  async componentDidMount() {

    await tf.ready();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    let textureDims;
    if (Platform.OS === 'ios') {
      textureDims = { height: 1920, width: 1080 };
    } else {
      textureDims = { height: 1200, width: 1600 };
    }
    // const tensorDims = {height: 300, width: 400 };
    const tensorDims = { height: 500, width: 290 };

    const scale = {
      //height: styles.camera.height / tensorDims.height,
      //width: styles.camera.width / tensorDims.width,
      height: 1,
      width: 1,
    }

    const handposeModel = await this.loadHandposeModel();

    this.setState({
      isTfReady: true,
      permissionsStatus: status,
      handDetector: handposeModel,
      textureDims,
      tensorDims,
      scale,

    });
  }

  async handleImageTensorReady(images) {
    const loop = async () => {
      if (this.state.handDetector != null) {
        if (frameCount % makePredictionEveryNFrames === 0) {
          const imageTensor = images.next().value;
          const returnTensors = false;
          const hands = await this.state.handDetector.estimateHands(
            imageTensor, returnTensors);
          tf.dispose(imageTensor);
          this.setState({ hands });
        }
      }
      frameCount += 1;
      frameCount = frameCount % makePredictionEveryNFrames;
      this.rafID = requestAnimationFrame(loop);
    };

    loop();
  }

  componentWillUnmount() {
    if (this.rafID) {
      cancelAnimationFrame(this.rafID);
    }
  }

  renderInitialization() {
    return (
      null
    );
  }

  renderHandsDebugInfo() {
    const { hands, scale, textureDims } = this.state;

    console.log("Here")

    return hands.map((hand, i) => {
      // const {topLeft, bottomRight, probability} = hand;
      // Render landmarks 
      if (hand.landmarks[5][1] < hand.landmarks[8][1] && hand.landmarks[9][1] < hand.landmarks[12][1] && hand.landmarks[13][1] < hand.landmarks[16][1] && hand.landmarks[17][1] < hand.landmarks[20][1]) {
        console.log("pause");
        fetch('https://api.spotify.com/v1/me/player/pause', {
          method: 'PUT',
          headers: {
            'Authorization': "Bearer " + AsyncStorage.getItem("token")
          },

        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message));
        if (this.state.gesture != "pause") {
          this.setState({ gesture: "pause" });
        }
      }
      else if (hand.landmarks[5][1] > hand.landmarks[8][1] && hand.landmarks[9][1] > hand.landmarks[12][1] && hand.landmarks[13][1] > hand.landmarks[16][1] && hand.landmarks[17][1] > hand.landmarks[20][1]) {
        console.log("play");
        fetch('https://api.spotify.com/v1/me/player/play', {
          method: 'PUT',
          headers: {
            'Authorization': "Bearer " + AsyncStorage.getItem("token")
          },

        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message));
        if (this.state.gesture != "play") {
          this.setState({ gesture: "play" });
        }
      }
      else if (hand.landmarks[5][1] > hand.landmarks[8][1] && hand.landmarks[9][1] < hand.landmarks[12][1] && hand.landmarks[13][1] < hand.landmarks[16][1] && hand.landmarks[17][1] < hand.landmarks[20][1]) {
        console.log("primary contact");
      }
      else if (hand.landmarks[5][1] > hand.landmarks[8][1] && hand.landmarks[9][1] > hand.landmarks[12][1] && hand.landmarks[13][1] < hand.landmarks[16][1] && hand.landmarks[17][1] < hand.landmarks[20][1]) {
        console.log("skip to next song");

        fetch('https://api.spotify.com/v1/me/player/next', {
          method: 'POST',
          headers: {
            'Authorization': "Bearer " + AsyncStorage.getItem("token")
          },

        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error.message));
        if (this.state.gesture != "skip to next song") {
          this.setState({ gesture: "skip to next song" });
        }
      }
      else if (hand.landmarks[5][1] > hand.landmarks[8][1] && hand.landmarks[9][1] > hand.landmarks[12][1] && hand.landmarks[13][1] > hand.landmarks[16][1] && hand.landmarks[17][1] < hand.landmarks[20][1]) {
        console.log("get slack messages");
      }
      else if (hand.landmarks[5][1] < hand.landmarks[8][1] && hand.landmarks[9][1] < hand.landmarks[12][1] && hand.landmarks[13][1] < hand.landmarks[16][1] && hand.landmarks[17][1] > hand.landmarks[20][1]) {
      }


      const rate = 1;

      return <>
        <Svg key={i} height={previewHeight} width={previewWidth} viewBox={`0 0 290 500`} style={{ position: 'absolute', top: 200, left: 0, opacity: 0.9 }}>
          <Circle cx={hand.landmarks[0][0] * rate} cy={hand.landmarks[0][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[1][0] * rate} cy={hand.landmarks[1][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[2][0] * rate} cy={hand.landmarks[2][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[3][0] * rate} cy={hand.landmarks[3][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[4][0] * rate} cy={hand.landmarks[4][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[5][0] * rate} cy={hand.landmarks[5][1] * rate} r="2" stroke="yellow" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[6][0] * rate} cy={hand.landmarks[6][1] * rate} r="2" stroke="blue" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[7][0] * rate} cy={hand.landmarks[7][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[8][0] * rate} cy={hand.landmarks[8][1] * rate} r="2" stroke="green" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[9][0] * rate} cy={hand.landmarks[9][1] * rate} r="2" stroke="yellow" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[10][0] * rate} cy={hand.landmarks[10][1] * rate} r="2" stroke="blue" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[11][0] * rate} cy={hand.landmarks[11][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[12][0] * rate} cy={hand.landmarks[12][1] * rate} r="2" stroke="green" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[13][0] * rate} cy={hand.landmarks[13][1] * rate} r="2" stroke="yellow" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[14][0] * rate} cy={hand.landmarks[14][1] * rate} r="2" stroke="blue" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[15][0] * rate} cy={hand.landmarks[15][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[16][0] * rate} cy={hand.landmarks[16][1] * rate} r="2" stroke="green" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[17][0] * rate} cy={hand.landmarks[17][1] * rate} r="2" stroke="yellow" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[18][0] * rate} cy={hand.landmarks[18][1] * rate} r="2" stroke="blue" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[19][0] * rate} cy={hand.landmarks[19][1] * rate} r="2" stroke="red" strokeWidth="2.5" fill="red" />
          <Circle cx={hand.landmarks[20][0] * rate} cy={hand.landmarks[20][1] * rate} r="2" stroke="green" strokeWidth="2.5" fill="red" />



        </Svg>
        <Text style={styles.textContainer} key={`faceInfo${i}`}>
          Probability: {hand.handInViewConfidence}
        </Text>
      </>
    });
  }

  renderMain() {
    const { textureDims, hands, tensorDims } = this.state;

    const camView = <View style={styles.cameraContainer}>
      <TensorCamera
        // Standard Camera props
        style={styles.camera}
        type={this.state.cameraType}
        zoom={0}
        // tensor related props
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={tensorDims.height}
        resizeWidth={tensorDims.width}
        resizeDepth={3}
        onReady={this.handleImageTensorReady}
        autorender={AUTORENDER}
      />
    </View>;

    return (
      <View>
        {camView}

        {/* <Text style={styles.textContainer}>tf.backend {tf.getBackend()}</Text> */}
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>Detected Gesture: {this.state.gesture}</Text>
        </View>
        {/* <Text style={styles.textContainer}># hands detected: {hands.length}</Text> */}
        {/* {this.renderBoundingBoxes()} */}
        {this.renderHandsDebugInfo()}
      </View>
    );
  }

  renderBoundingBoxes() {
    const { hands, scale } = this.state;
    // On android the bounding boxes need to be mirrored horizontally
    const flipHorizontal = Platform.OS === 'ios' ? false : true;
    return hands.map((hand, i) => {
      const { topLeft, bottomRight } = face;
      const bbLeft = (topLeft[0] * scale.width);
      const boxStyle = Object.assign({}, styles.bbox, {
        left: flipHorizontal ? (previewWidth - bbLeft) - previewLeft : bbLeft + previewLeft,
        top: (topLeft[1] * scale.height) + 20,
        width: (bottomRight[0] - topLeft[0]) * scale.width,
        height: (bottomRight[1] - topLeft[1]) * scale.height,
      });

      return <View style={boxStyle} key={`face${i}`}></View>
      1
    });
  }

  render() {
    const { isTfReady } = this.state;
    return (
      isTfReady ? this.renderMain() : this.renderInitialization()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
    textAlign: 'center',
    top: 30
  },
  camera: {
    position: 'absolute',
    left: previewLeft,
    top: previewTop,
    width: previewWidth,
    height: previewHeight,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
  },
  bbox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 0,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,

  }
});
