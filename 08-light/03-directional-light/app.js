(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);

		return;
	}

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	// add this to have more light
	renderer.gammaOutput = true;
	// Valeur ajoutee: to have shadow on the plate. (Mandatory for directionalLight)
	renderer.shadowMap.enabled = true;

	document.body.prepend(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(0, -5, 2);
	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	// Valeur ajoutee: directional Light.
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	scene.add(directionalLight);

	// Helper
	var helper = new THREE.DirectionalLightHelper(directionalLight, 50);
	scene.add(helper);

	const material = new THREE.MeshPhongMaterial({ color: 0xffffff, dithering: true });

	const plateG = new THREE.BoxGeometry(3, 3, 0.2);
	var plateM = new THREE.Mesh(plateG, material);
	scene.add(plateM);

	const cylinderG = new THREE.CylinderGeometry(0.2, 0.2, 1);
	var cylinderM = new THREE.Mesh(cylinderG, material);
	scene.add(cylinderM);

	cylinderM.rotation.x += Math.PI / 2;
	// cylinderM.position.set(0, 0, 0.5);

	let angle = 180;

	directionalLight.castShadow = true;
	cylinderM.castShadow = true;
	plateM.receiveShadow = true;

	function animate() {
		requestAnimationFrame(animate);
		angle -= 0.1;


		directionalLight.position.set(Math.cos(angle * Math.PI / 180), 1, Math.sin(angle * Math.PI / 180)).normalize();

		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'angle = ' + angle.toFixed(2) + ' ' +
			Math.cos(angle * Math.PI / 180).toFixed(2) +
			' ' +
			Math.sin(angle * Math.PI / 180).toFixed(2);

	}

	animate();
})();
