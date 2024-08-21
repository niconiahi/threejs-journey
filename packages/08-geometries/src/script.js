import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
// const geometry = new THREE.SphereGeometry(1, 32, 32)
const VERTICES_PER_TRIANGLE = 3
const VERTEX_SIZE = 3
// const positions = new Float32Array([
//   0, 0, 0,
//   0, 1, 0,
//   1, 0, 0
// ])
// const geometry = new THREE.BufferGeometry()
// const position = new THREE.BufferAttribute(positions, VERTEX_SIZE)
// geometry.setAttribute('position', position)
const geometry = new THREE.BufferGeometry()
const TRIANGLES_COUNT = 500
const POSITIONS_COUNT = TRIANGLES_COUNT * VERTICES_PER_TRIANGLE * VERTEX_SIZE
const positions = new Float32Array(POSITIONS_COUNT)
for (let i = 0; i < POSITIONS_COUNT; i++) {
  positions[i] = (Math.random() - 0.5) * 4
}
const position = new THREE.BufferAttribute(positions, VERTEX_SIZE)
geometry.setAttribute("position", position)

const material = new THREE.MeshBasicMaterial({
  color: 0xFF0000,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
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

// Animate
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
