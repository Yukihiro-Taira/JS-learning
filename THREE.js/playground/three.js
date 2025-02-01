import Lenis from 'lenis';
import * as THREE from 'three';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { fill } from 'three/src/extras/TextureUtils.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time)=>{
    lenis.raf(time*1000);

});

gsap.ticker.lagSmoothing(0);

//Scene Setup
const bgVideo = document.getElementById('video')
bgVideo.play();
const texture = new THREE.VideoTexture(bgVideo);
const scene = new THREE.Scene();
scene.background = texture;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
)

//Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});

renderer.setClearColor(0xffffff,1);
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.5;
document.querySelector('.model').appendChild(renderer.domElement);


//Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1);
mainLight.position.set(5, 10, 7.5)
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 3);
fillLight.position.set(-5, 0, -5)
scene.add(fillLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
hemiLight.position.set(0, 25, 0);
scene.add(hemiLight);



//model LOAD

let model;
const loader = new GLTFLoader();
loader.load('./assets/simple_cola_can.glb', ( gltf ) => {

    const scale = 0;
    model = gltf.scene;


    model.traverse((node) =>{
        if (node.isMesh){
            if (node.material) {
                node.material.metalness = 0.3;
                node.material.roughness = 0.4;
                node.material.envMapIntensity = 1.5;
            }
            node.castShadow = true;
            node.reciveShadow = true;
        }
    });

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    scene.add(model);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.z = maxDim * 1.5;

    model.scale.set(scale,scale,scale);
    playInitialAnimation();

    animate();
})

//animation Variables
const floatAmp = 0.2;
const floatSpeed = 1.5;
const rotationSpeed = 0.03;
let isFloating = true;
let currentScroll = 0;

const stickyHeight = window.innerHeight;
const scannerSection = document.querySelector(".scanner");
const scannerPos = scannerSection.offsetTop;
const scanContainer = document.querySelector(".scan-container");
gsap.set(scanContainer, {scale: 0});

//animation setup
function playInitialAnimation(){
    if(model){
        gsap.to(model.scale,{
            x: 1,
            y: 1,
            z: 1,
            duration : 1,
            ease: "power2.out",
        });
    }

    gsap.to(scanContainer, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
    });
};


ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "top -10",
    onEnterBack: ()=>{
        if (model){
            gsap.to(model.scale,{
                x:1,
                y:1,
                z:1,
                duration: 1,
                ease: "power2.out",
            });
            isFloating = true;
        }
        gsap.to(scanContainer, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
        });
    },
});

ScrollTrigger.create({
    trigger: ".scanner",
    start: "top top",
    end: `${stickyHeight}px`,
    pin: true,
    onEnter: () => {
        if(model){
            isFloating = false;
            model.position.y = 0;

            gsap.to(model.rotation,{
                y: model.rotation.y + Math.PI *2,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () =>{
                    gsap.to(model.scale,{
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.5,
                        ease: "power2.in",
                        onComplete: () => {
                            gsap.to(scanContainer,{
                                scale: 0,
                                duration: 0.5,
                                ease: "power2.in"
                            })
                        }
                    })
                }
            })
        }
    },

    onLeaveBack: () => {
        gsap.set(scanContainer, {scale: 0});
        gsap.to(scanContainer,{
            scale: 1,
            duration: 1,
            ease: "power2.out"
        })
    }
})


lenis.on("scroll", (e)=>{
    currentScroll = e.scroll;
});



function animate(){
    if (model) {
        if (isFloating){
            const floatOffset = Math.sin(Date.now()*0.0001 * floatSpeed)*floatAmp;
            model.position.y = floatOffset+200;

        }

        const scrollProgress = Math.min(currentScroll / scannerPos, 1);


        if (scrollProgress < 1) {
            model.rotation.x = scrollProgress * Math.PI * 2;
        }

        if (scrollProgress < 1) {
            model.rotation.y += 0.001 * rotationSpeed*Math.PI;
        }
    }

	// controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);

}
renderer.setAnimationLoop (animate);

function handleWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleWindowResize);