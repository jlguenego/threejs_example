(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('info').appendChild(warning);
		return;
	}



	function textureLoad(img) {
		return new Promise(function(fullfill, reject) {
			const loader = new THREE.TextureLoader();
			loader.load(img, fullfill);
		});
	}

	let earthTexture;
	let moonTexture;

	function run() {
		const renderer = new THREE.WebGLRenderer();
		document.body.prepend(renderer.domElement);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.gammaOutput = true;

		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.set(0, 0, 10);
		var origin = new THREE.Vector3(0, 0, 0);
		camera.lookAt(origin);
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

		const earthGeo = new THREE.SphereGeometry(5, 32, 32);
		var earthMat = new THREE.MeshLambertMaterial({
			map: earthTexture
		});
		const earth = new THREE.Mesh(earthGeo, earthMat);
		scene.add(earth);

		const moonGeo = new THREE.SphereGeometry(2, 32, 32);
		var moonMat = new THREE.MeshLambertMaterial({
			map: moonTexture
		});
		const moon = new THREE.Mesh(moonGeo, moonMat);
		scene.add(moon);
		moon.position.set(0, -10, 10);

		window.addEventListener('resize', function() {
			console.log('resize');
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			// on iphone the scroll needs to be done.
			window.scroll(0, 0);
		}, false);

		animate();
	}

	textureLoad('../../img/map-monde.jpg').then(function(texture) {
		earthTexture = texture;
		return textureLoad('../../img/map-moon.jpg');
	}).then(function(texture) {
		moonTexture = texture;
		run();
	}).catch(function(error) {
		console.error('error', error);
	});

})();
