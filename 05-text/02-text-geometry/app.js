(function() {

	if (!Detector.webgl) {
		var warning = Detector.getWebGLErrorMessage();
		document.getElementById('container').appendChild(warning);

		return;
	}

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('container').appendChild(renderer.domElement);

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(-100, 0, 600);
	scene.add(camera);

	var material = new THREE.LineBasicMaterial({
		color: new THREE.Color('hsl(240, 100%, 80%)')
	});
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-1, -1, 0));
	geometry.vertices.push(new THREE.Vector3(-1, 1, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 0));
	geometry.vertices.push(new THREE.Vector3(1, 1, 0));
	geometry.vertices.push(new THREE.Vector3(1, -1, 0));

	var line = new THREE.Line(geometry, material);

	scene.add(line);

	// valeur ajoutée texte géométrie
	var loader = new THREE.FontLoader();

	loader.load('../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function(font) {

		var geometry = new THREE.TextGeometry('Hello Maite', {
			font: font,
			size: 80,
			height: 5,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 1,
			bevelSegments: 5
		});

		geometry.computeBoundingBox();

		console.log('geometry.boundingBox.max.x', geometry.boundingBox.max.x);
		console.log('geometry.boundingBox.max.y', geometry.boundingBox.max.y);
		console.log('geometry.boundingBox.max.z', geometry.boundingBox.max.z);
		console.log('geometry.boundingBox.min.x', geometry.boundingBox.min.x);
		console.log('geometry.boundingBox.min.y', geometry.boundingBox.min.y);
		console.log('geometry.boundingBox.min.z', geometry.boundingBox.min.z);

		var material = new THREE.MeshNormalMaterial();

		var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x -= 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        mesh.rotation.y += 30 * 6.28 / 360;

		scene.add(mesh);
		renderer.render(scene, camera);
	});
})();
