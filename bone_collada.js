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

var clock = new THREE.Clock();
var scene,renderer;

function init(){
    var container = $('#container');
    scene = new THREE.Scene();     
    renderer = new THREE.WebGLRenderer();
    scene.add(camera);
    camera.position.set(0,1,4);
    
    var directionalLight = new THREE.DirectionalLight(0xffffff,1.0);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor("white",1);
    container.append(renderer.domElement);
    
    var collada_object=  new PinaCollada('cube.dae',1);
    }

function PinaCollada(file_name,scale){
    this.loader = new THREE.ColladaLoader();
    this.model,this.geometry,this.skin;
    this.loader.options.convertUpAxis = true;
    var that = this;
    this.loader.load(file_name,function (collada){
	that.model = collada.scene;
	console.log(collada);
	that.skin = collada.skins[0];
	that.geometry = collada.skins[0].geometry;
	that.model.scale.x = that.model.scale.y = that.model.scale.z = scale;
        that.model.updateMatrix();
        that.create_animation(that);
	createLines();
        PinaCollada.loop();
    });

}

function createLines(){
    var size = 14,step = 1;
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0x303030 } );

    for ( var i = - size; i <= size; i += step ) {
	geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
	geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );
	geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
	geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );

}
    var line = new THREE.Line( geometry, material, THREE.LinePieces );
    scene.add( line );
}

PinaCollada.prototype.create_animation = function(that){
    THREE.AnimationHandler.add(that.geometry.animation);
    scene.add(that.model);
    animation = new THREE.Animation(that.skin,that.geometry.animation.name,THREE.AnimationHandler.CATMULLROM);
    animation.play();
}

PinaCollada.rotate_camera = function(){
    var timer = Date.now() * 0.0005;
    camera.position.x = Math.cos( timer ) * 3;
    camera.position.z = Math.sin( timer ) * 3;
    camera.position.y = 3; 
    camera.lookAt( scene.position );   
}

PinaCollada.loop  = function(){
    requestAnimationFrame(PinaCollada.loop);    
    var delta = clock.getDelta();
    //animation.update(delta);
    PinaCollada.rotate_camera(); 
    renderer.render(scene, camera);
}
