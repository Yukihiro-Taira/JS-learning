import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
//Setup//
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, width/height, 0.1,1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement);
//----------------------------------------------------------//

//Variables//
const vertices = [];
const POPcount = 10000;
const POPmax = 2000/2;
const POPmin = -2000/2;

for ( let i = 0; i < POPcount; i++ ) {
	const x = Math.random([i])*(POPmax-POPmin)+POPmin;
	const y = Math.random([i])*(POPmax-POPmin)+POPmin;
	const z = Math.random([i])*(POPmax-POPmin)+POPmin;

	vertices.push( x, y, z );
}



const geometry = new THREE.InstancedBufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );


const material = new THREE.PointsMaterial( { color: 0x888888 } );
const points = new THREE.Points( geometry, material );


scene.add( points );
console.log(vertices);
camera.position.z = 5;


function animate(){

    renderer.render(scene,camera)
}
renderer.setAnimationLoop (animate);