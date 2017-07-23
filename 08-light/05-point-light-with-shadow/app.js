(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('info').appendChild(warning);
		return;
	}

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
	camera.position.set(5, 5, 5);
	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.prepend(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	const cubeG = new THREE.BoxGeometry(1, 1, 1);
	const cubeM = new THREE.MeshLambertMaterial({ color: 0xffffff });
	const cube = new THREE.Mesh(cubeG, cubeM);
	cube.castShadow = false;
	cube.receiveShadow = true;
	scene.add(cube);

	const smallcubeG = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	const smallcubeM = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const smallcube = new THREE.Mesh(smallcubeG, smallcubeM);
    smallcube.castShadow = true;
	smallcube.receiveShadow = false;
	scene.add(smallcube);
	smallcube.position.set(0, 0.6, 0);

	var lightColor = new THREE.Color();
	lightColor.setHSL(0, 1, 0.5);

	var light = new THREE.PointLight(lightColor, 1);
	/* position the light so it shines on the cube (x, y, z) */
    light.position.set(-5, 5, 5);
    light.castShadow = true;
	scene.add(light);

	var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	/* position the light so it shines on the cube (x, y, z) */
	scene.add(ambientLight);

	var hue = 0;

	var animate = function(ts) {
		requestAnimationFrame(animate);

		hue += 0.001;
		light.color = new THREE.Color().setHSL(hue, 1, 0.5);
		renderer.render(scene, camera);
		document.getElementById('info').innerText = 'Warning: shadow may slow down your PC... Hue = ' + Math.round((hue * 360) % 360);
	};

	animate();
})();
