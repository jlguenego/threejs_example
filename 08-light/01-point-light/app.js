(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);

		return;
	}

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.prepend(renderer.domElement);

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	var lightColor = new THREE.Color();
	lightColor.setHSL(0, 1, 0.5);

	var light = new THREE.PointLight(lightColor, 1);
	/* position the light so it shines on the cube (x, y, z) */
	light.position.set(5, 5, 5);
	scene.add(light);

	var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	/* position the light so it shines on the cube (x, y, z) */
	scene.add(ambientLight);

	camera.position.z = 5;

	cube.rotation.x += 0.5;
	cube.rotation.y += 0.5;

	var inc = 0.01;
	var hue = 0;

	var animate = function(ts) {
		requestAnimationFrame(animate);

		hue += 0.001;
		light.color = new THREE.Color().setHSL(hue, 1, 0.5);
		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'Hue = ' + Math.round((hue * 360) % 360);
	};

	animate();
})();
