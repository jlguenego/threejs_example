(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);

		return;
	}

	var origin = new THREE.Vector3(0, 0, 0);

	var renderer1 = new THREE.WebGLRenderer();
	renderer1.setSize(300, 200);
	document.getElementById('renderer1').appendChild(renderer1.domElement);

	var renderer2 = new THREE.WebGLRenderer();
	renderer2.setSize(300, 200);
	document.getElementById('renderer2').appendChild(renderer2.domElement);

	var scene = new THREE.Scene();

	var camera1 = new THREE.PerspectiveCamera(50, 300 / 200, 0.1, 10000);
	camera1.position.set(0, 0, 5);
	camera1.lookAt(origin);
	scene.add(camera1);

	var camera2 = new THREE.PerspectiveCamera(50, 300 / 200, 0.1, 10000);
	camera2.position.set(5, 0, 0);
	camera2.lookAt(origin);
	scene.add(camera2);

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshNormalMaterial();
	material.side = THREE.DoubleSide;
	var cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	var inc = -0.01;

	var animate = function(ts) {
		requestAnimationFrame(animate);

		if (camera1.position.z < -5) {
			inc = 0.01;
		}
		if (camera1.position.z > 5) {
			inc = -0.01;
		}

		camera1.position.z += inc;
		camera1.lookAt(origin);

		cube.rotation.x += 0.01;
		renderer1.render(scene, camera1);
		renderer2.render(scene, camera2);
	};

	animate();
})();
