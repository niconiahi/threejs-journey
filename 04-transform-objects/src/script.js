import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const mesh = new THREE.Mesh(geometry, material)
// no negative values
mesh.scale.set(2, 0.25, 0.5)
mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(-1.2, 1, 3)
scene.add(camera)


console.log('mesh.position.length()', mesh.position.length())
console.log('mesh.position.distanceTo(camera.position)', mesh.position.distanceTo(camera.position))

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Group
 */
const group = new THREE.Group()
group.position.set(1, 1, 0)
group.scale.y = 2
group.rotation.y = 1.5
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "blue"})
)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "blue"})
)
cube2.position.x = 1.5
group.add(cube2)

camera.lookAt(group.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

