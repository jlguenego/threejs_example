(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('info').appendChild(warning);
		return;
	}

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(5, 5, 5);
	const origin = new THREE.Object3D();
	camera.lookAt(origin.position);

	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.prepend(renderer.domElement);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	const cubeG = new THREE.BoxGeometry(1, 1, 1);
	const cubeM = new THREE.MeshStandardMaterial();
	const cube = new THREE.Mesh(cubeG, cubeM);
	cube.castShadow = false;
	cube.receiveShadow = true;
	scene.add(cube);

	const smallcubeG = new THREE.BoxGeometry(0.2, 1, 0.2);
	const smallcubeM = new THREE.MeshStandardMaterial();
	const smallcube = new THREE.Mesh(smallcubeG, smallcubeM);
	smallcube.castShadow = true;
	smallcube.receiveShadow = false;
	scene.add(smallcube);
	smallcube.position.set(0, 0.6, 0);

	const light = new THREE.RectAreaLight(0xffffff, 10000, 2, 3);
	console.log('light', light.intensity);
	light.intensity = 20.0;
	console.log('light', light);

	scene.add(light);

	const rectLightHelper = new THREE.RectAreaLightHelper(light);
	scene.add(rectLightHelper);

	var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	/* position the light so it shines on the cube (x, y, z) */
	scene.add(ambientLight);

	let i = 0;

	var animate = function(ts) {
		requestAnimationFrame(animate);
		i += 0.01;

		light.position.set(-2 * Math.cos(i), 1, 2 * Math.sin(i));
		light.lookAt(origin.position);

		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'Warning: shadow not implemented in threeJS r83... RectAreaLight angle = ' + i.toFixed(2);
	};

	animate();
})();
