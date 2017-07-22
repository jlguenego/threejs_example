(function () {

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
    camera.position.set(0, 0, 5);
    scene.add(camera);

    // valeur ajoutée
    // création d'un objet linéaire ressemblant à un M
    //create a blue LineBasicMaterial
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

    function animate() {
        requestAnimationFrame(animate);
        camera.rotation.z += 0.001;
        renderer.render(scene, camera);
    }

    animate();
})();