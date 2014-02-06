window.onload = init;        
var WIDTH = 400,
HEIGHT = 300;

var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;


var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
var animation;
var clock = new THREE.Clock();
var scene,renderer;
function init(){
        var container = $('#container');
        scene = new THREE.Scene();     
        renderer = new THREE.WebGLRenderer();
        scene.add(camera);

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        
        renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor("white",1);
        container.append(renderer.domElement);
        
        loader = new THREE.JSONLoader();
        loader.load('cube.js',create_animation);
     }

function create_animation(geometry){
        cube = new THREE.SkinnedMesh( geometry, new THREE.MeshLambertMaterial());
	cube.material.skinning = true;	
        //THREE.AnimationHandler.add(geometry.animations[0]);
        scene.add( cube);
	//animation = new THREE.Animation(cube,cube.geometry.animations[0].name,THREE.AnimationHandler.CATMULLROM);
        //animation.play(false);
        loop();
}

var rotate_camera = function(){
    var timer = Date.now() * 0.0005;
    camera.position.x = Math.cos( timer ) * 10;
    camera.position.z = Math.sin( timer ) * 10;
    camera.position.y = 10;
    camera.lookAt( scene.position );   
}

function loop(){
    requestAnimationFrame(loop);    
    var delta = clock.getDelta();
    //animation.update(delta);
    rotate_camera();
    renderer.render(scene, camera);
}
