(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('info').appendChild(warning);
		return;
	}

	const renderer = new THREE.WebGLRenderer();
	document.body.prepend(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.gammaOutput = true;

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(0, -5, 0);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	const spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.position.set(5, 5, 5);
	spotLight.angle = Math.PI / 60;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 200;

	spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 10;
	spotLight.shadow.camera.far = 200;
	scene.add(spotLight);

	const lightHelper = new THREE.SpotLightHelper(spotLight);
	scene.add(lightHelper);

	let shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
	scene.add(shadowCameraHelper);

	scene.add(new THREE.AxisHelper(1000));

	const geometry = new THREE.BoxGeometry(3, 1, 0.2);
	var material = new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true });
	var plate = new THREE.Mesh(geometry, material);
	scene.add(plate);

	const geometryBox = new THREE.BoxGeometry(1, 1, 1);
	var box = new THREE.Mesh(geometryBox, material);
	scene.add(box);

	// Added value: controls.
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 2;
	controls.maxDistance = 500;
	controls.enablePan = true;
	// We do a render function
	function render() {
		lightHelper.update();
		shadowCameraHelper.update();
		renderer.render(scene, camera);
	}
	// we link it to the controls.
	controls.addEventListener('change', render);

	// init
	render();
})();
