(function () {

    if (!Detector.webgl) {
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById('container').appendChild(warning);

        return;
    }

    // on initialise le moteur de rendu
    var renderer = new THREE.WebGLRenderer();

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    var scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    var ambientLight = new THREE.AmbientLight(0x404040, 0.7); // soft white light
    scene.add(ambientLight);

    var geometry = new THREE.SphereGeometry(300, 32, 32);
    var material = new THREE.MeshLambertMaterial({
        color: 0xffff00,
        // wireframe: true
    });

    var loader = new THREE.TextureLoader();

    // load a resource
    loader.load('../img/map-monde.jpg', function (texture) {
        var material = new THREE.MeshLambertMaterial({
            map: texture
        });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        // on ajoute une lumière blanche
        var lumiere = new THREE.DirectionalLight(0xffffff, 1);
        lumiere.position.set(4000, 0, 0);
        scene.add(lumiere);

        var i = 0;

        function animate() {
            i++;
            // on appel la fonction animate() récursivement à chaque frame
            requestAnimationFrame(animate);
            // on fait tourner le cube sur ses axes x et y
            // sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            let x = 4000 * Math.cos(i * 0.01);
            let z = 4000 * Math.sin(i * 0.01);
            lumiere.position.set(x, 0, z);
            camera.rotation.z += 0.001;
            // on effectue le rendu de la scène
            renderer.render(scene, camera);
        }


        animate();
    });
})();