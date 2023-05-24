//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//-0.14428241550922394 2.81447434425354 5.774393558502197

const clock = new THREE.Clock();

//Keep the 3D object on a global variable so we can access it later
let object;

//Set which object to render
let objToRender = 'eye';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
let mixer;
let gltf1;

// Load your glTF file
loader.load(
  `models/${objToRender}/ch36.gltf`,
  function (gltf) {
    // Get the scene from the glTF file
    object = gltf.scene;
    gltf1 = gltf;
    // Add the scene to your scene
    scene.add(object);

    // Access the camera from the glTF file
    camera.copy(gltf.cameras[0]); // Assuming the main camera is the first camera in the file

    // Enable OrbitControls to allow camera movement and zoom
    //controls = new OrbitControls(camera, renderer.domElement);
    //controls.target.set(cameraPosition.x, cameraPosition.y, cameraPosition.z); // set the target to the origin
    //controls.update();
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
/*if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}*/

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Add a listener to the window, so we can move the eye with the mouse
/*document.addEventListener("mousemove", function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  object.rotation.y = -3 + mouseX / window.innerWidth * 3;
  object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
});*/

// Render the scene

let clickingButton = false; // Flag to track the mouse button state
function animate() {
  requestAnimationFrame(animate);
   if (mixer) {
    const deltaTime = clock.getDelta();
    mixer.update(deltaTime);
  }
  
  renderer.render(scene, camera);
}

// Flag to track if the mouse button is pressed
let isMousePressed = false;

// Event listener for mouse down event
document.addEventListener("mousedown", () => {
  isMousePressed = true;
});

// Event listener for mouse up event
document.addEventListener("mouseup", () => {
  isMousePressed = false;
});

// Set up event listeners for mouse and touch input
function onDocumentMouseMove(event) {
    // Make the eye move
  if (isMousePressed && clickingButton === false){
    if (object) {
      // Get the mouse position
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Calculate the rotation based on the mouse position
      const rotationY = mouseX * Math.PI;
      const rotationX = mouseY * Math.PI;

      // Set the rotation of the object
      object.rotation.y = rotationY;
      object.rotation.x = rotationX;
    }
  }
}

// Set up event listeners for touch input
function onDocumentTouchMove(event) {
  // Make sure there is an object and it has rotation properties
  if (object && object.rotation && event.touches.length === 1) {
    // Get the touch position
    const touchX = event.touches[0].clientX / window.innerWidth;
    const touchY = event.touches[0].clientY / window.innerHeight;

    // Calculate the rotation based on the touch position
    const rotationY = (touchX * 2 - 1) * Math.PI;
    const rotationX = -(touchY * 2 - 1) * Math.PI;

    // Set the rotation of the object
    object.rotation.y = rotationY;
    object.rotation.x = rotationX;
  }
}

// Function to increase the size of the object
let max = 6;
let nclick = 0;
function increaseSize() {
  if (nclick < max){
  object.scale.multiplyScalar(1.1); // Adjust the scale factor (1.1) to control the size increment
  object.position.y -= 0.1; // Adjust the value (-0.1) to control the downward movement
  nclick += 1;
  }
}

// Function to decrease the size of the object
function decreaseSize() {
  if (nclick > -6){
  object.scale.divideScalar(1.1); // Adjust the scale factor (1.1) to control the size decrement
  object.position.y += 0.1; // Adjust the value (-0.1) to control the downward movement
  nclick -= 1;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Get the button element by its id
  const button = document.getElementById("near");

  // Add a click event listener to the button
  button.addEventListener("click", increaseSize);

  // Event listener for when the mouse button is pressed on the button
  button.addEventListener("mousedown", () => {
    clickingButton = true;
    console.log("Button click started");
  });

  // Event listener for when the mouse button is released on the button
  button.addEventListener("mouseup", () => {
    if (clickingButton) {
      clickingButton = false;
      console.log("Button click finished");
    }
  });

  const button2 = document.getElementById("nonear");
    // Event listener for when the mouse button is pressed on the button
  button2.addEventListener("mousedown", () => {
    clickingButton = true;
    console.log("Button click started");
  });

  // Event listener for when the mouse button is released on the button
  button2.addEventListener("mouseup", () => {
    if (clickingButton) {
      clickingButton = false;
      console.log("Button click finished");
    }
  });
  // Add a click event listener to the button
  button2.addEventListener("click", decreaseSize);
});

// Add event listeners for key presses to trigger size changes
document.addEventListener("keydown", (event) => {
  if (event.key === "+") {
    increaseSize();
  } else if (event.key === "-") {
    decreaseSize();
  }
});

// Add event listeners
document.addEventListener("mousemove", onDocumentMouseMove, false);
document.addEventListener("touchmove", onDocumentTouchMove, false);


const playAnimationButton = document.getElementById("traducir");
const inputText = document.getElementById("intext");

const keyValueMap = new Map();
keyValueMap.set("compas", 4);
keyValueMap.set("hola", 5);
keyValueMap.set("mesa", 6);
keyValueMap.set("pizarron", 7);

// Event listener for the button click
playAnimationButton.addEventListener("click", async () => {
  // Get the input text value
  const inputValue = inputText.value.trim();

  // Split the input into individual words
  const words = inputValue.split(" ");

// Load and play animations for each word
for (const word of words) {
  console.log(word);
  console.log(gltf1.animations);

  // Get the first animation clip from the gltf file
  const clip = gltf1.animations[keyValueMap.get(word)];
  // create a mixer outside the loop
mixer = new THREE.AnimationMixer(object);
  // Create an animation action for the clip
  const action = mixer.clipAction(clip);

  // Listen for the "finished" event on the animation action
  action.clampWhenFinished = true; // Keep the last frame of the animation
  action.loop = THREE.LoopOnce; // Play the animation only once
  action.setEffectiveTimeScale(1); // Set the time scale of the animation
  action.play();

// Wait for the animation to finish
await new Promise((resolve) => {
 setTimeout(resolve, clip.duration*1000 + 500); // Wait for the duration of the animation and then resolve
});


}
});


// Start the 3D rendering
animate();

