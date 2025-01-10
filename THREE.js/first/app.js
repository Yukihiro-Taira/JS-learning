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

//POP assign//
const vertices = [];
const POPcount = 1000;

for ( let i = 0; i < POPcount; i++ ) {
	const x = Math.random([i])*0.5;
	const y = Math.random([i])*0.5;
	const z = Math.random([i])*0.5;

	vertices.push( x, y, z );
}

//Content//
const geometry = new THREE.BoxGeometry(1,1.5,1);
const geometry2 = new THREE.TorusGeometry(1,0.4,10,100);
const POPgeo1 = new THREE.BufferGeometry();

//Materials//
//--basic--//
const material = new THREE.MeshStandardMaterial({
    color: 'grey',
    envMapIntensity: 1   
});
//--POP--//
const materialPOP = new THREE.PointsMaterial({size: 0.1})

const particleArray = new Float32Array(vertices, 3);

// for(let i = 0; i<particleArray; i++){
//     particleArray[i] = Math.random();
// }
console.log(particleArray)
POPgeo1.setAttribute('position', new THREE.Float32BufferAttribute(particleArray, 3))


//Mesh//
const cube = new THREE.Mesh( geometry,material);
const cubePOP = new THREE.Mesh( geometry2,materialPOP);
const pariticleMesh = new THREE.Mesh( POPgeo1,material);

//HDRi load
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const hdriLoader = new RGBELoader()
hdriLoader.load( 'assets/marry_hall_4k.hdr', function ( texture ) {
  const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
  texture.dispose(); 
  scene.environment = envMap
} );
console.log(pariticleMesh)
//Add to scene
//scene.add(cube);
scene.add(pariticleMesh,/*cube,cubePOP*/);



camera.position.z = 5;


function animate(){
    cubePOP.rotation.x += Math.sin(0.01);
    cubePOP.rotation.y += Math.sin(0.01);
    cube.rotation.x += 0.01;
    cube.rotation.z += 0.01;
    renderer.render(scene,camera)
}
renderer.setAnimationLoop (animate);