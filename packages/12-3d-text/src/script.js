import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"

/**
 * Base
 */
// Debug
// const gui = new Gui()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const fontLoader = new FontLoader()
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const texture = textureLoader.load("/textures/matcaps/8.png")
  texture.colorScheme = THREE.SRGBColorSpace
  const material = new THREE.MeshMatcapMaterial({ matcap: texture })

  const bevelSize = 0.02
  const bevelThickness = 0.03
  const textGeometry = new TextGeometry("Hello World", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelOffset: 0,
    bevelSegments: 5,
  })
  // textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - bevelSize) * 0.5,
  //   -(textGeometry.boundingBox.max.y - bevelSize) * 0.5,
  //   -(textGeometry.boundingBox.max.z - bevelThickness) * 0.5,
  // )
  // textGeometry.computeBoundingBox()
  // console.log(textGeometry.boundingBox)
  textGeometry.center()
  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)

  const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
  const TORUS_AMOUNT = 100
  for (let i = 0; i < TORUS_AMOUNT; i++) {
    const torus = new THREE.Mesh(torusGeometry, material)
    torus.position.x = (Math.random() - 0.5) * 10
    torus.position.y = (Math.random() - 0.5) * 10
    torus.position.z = (Math.random() - 0.5) * 10
    torus.rotation.x = Math.random() * Math.PI
    torus.rotation.y = Math.random() * Math.PI
    const scale = Math.random()
    torus.scale.set(scale, scale, scale)
    scene.add(torus)
  }
})

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial(),
// )
//
// scene.add(cube)

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
// const clock = new THREE.Clock()

function tick() {
  // const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
