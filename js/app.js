console.log('⚙️', 'BLIPPAR INITIALISATION')

// Load scene using URL params
// sample URL: https://workspace.8thwall.app/vps-beta/?scene=detect-mesh
const params = new URLSearchParams(document.location.search.substring(1))
const sceneName = params.get('scene') ? params.get('scene') : 'default-scene'
console.log('sceneName = ', sceneName)

// Load scene content
fetch(`../scenes/${sceneName}.html`)
  .then((response) => response.text())
  .then((html) => {
    document.querySelector('a-scene').innerHTML = html

    // Refer API:Functions documentation for more details
    WEBARSDK.Init()

    // Give a callback when the WebAR Stage <a-entity webar-stage> is ready  to display the 3d object
    WEBARSDK.SetStageReadyCallback(() => {
      console.info('Stage is ready now!!!')

      const resetButton = document.getElementById('resetButton')
      if (resetButton) {
        const resetButtonImage = resetButton.firstElementChild
        if (resetButtonImage) {
          console.log({ resetButtonImage })
          resetButtonImage.src =
            'https://webar-sdk.blippar.com/static/restart_surface_detection.svg'
          resetButtonImage.style.display = 'block'
        }
      }
    })

    WEBARSDK.SetGuideViewCallbacks(
      (startGuideViewCallback = () => {
        console.log(' Start(ed) hand guide animation')
      }),
      (stopGuideViewCallback = () => {
        console.log(' Stop(ped) hand guide animation')
      })
    )

    WEBARSDK.SetPrepareForCameraTransitionCallback(() => {
      deskenv.parentNode.removeChild(deskenv)
    })
  })
  .catch((error) => {
    console.error('Error loading scene:', error)
  })

// Refer API:Functions documentation for more details
// WEBARSDK.Init()

// // Sets the webar mode if not defined earlier or enable lazy mode in webar-mode parameter
// WEBARSDK.SetWebARMode('surface-tracking')

// // Give a callback when the WebAR Stage <a-entity webar-stage> is ready  to display the 3d object
// WEBARSDK.SetStageReadyCallback(() => {
//   console.info('Stage is ready now!!!')
// })

// WEBARSDK.SetGuideViewCallbacks(
//   (startGuideViewCallback = () => {
//     console.log(' Start(ed) hand guide animation')
//   }),
//   (stopGuideViewCallback = () => {
//     console.log(' Stop(ped) hand guide animation')
//   })
// )

// WEBARSDK.SetPrepareForCameraTransitionCallback(() => {
//   deskenv.parentNode.removeChild(deskenv)
// })
