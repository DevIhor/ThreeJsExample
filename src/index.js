import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Color,
	BoxGeometry,
	MeshPhongMaterial,
	Mesh,
	DirectionalLight,
	EdgesHelper
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new Scene();
scene.background = new Color('lightblue');

// const directionalLight = new DirectionalLight(0xff0000, 1.0);
// scene.add(directionalLight);

const dirLight = new DirectionalLight(0xffffff);
dirLight.position.set(5, 9, 5).normalize();
scene.add(dirLight);

// {
// 	const color = 0xffffff;
// 	const intensity = 50;
// 	const light = new DirectionalLight(color, intensity);
// 	light.position.set(20, 40, 80);
// 	scene.add(light);
// }

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new BoxGeometry(10, 0.1, 10);
const material = new MeshPhongMaterial({color: 0x00ff00})
const cube = new Mesh(geometry, material);
scene.add(cube);

const cube2 = new Mesh(new BoxGeometry(), new MeshPhongMaterial({color: 0xff0000}));
scene.add(cube2);
cube2.position.set(0, 0.5, 0);

const edges = new EdgesHelper(cube, 0x808080);
edges.material.linewidth = 3;

scene.add(edges);

camera.position.set(3, 3, 6);
camera.lookAt(cube.position)

// let loader = new GLTFLoader();
// loader.load('./src/models/scene.gltf', function (gltf) {
//     gltf.scene.traverse(function (child) {
//         if (child.isMesh) {
//             child.geometry.center(); // center here
//         }
//     });
//     scene.add(gltf.scene);
// 	camera.lookAt(gltf.scene.position)
// }, (xhr) => xhr, (err) => console.error(e));

function animate() {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// edges.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// edges.rotation.y += 0.01;

	controls.update();

	renderer.render(scene, camera);
}

if (WEBGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WEBGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}
