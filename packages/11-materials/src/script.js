import Gui from "lil-gui"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

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

const gui = new Gui()

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg")
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg")

// const material = new THREE.MeshBasicMaterial()
// doorColorTexture.colorSpace = THREE.SRGBColorSpace
// material.map = doorColorTexture
// material.color = new THREE.Color("#ffffff")
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.BackSide
//
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true
//
// const matcapTexture = textureLoader.load("./textures/matcaps/1.png")
// const matcapTexture = textureLoader.load("./textures/matcaps/8.png")
// matcapTexture.colorSpace = THREE.SRGBColorSpace
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
//
// const material = new THREE.MeshDepthMaterial()
//
// const material = new THREE.MeshLambertMaterial()
// material.shininess = 100
// material.specular = new THREE.Color("#1188ff")
//
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color("#1188ff")
//
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture
//
const rgbeLoader = new RGBELoader()
rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})
// const material = new THREE.MeshStandardMaterial()
// const material = new THREE.MeshPhysicalMaterial()
const material = new THREE.MeshPhysicalMaterial()
gui
  .add(material, "roughness")
  .min(0)
  .max(1)
  .step(0.001)
gui
  .add(material, "metalness")
  .min(0)
  .max(1)
  .step(0.001)
// const ambientLight = new THREE.AmbientLight("#ffffff", 1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight("#ffffff", 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
//
// material.map = doorColorTexture
// material.metalness = 0.7
// material.roughness = 0.2
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

material.metalness = 0
material.roughness = 0

material.clearcoat = 1
material.clearcoatRoughness = 0

material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)

material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [100, 800]

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui
  .add(material, "clearcoat")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .add(material, "clearcoatRoughness")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .add(material, "sheen")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .add(material, "sheenRoughness")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .addColor(material, "sheenColor")
gui
  .add(material, "iridescence")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .add(material, "iridescenceIOR")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .add(material.iridescenceThicknessRange, 0)
  .min(1)
  .max(1000)
  .step(1)
gui
  .add(material.iridescenceThicknessRange, 1)
  .min(1)
  .max(1000)
  .step(1)
gui
  .add(material, "transmission")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .add(material, "ior")
  .min(0)
  .max(1)
  .step(0.1)
gui
  .add(material, "thickness")
  .min(0)
  .max(1)
  .step(0.1)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material,
)
sphere.position.x = -2.5
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material,
)
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
)
torus.position.x = 2.5
scene.add(torus, sphere, plane)

/**
 * Animate
 */
const clock = new THREE.Clock()

function tick() {
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = -0.15 * elapsedTime
  plane.rotation.x = -0.15 * elapsedTime
  torus.rotation.x = -0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
