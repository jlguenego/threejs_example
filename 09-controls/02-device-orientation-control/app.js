(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('info').appendChild(warning);
		return;
	}

	var loader = new THREE.TextureLoader();
	loader.load('../../img/map-monde.jpg', function(texture) {

		const renderer = new THREE.WebGLRenderer();
		document.body.prepend(renderer.domElement);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.gammaOutput = true;

		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.set(0, 0, 10);
		// let the camera at the origin.

		const controls = new THREE.DeviceOrientationControls(camera);

		var animate = function() {

			window.requestAnimationFrame(animate);

			controls.update();
			renderer.render(scene, camera);

		};

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
		scene.add(ambientLight);

		scene.add(new THREE.AxisHelper(1000));

		const geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshLambertMaterial({
			map: texture
		});
		material.side = THREE.DoubleSide;
		const cylinder = new THREE.Mesh(geometry, material);
		scene.add(cylinder);

		window.addEventListener('resize', function() {
			console.log('resize');
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			// on iphone the scroll needs to be done.
			window.scroll(0, 0);
		}, false);

		animate();
	});


})();
