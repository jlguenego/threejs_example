(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('info').appendChild(warning);
		return;
	}

	const renderer = new THREE.WebGLRenderer();
	document.body.prepend(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.gammaOutput = true;

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(20, 20, 20);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);


	scene.add(new THREE.AxisHelper(1000));

	const objects = [];

	// generate some cubes in a random way.
	function generate(total, minX, minY, minZ, maxX, maxY, maxZ) {
		for (let i = 0; i < total; i++) {
			const width = (maxX - minX) / 20;
			const height = (maxY - minY) / 20;
			const depth = (maxZ - minZ) / 20;
			const geometry = new THREE.BoxGeometry(width, height, depth);
			var material = new THREE.MeshNormalMaterial();
			var cube = new THREE.Mesh(geometry, material);
			scene.add(cube);
			objects.push(cube);
			const posX = Math.random() * (maxX - minX);
			const posY = Math.random() * (maxY - minY);
			const posZ = Math.random() * (maxZ - minZ);
			cube.position.set(posX, posY, posZ);

		}
	}

	generate(20, 0, 0, 0, 10, 10, 10);

	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 2;
	controls.maxDistance = 500;
	controls.enablePan = true;

	const dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
	dragControls.addEventListener('dragstart', function(event) {
		console.log('dragstart');
		controls.enabled = false;
	});
	dragControls.addEventListener('dragend', function(event) {
		console.log('dragend');
		controls.enabled = true;
	});

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
	animate();

})();
