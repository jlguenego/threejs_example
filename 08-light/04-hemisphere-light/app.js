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

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(0, -5, 2);
	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);


	// Valeur ajoutee: directional Light.
	const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0xffff00, 1);
	scene.add(hemisphereLight);

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

	let hue = 0;

	function animate() {
		requestAnimationFrame(animate);

		hue += 0.001;
		hemisphereLight.color.setHSL(hue, 1, 0.5);
		hemisphereLight.groundColor.setHSL(hue + 0.33, 1, 0.5);


		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'hue = ' + hue.toFixed(2);

	}

	animate();
})();
