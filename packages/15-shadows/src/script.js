import GUI from "lil-gui"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5)
directionalLight.position.set(2, 2, -1)
gui.add(directionalLight, "intensity").min(0).max(3).step(0.001)
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001)
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001)
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001)
scene.add(directionalLight)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.top = 1
directionalLight.shadow.camera.right = 1
directionalLight.shadow.camera.bottom = -1
directionalLight.shadow.camera.left = -1
directionalLight.shadow.radius = 10
const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightHelper)

const spotLight = new THREE.SpotLight(0xFFFFFF, 3.6, 10, Math.PI * 0.2)
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

const pointLight = new THREE.PointLight(0xFFFFFF, 2.7)
pointLight.castShadow = true
pointLight.position.set(-1, 1, 0)
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 4
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, "metalness").min(0).max(1).step(0.001)
gui.add(material, "roughness").min(0).max(1).step(0.001)

/**
 * Objects
 */

// const textureLoader = new THREE.TextureLoader()
// const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg")
// bakedShadow.colorSpace = THREE.SRGBColorSpace
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material,
  // new THREE.MeshBasicMaterial({ map: bakedShadow }),
)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
plane.receiveShadow = true

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material,
)
sphere.castShadow = true

const textureLoader = new THREE.TextureLoader()
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg")
simpleShadow.colorSpace = THREE.SRGBColorSpace
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  }),
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, plane, sphereShadow)

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
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

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

function tick() {
  const elapsedTime = clock.getElapsedTime()

  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = 0.7 - sphere.position.y

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

