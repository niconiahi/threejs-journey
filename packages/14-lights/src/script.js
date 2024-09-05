// import GUI from "lil-gui"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.5)
scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xFFFFFF, 50)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

const directionalLight = new THREE.DirectionalLight(0x00FFFC, 2)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

const hemisphereLight = new THREE.HemisphereLight(0xFF0000, 0x0000FF, 0.9)
scene.add(hemisphereLight)
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight)
scene.add(hemisphereLightHelper)

const pointLight = new THREE.PointLight(0xFF9000, 3, 0, 3)
pointLight.position.set(0, 1, 0)
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

const reactAreaLight = new THREE.RectAreaLight(0x4E00FF, 6, 1, 1)
reactAreaLight.position.set(0, 1, 1)
reactAreaLight.lookAt(new THREE.Vector3())
scene.add(reactAreaLight)

const spotLight = new THREE.SpotLight(0x78FF00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

spotLight.target.position.x = -0.75
scene.add(spotLight.target)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material,
)
sphere.position.x = -1.5

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  material,
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material,
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material,
)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
const clock = new THREE.Clock()

function tick() {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

