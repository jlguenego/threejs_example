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

	document.body.prepend(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(0, -5, 2);
	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	var pointLight = new THREE.PointLight(0xffffff, 1);
	pointLight.position.set(5, 5, 5);
	scene.add(pointLight);

	// valeur ajoutée
	// ajout d'un spot de lumière
	const spotLight = new THREE.SpotLight(0xffffff, 0.5);

	spotLight.intensity = 10;
	spotLight.position.set(5, 5, 5);
	spotLight.angle = 0;
	spotLight.penumbra = 0.05; // netteté des bords du cone
	spotLight.decay = 2; // atténuation de la lumière par l'espace traversé
	spotLight.distance = 10;

	scene.add(spotLight);

	// materialiser le cone de lumière (debug)
	const lightHelper = new THREE.SpotLightHelper(spotLight);
	scene.add(lightHelper);

	const geometry = new THREE.BoxGeometry(3, 3, 0.2);
	// matière permettant de jouer sur les ombres sur les surfaces solides 
	// (obligatoire quand on utilise les spots)
	var material = new THREE.MeshPhongMaterial({ color: 0xffffff, dithering: true });
	var plate = new THREE.Mesh(geometry, material);
	scene.add(plate);

	var angle = 0.02;
	var inc = 0.0002;

	function animate() {
		requestAnimationFrame(animate);
		if (angle > 0.13) {
			inc = -inc;
		}
		if (angle <= 0.01) {
			inc = -inc;
		}
		angle += inc;
		spotLight.angle = angle;
		lightHelper.update();
		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'angle = ' + angle.toFixed(2);

	}

	animate();
})();
