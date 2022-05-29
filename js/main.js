//variables de modulos o librerias
import * as THREE from '../modules/three.module.js';
import Stats from '../modules/stats.module.js';
import { STLLoader } from '../modules/STLLoader.js';
import {PointerLockControls} from '../modules/PointerLockControls.js';
//variables de elementos
let modelos = document.getElementById('sel');
let cargaI = document.getElementById('mod');
let papal = document.getElementById('pm');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn4 = document.getElementById('btn4');
let btn5 = document.getElementById('btn5');
let m1 = document.getElementById('cM1');
let m2 = document.getElementById('cM2');
let m3 = document.getElementById('cM3');
let t1 = document.getElementById('cT1');
let t2 = document.getElementById('cT2');
let t3 = document.getElementById('cT3');
let xM, yM, zM, xT, yT, zT, a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0;
let xdir = 0, zdir = 0;
let tiempoI, tiempoF, vel, delta;
let camera, scene, renderer, pControl;
tiempoI = Date.now();
vel = 50;
//seleciión del modelo
modelos.addEventListener('change',(e)=>{	
	let valor = e.target.value;
		switch (valor) {
			case 'Khonsu':
				cargaI.src = "./src/img/khonsu.webp";
				adios();
				btn1.classList.remove('visually-hidden');
			break;
			case 'Katana':
				cargaI.src = "./src/img/katana.webp";
				adios();
				btn2.classList.remove('visually-hidden');
			break;
			case 'Dragon':
				cargaI.src = "./src/img/dragoncito.webp";
				adios();
				btn3.classList.remove('visually-hidden');	
			break;
			case 'Groot':
				cargaI.src = "./src/img/groot.webp";
				adios();
				btn4.classList.remove('visually-hidden');
			break;
			case 'Vikingo':
				cargaI.src = "./src/img/vikingo.webp";					
				adios();
				btn5.classList.remove('visually-hidden');	
			break;
			default:
				cargaI.src = "./src/img/cargas.webp";
			break;
		}
});
//funciones de botón
btn1.addEventListener('click',()=>{
	clean();
	khonsu();
	fp();
});
btn2.addEventListener('click',()=>{
	clean();
	katana();
	fp();	
});
btn3.addEventListener('click',()=>{
	clean();
	dragon();	
	fp();
});
btn4.addEventListener('click',()=>{
	clean();
	groot();
	fp();
});
btn5.addEventListener('click',()=>{
	clean();
	vikingo();	
	fp();
});
function adios(){
	btn1.classList.add('visually-hidden');
	btn2.classList.add('visually-hidden');
	btn3.classList.add('visually-hidden');
	btn4.classList.add('visually-hidden');
	btn5.classList.add('visually-hidden');
}
//funciones para carga del modelo
function groot(){
	init();
	animate();
	function init() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.y = 10;
		camera.position.x = 20;
		camera.position.z = 30;
		scene = new THREE.Scene();
		scene.background = new THREE.Color("rgb(80, 127, 128)");
		scene.fog = new THREE.Fog( 192, 192, 192 );
		scene.add(new THREE.GridHelper(10000, 1000));
		// ASCII file
		const loader = new STLLoader();
		loader.load( './src/modelos/GrootBottom.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0x784315, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( -0.20, 4.5, -0.10);
			mesh.rotation.set( Math.PI / 2, 0.5, 3 );
			mesh.scale.set( 0.1, 0.1, 0.1 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Binary files
		const material = new THREE.MeshPhongMaterial( { color: 0x784315, specular: 0x111111, shininess: 200 } )
		loader.load( './src/modelos/GrootTop.stl', function ( geometry ) {
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 15.9, 13.3, -2.65 );
			mesh.rotation.set( - Math.PI / 2, -0.5, 0.18 );
			mesh.scale.set( 0.1, 0.1, 0.1 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Lights
		scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
		addShadowedLight( 1, 1, 1, 0xB395F5, 1.35 );
		addShadowedLight( 0.5, 1, - 1,0x75FA8D, 1 );
		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( papal.clientWidth, (papal.clientWidth*.60),false );
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		papal.appendChild( renderer.domElement );

		// stats = new Stats();
        // papal.appendChild( stats.dom );
		
		pControl = new PointerLockControls(camera, renderer.domElement);
		window.addEventListener( 'resize', onWindowResize );
	}
	function addShadowedLight( x, y, z, color, intensity ) {
		const directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		scene.add( directionalLight );
		directionalLight.castShadow = true;
		const d = 1;
		directionalLight.shadow.camera.left = - d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = - d;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 4;
		directionalLight.shadow.bias = - 0.002;
	}	
}
function katana(){
	init();
	animate();
	function init() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.y = 10;
		camera.position.z = 10;
		camera.position.x = -7;
		scene = new THREE.Scene();
		scene.background = new THREE.Color("rgb(80, 127, 128)");
		scene.fog = new THREE.Fog( 192, 192, 192 );
		scene.add(new THREE.GridHelper(10000, 1000));
		// ASCII file
		const loader = new STLLoader();
		loader.load( './src/modelos/blade_.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.190, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
			loader.load( './src/modelos/FUCHI.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xC0C0C0, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.180, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// loader.load( './objects/pr2_head_tilt.stl', function ( geometry ) {
			loader.load( './src/modelos/HABAKI.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xC0C0C0, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.180, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		loader.load( './src/modelos/HO_HALF_2.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xFF531E, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.190, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		loader.load( './src/modelos/HO_WARP_HALF_2.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xFF531E, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.190, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		loader.load( './src/modelos/HO_WRAP_HALF_1.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xFF531E, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.190, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		loader.load( './src/modelos/HO_WRAP.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.190, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		loader.load( './src/modelos/HO.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xFF0000, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.180, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		loader.load( './src/modelos/KASHIRA.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xC0C0C0, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.180, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		loader.load( './src/modelos/TUSBA.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.180, 8, 0.1 );
			mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
			mesh.scale.set( 0.020, 0.020, 0.020 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Lights
		scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
		addShadowedLight( 1, 1, 1, 0xff6400, 1.35 );
		addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );
		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( papal.clientWidth, (papal.clientWidth*.60) );
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		papal.appendChild( renderer.domElement );
		
		pControl = new PointerLockControls(camera, renderer.domElement);
		window.addEventListener( 'resize', onWindowResize );
	}
	function addShadowedLight( x, y, z, color, intensity ) {
		const directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		scene.add( directionalLight );
		directionalLight.castShadow = true;
		const d = 1;
		directionalLight.shadow.camera.left = - d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = - d;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 4;
		directionalLight.shadow.bias = - 0.002;
	}
}
function dragon(){
	init();
	animate();
	function init() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.y = 10;
		camera.position.z = 50;
		scene = new THREE.Scene();
		scene.background = new THREE.Color("rgb(80, 127, 128)");
		scene.fog = new THREE.Fog( 192, 192, 192 );
		scene.add(new THREE.GridHelper(10000, 1000));
		// ASCII file
		const loader = new STLLoader();
		loader.load( './src/modelos/dragon.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0x232321, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.13, 1, -0.75 );
			mesh.rotation.set( Math.PI / 2, -3.1, 3 );
			mesh.scale.set( 0.30, 0.30, 0.30 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Binary files
		const material = new THREE.MeshPhongMaterial( { color: 0x818080, specular: 0x111111, shininess: 200 } )
		loader.load( './src/modelos/hevito.stl', function ( geometry ) {
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0.13, -3, - 0.75 );
			mesh.rotation.set( - Math.PI / 2, 0, 0 );
			mesh.scale.set( 0.30, 0.30, 0.30 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Lights
		scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
		addShadowedLight( 1, 1, 1, 0x6A2C03, 1.35 );
		addShadowedLight( 0.5, 1, - 1,0xDF650C, 1 );
		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( papal.clientWidth,(papal.clientWidth*.60) );
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		papal.appendChild( renderer.domElement );

		pControl = new PointerLockControls(camera, renderer.domElement);
		window.addEventListener( 'resize', onWindowResize );
	}
	function addShadowedLight( x, y, z, color, intensity ) {
		const directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		scene.add( directionalLight );
		directionalLight.castShadow = true;
		const d = 1;
		directionalLight.shadow.camera.left = - d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = - d;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 4;
		directionalLight.shadow.bias = - 0.002;
	}	
}
function vikingo(){
	init();
	animate();
	function init() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.y = 10;
		camera.position.x = 10;
		camera.position.z = 25;
		scene = new THREE.Scene();
		scene.background = new THREE.Color("rgb(80, 127, 128)");
		scene.fog = new THREE.Fog( 192, 192, 192 );
		scene.add(new THREE.GridHelper(10000, 1000));
		// ASCII file
		const loader = new STLLoader();
		loader.load( './src/modelos/VIKING.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0x87672D, specular: 0x1B150B, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 10, 11, 3 );
			mesh.rotation.set( 1.5*Math.PI, 0, 1.5);
			mesh.scale.set( 0.035, 0.035, 0.035 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Lights
		scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
		addShadowedLight( 1, 1, 1, 0xB395F5, 1.35 );
		addShadowedLight( 0.5, 1, - 1,0x75FA8D, 1 );
		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( papal.clientWidth,(papal.clientWidth*.60) );
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		papal.appendChild( renderer.domElement );

		pControl = new PointerLockControls(camera, renderer.domElement);
		window.addEventListener( 'resize', onWindowResize );
	}
	function addShadowedLight( x, y, z, color, intensity ) {
		const directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		scene.add( directionalLight );
		directionalLight.castShadow = true;
		const d = 1;
		directionalLight.shadow.camera.left = - d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = - d;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 4;
		directionalLight.shadow.bias = - 0.002;
	}
}
function khonsu(){	
	init();
	animate();
	function init() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.y = 10;
		camera.position.z = 20;
		scene = new THREE.Scene();
		scene.background = new THREE.Color("rgb(80, 127, 128)");
		scene.fog = new THREE.Fog( 192, 192, 192 );
		scene.add(new THREE.GridHelper(10000, 1000));
		// ASCII file
		const loader = new STLLoader();
		loader.load( './src/modelos/full.stl', function ( geometry ) {
			const material = new THREE.MeshPhongMaterial( { color: 0xC8A25F, specular: 0x111111, shininess: 200 } );
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( -0.005, 18, -0.77 );
			mesh.rotation.set( Math.PI / 2, -3.1, 3 );
			mesh.scale.set( 0.10, 0.10, 0.10 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Binary files
		const material = new THREE.MeshPhongMaterial( { color: 0x784315, specular: 0x111111, shininess: 200 } )
		loader.load( './src/modelos/FlatBase.stl', function ( geometry ) {
			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( -5.5, 18, - 0.78 );
			mesh.rotation.set( - Math.PI / 2, 0, 0 );
			mesh.scale.set( 0.15, 0.15, 0.15 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Lights
		scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
		addShadowedLight( 1, 1, 1, 0xB395F5, 1.35 );
		addShadowedLight( 0.5, 1, - 1,0x75FA8D, 1 );
		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( papal.clientWidth, (papal.clientWidth*.60) );
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		papal.appendChild( renderer.domElement );

		pControl = new PointerLockControls(camera, renderer.domElement);
		window.addEventListener( 'resize', onWindowResize );
	}
	function addShadowedLight( x, y, z, color, intensity ) {
		const directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		scene.add( directionalLight );
		directionalLight.castShadow = true;
		const d = 1;
		directionalLight.shadow.camera.left = - d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = - d;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 4;
		directionalLight.shadow.bias = - 0.002;
	}
}	
//funciones para render
function onWindowResize() {
	camera.aspect = papal.clientWidth, (papal.clientWidth*.60);
	camera.updateProjectionMatrix();
	renderer.setSize( papal.clientWidth, (papal.clientWidth*.60) );
}
document.getElementById('btnPlay').onclick = () =>{
    pControl.lock();
};
function animate() {
	requestAnimationFrame( animate );
	if(pControl.isLocked === true){
        tiempoF = Date.now();

        delta = (tiempoF - tiempoI) / 1000;

        let xDis = xdir * vel * delta;
        let zDis = zdir * vel * delta;

        pControl.moveRight(xDis)
        pControl.moveForward(zDis)

        tiempoI = tiempoF;
    }
	xM = camera.rotation.x.toFixed(2);
	yM = camera.rotation.y.toFixed(2);
	zM = camera.rotation.z.toFixed(2);
	xT = camera.position.x.toFixed(2);
	yT = camera.position.y.toFixed(2);
	zT = camera.position.z.toFixed(2);

	m1.textContent = xM;
	m2.textContent = yM;
	m3.textContent = zM;
	t1.textContent = xT;
	t2.textContent = yT;
	t3.textContent = zT;

	if(xM != a1 || yM != a2 || zM != a3 || xT != a4 || zT != a6){
		a1 = xM;
		a2 = yM;
		a3 = zM;
		a4 = xT;
		a5 = yT;
		a6 = zT;
		let data = {
			'xM' : a1,
			'yM' : a2,
			'zM' : a3,
			'xT' : a4,
			'yT' : a5,
			'zT' : a6
		};
		fetch('https://voicebackend.000webhostapp.com/backend/insert.php', {
			method: 'POST',
			body: JSON.stringify(data),					
		}).then(res =>	{
			if(res.ok)
				return res.text()
			else
				throw new Error(res.status)
		})
		.then(data => {
			console.log("Datos: " + data);
		})
		.catch(error => {
			console.log("Error: ", error.message);
		});					
	}
	renderer.render(scene, camera);
	// stats.update();
}
//otras funciones
function clean(){
	while(papal.hasChildNodes()){
		papal.removeChild(papal.firstChild);
	}
}
function  fp(){
	let fps = papal.lastChild;	
	fps.style.left ='90%';
}	 		
document.addEventListener('keydown', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = -1
        break;
        case 38:
            zdir = 1
        break;
        case 39:
            xdir = 1
        break;
        case 40:
            zdir = -1
        break;
    }
});
document.addEventListener('keyup', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = 0
        break;
        case 38:
            zdir = 0
        break;
        case 39:
            xdir = 0
        break;
        case 40:
            zdir = 0
        break;
    }
});
//RECONOCIMIENTO DE VOZ
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let gramatica = ['DESPLAZA', 'GIRA', 'IZQUIERDA', 'DERECHA', 'ARRIBA', 'ABAJO', 'ATRÁS', 'ADELANTE', 'DETENTE'];
recognition.interimResults = true;
recognition.lang = "es-MX";
	window.onload = (e) => {
		if (validateSpeechRecognition()) {
			alert("¡El navegador es compatible con Speech Recocgnition API!");
			recognition.start();
		}else{
			alert("El navegador NO es compatible con Speech Recocgnition API");
		}            
	}
	recognition.onresult = (e) => {
        let text = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");

        text = text.toUpperCase();		
        let arrayText = text.split(" ");        
		console.log(text);
        if (e.results[0].isFinal) {
            if (validaGramatica(arrayText[0], arrayText[1], gramatica[0], gramatica[1], gramatica[2], gramatica[3], gramatica[4], gramatica[5], gramatica[6], gramatica[7], gramatica[8])) {
                // console.log("texto: " + arrayText[0], arrayText[1]);
				if(arrayText[0] == 'DESPLAZA'){
					switch (arrayText[1]) {
						case 'ADELANTE':
							zdir = 1;
						break;
						case 'ATRÁS':
							zdir = -1;
						break;
						case 'IZQUIERDA':
							xdir = -1;
						break;
						case 'DERECHA':
							xdir = 1;
						break;
					}
				}else if(arrayText[0] == 'GIRA'){
					switch (arrayText[1]) {
						case 'ARRIBA':							
							camera.rotation.x += 0.5;
	// zM = camera.rotation.z.toFixed(2);
						break;
						case 'ABAJO':
							camera.rotation.x -= 0.5;
						break;
						case 'IZQUIERDA':
							camera.rotation.y += 0.5;
						break;
						case 'DERECHA':
							camera.rotation.y -= 0.5;
						break;
					}
				}else if(arrayText[0] == 'DETENTE'){
					xdir = 0;
					zdir = 0;
				}
            }
        }
    };
	recognition.onend = () => {
        recognition.start();
    };

    recognition.onstart = () => {
        console.log('Speech recognition service has started');
    };

    function validateSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) ||
            !window.hasOwnProperty("webkitSpeechRecognition") ||
            typeof (webkitSpeechRecognition) != "function"
        ){
            return false;
        }else {
            return true;
        }
    }

    function validaGramatica(palabra1, palabra2, gramatica1, gramatica2, gramatica3, gramatica4, gramatica5, gramatica6, gramatica7, gramatica8, gramatica9) {
        if (palabra1 == gramatica1 || palabra1 == gramatica2) {
			if(palabra2 == gramatica3 || palabra2 == gramatica4 || palabra2 == gramatica5 || palabra2 == gramatica6 || palabra2 == gramatica7 || palabra2 == gramatica8){
				return true;
			}            
        }else if(palabra1 == gramatica9){
			return true;
        }else{
			return false; 
		}
    }