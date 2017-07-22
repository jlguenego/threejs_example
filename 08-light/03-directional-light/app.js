(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);

		return;
	}

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.gammaOutput = true;
	document.body.prepend(renderer.domElement);

	// Valeur ajoutee: to have shadow on the plate. (Mandatory for directionalLight)
	console.log('renderer.shadowMap.enabled', renderer.shadowMap.enabled);
	renderer.shadowMap.enabled = true; // allow shadow processing.
	console.log('renderer.shadowMap.enabled', renderer.shadowMap.enabled);
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(0, -5, 2);
	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	// Valeur ajoutee: directional Light.
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 512; // default
	directionalLight.shadow.mapSize.height = 512; // default
	directionalLight.shadow.camera.near = 0.1; // default
	directionalLight.shadow.camera.far = 40; // default
	scene.add(directionalLight);

	// Helper
	const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
	scene.add(helper);

	const material = new THREE.MeshStandardMaterial({ color: 0xffffff, dithering: true });

	const plateG = new THREE.BoxGeometry(3, 3, 0.2);
	const plateM = new THREE.Mesh(plateG, material);
	plateM.receiveShadow = true;
	plateM.castShadow = true;
	scene.add(plateM);

	const cylinderG = new THREE.CylinderGeometry(0.2, 0.2, 1, 20);
	const cylinderM = new THREE.Mesh(cylinderG, material);
	cylinderM.receiveShadow = true;
	cylinderM.castShadow = true;
	cylinderM.rotation.x += Math.PI / 2;
	cylinderM.position.z += 0.3;
	scene.add(cylinderM);

	let angle = 180;

	function animate() {
		requestAnimationFrame(animate);
		angle -= 0.1;


		directionalLight.position.set(
			20 * Math.cos(angle * Math.PI / 180),
			20 * Math.sin(angle * Math.PI / 180),
			20 * Math.sin(angle * Math.PI / 180));


		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'angle = ' + angle.toFixed(2) + ' ' +
			Math.cos(angle * Math.PI / 180).toFixed(2) +
			' ' +
			Math.sin(angle * Math.PI / 180).toFixed(2);

	}

	animate();
})();
