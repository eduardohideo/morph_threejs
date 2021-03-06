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
        loader.load('makehuman.js',create_animation);
     }

function create_animation(geometry){
        human = new THREE.SkinnedMesh( geometry, new THREE.MeshLambertMaterial());
	human.material.skinning = true;	
        THREE.AnimationHandler.add(geometry.animations[2]);
        scene.add( human);
	console.log(geometry);
	animation = new THREE.Animation(human,human.geometry.animations[2].name,THREE.AnimationHandler.CATMULLROM);
        animation.play();
        loop();
}

var rotate_camera = function(){
    var timer = Date.now() * 0.0005;
    camera.position.x = Math.cos( timer ) * 0.25;
    camera.position.z = Math.sin( timer ) * 0.25;
    camera.position.y = 0.25; 
    camera.lookAt( scene.position );   
}

function loop(){
    requestAnimationFrame(loop);    
    var delta = clock.getDelta();
    animation.update(delta);
    rotate_camera();
    renderer.render(scene, camera);
}
