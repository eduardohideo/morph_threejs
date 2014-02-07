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

function rotate_bone_range(bone_id){
	bone_name = human.bones[bone_id].name;
	$('#controller').append('<p>'+bone_name
	+'<input type="range" value="0" min="-100" max="100" onchange="console.log(human.bones['+bone_id+'].rotation.x=this.value/100)">'+
'<input type="range" value="0" min="-100" max="100" onchange="console.log(human.bones['+bone_id+'].rotation.y=this.value/100)">'
+ '<input type="range" value="0" min="-100" max="100" onchange="console.log(human.bones['+bone_id+'].rotation.z=this.value/100)">'
+'</p>');
}

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
        loader.load('human.js',create_animation);
     }

function create_animation(geometry){
        human = new THREE.SkinnedMesh( geometry, new THREE.MeshLambertMaterial());
	human.material.skinning = true;
	for(index_bone=0;index_bone < human.bones.length;index_bone++)
	    rotate_bone_range(index_bone);
        //THREE.AnimationHandler.add(geometry.animations[0]);
        scene.add( human);
	//animation = new THREE.Animation(human,human.geometry.animations[0].name,THREE.AnimationHandler.CATMULLROM);
        //animation.play(false);
        loop();
}

var rotate_camera = function(){
    var timer = Date.now() * 0.0005;
    camera.position.x = Math.cos( timer ) * 4;
    camera.position.z = Math.sin( timer ) * 4;
    camera.position.y = 4;
    camera.lookAt( scene.position );   
}

function loop(){
    requestAnimationFrame(loop);    
    var delta = clock.getDelta();
    //animation.update(delta);
    rotate_camera();
    renderer.render(scene, camera);
}
