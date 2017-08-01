(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('info').appendChild(warning);
		return;
	}

	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xcccccc, 0.01);

	const renderer = new THREE.WebGLRenderer();
	// add this to have a backgroundcolor
	renderer.setClearColor(scene.fog.color);
	document.body.prepend(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);



	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(20, 20, 20);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
	scene.add(ambientLight);


	scene.add(new THREE.AxisHelper(1000));

	const objects = [];

	// generate some cubes in a random way.
	function generate(total, minX, minY, minZ, maxX, maxY, maxZ) {
		for (let i = 0; i < total; i++) {
			const width = (maxX - minX) / 100;
			const height = (maxY - minY) / 200;
			const depth = (maxZ - minZ) / 200;
			const geometry = new THREE.BoxGeometry(width, height, depth);
			var material = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading });
			var cube = new THREE.Mesh(geometry, material);
			scene.add(cube);
			objects.push(cube);
			const posX = Math.random() * (maxX - minX) + minX;
			const posY = Math.random() * (maxY - minY) + minY;
			const posZ = Math.random() * (maxZ - minZ) + minZ;
			cube.position.set(posX, posY, posZ);

		}
	}

	generate(1000, -100, -100, -100, 100, 100, 100);

	// light
	var light1 = new THREE.DirectionalLight(0xffffff);
	light1.position.set(0, 1, 1);
	scene.add(light1);
	var light2 = new THREE.DirectionalLight(0x002288);
	light2.position.set(-1, 0, -1);
	scene.add(light2);
	var light3 = new THREE.AmbientLight(0x222222);
	light2.position.set(-1, -1, 0);
	scene.add(light3);

	const controls = new THREE.TrackballControls(camera);

	function animate() {
		requestAnimationFrame(animate);
		controls.update();
	}


	function render() {
		renderer.render(scene, camera);
	}

	controls.addEventListener('change', render);

	window.addEventListener('resize', function() {
		console.log('resize');
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		controls.handleResize();

		// on iphone the scroll needs to be done.
		window.scroll(0, 0);
	}, false);

	render();
	animate();

})();
