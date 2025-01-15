import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { lightPosition } from 'three/src/nodes/TSL.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';
import { fog } from 'three/tsl';
//Setup//
const width = window.innerWidth;
const height = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera( 50, width/height, 0.1,1000);
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
});

renderer.setSize(width, height);
document.body.appendChild( renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
//----------------------------------------------------------//
const loader = new GLTFLoader();
loader.load('./assets/scene.gltf',	function ( gltf ) {

	scene.add( gltf.scene );

	gltf.animations; // Array<THREE.AnimationClip>
	gltf.scene; // THREE.Group
	gltf.scenes; // Array<THREE.Group>
	gltf.cameras; // Array<THREE.Camera>
	gltf.asset; // Object

},
// called while loading is progressing
function ( xhr ) {

	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

	console.log( 'An error happened' );

}
);



//Variables//
const vertices = [];
const POPcount = 100000;
const POPmax = 500/2;
const POPmin = -1000/2;
const mouse = {
	x: 0,
	y: 0,
	z: 0
}





document.addEventListener('mousemove', (e)=>{
	mouse.x = e.x*0.01;
	mouse.y = e.y*0.01;
})

for ( let i = 0; i < POPcount; i++ ) {
	const x = Math.random([i])*(POPmax-POPmin)+POPmin;
	const y = Math.random([i])*(POPmax-POPmin)+POPmin;
	const z = Math.random([i])*(POPmax-POPmin)+POPmin;

	vertices.push( x, y, z );
}
//geo
const phiStart = 5
const phiLength = 7;
const sphere = new THREE.SphereGeometry(1,32,16,phiStart,phiLength

)
const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

//MImports




//Materials
const sphereMat = new THREE.MeshPhysicalMaterial({
	color: 'grey',

})


const material = new THREE.PointsMaterial( { 
	color: 0x888888,
	size: .25

} );

//Mesh Assignment
const sphereMesh = new THREE.Mesh(sphere,sphereMat);
const points = new THREE.Points( geometry, material );


//Lights
const light1 = new THREE.DirectionalLight(0xAE76A6, 1,);
const light2 = new THREE.DirectionalLight(0x89D2DC, 1);
light1.position.set(5,10,7.5);
light2.position.set(-5, -6.56, -7.5);

sphereMesh.position.set(0,0,-1);



//Camera
camera.position.z = 5;
camera.position.set( 0, 0, 5 );


scene.add(sphereMesh);
scene.add(light1,light2);
scene.add( points );


//Render
// renderer.setClearColor(new THREE.Color('#21282a'), 1);


let scrollPosY = 0;
let goalPos =0;
const rate = 0.1;

function animate(){

	light1.position.z -= 0.1;
	light1.position.y -= 0.1;

	light2.position.z += 0.05;
	light2.position.y += 0.05;


	

	// controls.update();
    renderer.render(scene,camera)

	// console.log(points.position)
	points.position.x += 0
	points.position.y += 0
	points.position.z += 0.01



	
}
renderer.setAnimationLoop (animate);

window.addEventListener("scroll", () => {
	const scrolled = window.scrollY;
	scrollPosY = (window.scrollY / document.body.clientHeight);
	
	console.log(scrolled)
  });


  function handleWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleWindowResize);