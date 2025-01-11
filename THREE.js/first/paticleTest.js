import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { lightPosition } from 'three/src/nodes/TSL.js';
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
const POPcount = 100000;
const POPmax = 500/2;
const POPmin = -1000/2;
const mouse = {
	x: 0,
	y: 0,
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
const sphere = new THREE.SphereGeometry(1,32,16)
const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
//Materials
const sphereMat = new THREE.MeshStandardMaterial({
	color: 'grey',

})
const material = new THREE.PointsMaterial( { 
	color: 0x888888,
	size: 1

} );

//Mesh Assignment
const sphereMesh = new THREE.Mesh(sphere,sphereMat);
const points = new THREE.Points( geometry, material );

//Lights
const light1 = new THREE.PointLight(0xffffff, 1, 5, 1);
light1.position.set(0,1.3,0)
sphereMesh.position.set(0,0,-1)

//Camera
camera.position.z = 5;

console.log(light1)


scene.add(sphereMesh);
scene.add(light1);
scene.add( points );

//Render
// renderer.setClearColor(new THREE.Color('#21282a'), 1);

function animate(){



	light1.position.x += .001;
	light1.position.y += .001;



    renderer.render(scene,camera)

	// console.log(points.position)
	points.position.x += 0
	points.position.y += 0
	points.position.z += 0.01
	
}
renderer.setAnimationLoop (animate);