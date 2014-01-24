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
        camera.position.z = 2.5;
        camera.position.y = 0.8;

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        
        renderer.setSize(WIDTH, HEIGHT);

        container.append(renderer.domElement);
        
        loader = new THREE.JSONLoader();
        loader.load('animations.js',create_animation);
     }

function create_animation(geometry){
        human = new THREE.SkinnedMesh( geometry, new THREE.MeshLambertMaterial());
	human.material.skinning = true;	
        THREE.AnimationHandler.add(geometry.animations[0]);
        scene.add( human);
	animation = new THREE.Animation(human,human.geometry.animations[0].name,THREE.AnimationHandler.CATMULLROM);
        animation.play();
        loop();
}
function loop(){
    requestAnimationFrame(loop);    
    var delta = clock.getDelta();
    animation.update(delta);
    renderer.render(scene, camera);
}
